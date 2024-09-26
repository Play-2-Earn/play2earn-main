import React from 'react';
import '../css/jobDescriptionUpload.css'

const JobDescriptionUpload = () => {
    return (
        <div>
            <h1 className="main">Upload Your Job Description</h1>
            
            <div class="upload">
                <div class="uploadbox">
                    <label for="file-upload" class="upload-label">
                        <div class="upload-icon"></div>
                        <p>Choose file or drag here</p>
                    </label>
                    <input id="file-upload" type="file" class="upload-input" />
                </div>
                <button>Upload job description</button>
            </div>
        </div>
    );
}

export default JobDescriptionUpload;
