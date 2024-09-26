import React from 'react';
import '../css/cvjobupload.css'

const cvjobupload = () => {
    return (
        <div>
            <h1 className="main">Upload Your CV and Job Description</h1>
            
            <div class="upload">
                <div class="uploadbox">
                    <label for="file-upload" class="upload-label">
                        <div class="upload-icon"></div>
                        <p>Choose file or drag here</p>
                    </label>
                    <input id="file-upload" type="file" class="upload-input" multiple/>
                </div>
                <button className='upload-btn'>Upload CV and job description</button>
            </div>
        </div>
    );
}

export default cvjobupload;
