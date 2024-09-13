import os
import fitz  # PyMuPDF
import docx
import subprocess
import re
import spacy
from datetime import datetime
from cloudmersive_virus_api_client.rest import ApiException
import cloudmersive_virus_api_client
from dotenv import load_dotenv
import os
load_dotenv()
# Load SpaCy model
nlp = spacy.load('en_core_web_sm')

# Cloudmersive Virus Scan Configuration
api_key = os.getenv('CLOUDMERSIVE_API_KEY') # Replace with your actual API key

def preprocess_text(text):
    # Normalize text
    
    text = text.lower().strip()
    # Remove unnecessary characters
    text = re.sub(r'[^\w\s]', '', text)
    return text

def extract_text_from_pdf(pdf_file_path):
    with fitz.open(pdf_file_path) as doc:
        text = ""
        for page in doc:
            text += page.get_text()
    return text

def extract_text_from_docx(docx_file_path):
    doc = docx.Document(docx_file_path)
    text = ""
    for para in doc.paragraphs:
        text += para.text + "\n"
    return text

def extract_text_from_doc(doc_file_path):
    try:
        result = subprocess.run(['antiword', doc_file_path], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        return result.stdout
    except Exception as e:
        print(f"Error reading DOC file {doc_file_path}: {e}")
        return ""

def extract_experience_and_skills(text):
    text = preprocess_text(text)
    doc = nlp(text)
    experience = []
    skills = []

    # Extract experience
    experience_pattern = r'(experience|work\s*experience)\s*[:\n]*([\s\S]+?)(skills|education|certifications|$)'
    experience_match = re.search(experience_pattern, text, re.IGNORECASE)
    if experience_match:
        experience_text = experience_match.group(2).strip()
        experience.append(experience_text)

    # Extract skills
    skills_pattern = r'(skills|technical\s*skills)\s*[:\s]*(.*?)(?=(experience|education|certifications|$))'
    skills_match = re.search(skills_pattern, text, re.IGNORECASE | re.DOTALL)
    if skills_match:
        skills_text = skills_match.group(2).strip()
        skills_list = re.split(r'[,\n;]', skills_text)
        skills = [skill.strip() for skill in skills_list if skill.strip()]

    return experience, skills

def extract_keywords(text):
    text = preprocess_text(text)
    doc = nlp(text)
    keywords = set()
    for token in doc:
        if token.pos_ in ['NOUN', 'PROPN'] or token.ent_type_:
            keywords.add(token.text.lower())
    return keywords

def get_common_keywords(jd_keywords, cv_keywords):
    return jd_keywords.intersection(cv_keywords)

def get_keyword_match_score(jd_keywords, cv_keywords):
    common_keywords = get_common_keywords(jd_keywords, cv_keywords)
    return len(common_keywords) / len(jd_keywords) if jd_keywords else 0

def get_experience_score(jd_experience, cv_experience):
    jd_experience_text = " ".join(jd_experience)
    cv_experience_text = " ".join(cv_experience)
    return nlp(jd_experience_text).similarity(nlp(cv_experience_text))

def get_skills_score(jd_skills, cv_skills):
    jd_skills_set = set(jd_skills)
    cv_skills_set = set(cv_skills)
    common_skills = jd_skills_set.intersection(cv_skills_set)
    return len(common_skills) / len(jd_skills_set) if jd_skills_set else 0

def extract_total_experience(text):
    patterns = [
        r'(\b[A-Za-z]+ \d{4}) – (Current|[A-Za-z]+ \d{4})',
        r'(\b[A-Za-z]+ \d{4}) – (Ongoing|[A-Za-z]+ \d{4})',
        r'(\d{4}) – (Current|\d{4})',
        r'(\d{2}/\d{4}) to (\d{2}/\d{4})',
        r'(\b[A-Za-z]+ \d{4}) to (\b[A-Za-z]+ \d{4})',
        r'(\d{2}/\d{4}) to (Current|\d{2}/\d{4})',
        r'(\d{2}/\d{4}) to (Ongoing|\d{2}/\d{4})'
    ]
    
    total_years = 0
    
    def calculate_years_between(start, end):
        try:
            start_date = datetime.strptime(start, '%B %Y')
            end_date = datetime.strptime(end, '%B %Y')
            delta = end_date - start_date
            return delta.days / 365.25
        except ValueError:
            return 0

    for pattern in patterns:
        matches = re.findall(pattern, text)
        for match in matches:
            start, end = match
            if end.lower() in ['current', 'ongoing']:
                end = datetime.now().strftime('%B %Y')
            try:
                if re.match(r'\d{4}', start) and re.match(r'\d{4}', end):
                    start = f'January {start}'
                    end = f'January {end}'
                years = calculate_years_between(start, end)
                total_years += years
            except Exception as e:
                print(f"Error calculating experience: {e}")
    
    return total_years

def scan_one_file(input_file, api_key, retry_time):
    """
    Scans a single file for viruses and returns whether it is clean.
    """
    configuration = cloudmersive_virus_api_client.Configuration()
    configuration.api_key['Apikey'] = api_key
    api_instance = cloudmersive_virus_api_client.ScanApi(
        cloudmersive_virus_api_client.ApiClient(configuration)
    )
    allow_executables = False
    allow_invalid_files = False
    allow_scripts = True
    allow_password_protected_files = True
    allow_macros = True
    allow_xml_external_entities = False
    allow_insecure_deserialization = False
    allow_html = False

    try:
        api_response = api_instance.scan_file_advanced(
            input_file,
            allow_executables=allow_executables,
            allow_invalid_files=allow_invalid_files,
            allow_scripts=allow_scripts,
            allow_password_protected_files=allow_password_protected_files,
            allow_xml_external_entities=allow_xml_external_entities,
            allow_insecure_deserialization=allow_insecure_deserialization,
            allow_html=allow_html
        )
        return api_response.clean_result
    except ApiException as e:
        print(f"Exception when calling ScanApi->scan_file: {e}\n")
        if retry_time < 5:
            return scan_one_file(input_file, api_key, retry_time + 1)
        else:
            print(f"Fail to scan file {input_file}")
            return False

def scan_all_files_in_repository(cv_folder_path, all_valid_files, api_key):
    """
    Scans all valid files in a directory and returns a list of files without any problems.
    """
    files_without_problem = []
    for file_name in all_valid_files:
        file_path = os.path.join(cv_folder_path, file_name)
        scan_result = scan_one_file(file_path, api_key, 0)
        if scan_result:
            files_without_problem.append(file_name)
    return files_without_problem

def extract_candidate_name(text):
    # Look for common patterns where the name might be found
    name_patterns = [
        r'(?:name|candidate name|full name)[\s:]*([\w\s]+)',  # Example pattern
        r'([A-Z][a-z]+\s[A-Z][a-z]+)',  # Simple pattern for "First Last"
    ]
    
    for pattern in name_patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            return match.group(1).strip()
    
    # If no pattern matches, return a placeholder
    return "Unknown"


def analyze_cvs(jd_text, cv_folder_path):
    jd_experience, jd_skills = extract_experience_and_skills(jd_text)
    jd_keywords = extract_keywords(jd_text)

    cvs_data = []
    for cv_filename in os.listdir(cv_folder_path):
        cv_file_path = os.path.join(cv_folder_path, cv_filename)
        
        # Extract text based on file type
        if cv_filename.lower().endswith('.pdf'):
            cv_text = extract_text_from_pdf(cv_file_path)
        elif cv_filename.lower().endswith('.docx'):
            cv_text = extract_text_from_docx(cv_file_path)
        elif cv_filename.lower().endswith('.doc'):
            cv_text = extract_text_from_doc(cv_file_path)
        else:
            print(f"Unsupported file type: {cv_filename}")
            continue
        
        cv_experience_text, cv_skills = extract_experience_and_skills(cv_text)
        cv_keywords = extract_keywords(cv_text)
        total_experience = extract_total_experience(cv_text)
        
        # Calculate scores
        keyword_match_score = get_keyword_match_score(jd_keywords, cv_keywords)
        experience_score = get_experience_score(jd_experience, cv_experience_text)
        combined_score = 0.1 * keyword_match_score + 0.9 * experience_score 
        
        # Extract candidate name
        candidate_name = extract_candidate_name(cv_text)
        
        cvs_data.append({
            'filename': cv_filename,
            'candidate_name': candidate_name,
            'experience': total_experience,
            'experience_text': cv_experience_text,  # Add the text of experience
            'skills': ", ".join(cv_skills),
            'combined_score': round(combined_score*100, 4)  # Add combined score for ranking
        })

    # Rank CVs and print results
    cvs_data = sorted(cvs_data, key=lambda x: x['combined_score'], reverse=True)
    for index, cv in enumerate(cvs_data):
        cv['rank'] = index + 1    

    return cvs_data[:10]
