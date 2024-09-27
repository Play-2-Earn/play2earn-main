import React, { useState, useEffect } from 'react';
import '../css/jobDescriptionUpload.css';

const JobDescriptionUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    // This effect will automatically start "uploading" the file when it's selected
    useEffect(() => {
        if (selectedFile) {
            setUploading(true);
            setProgress(0);

            // Simulate the progress
            const fakeProgress = setInterval(() => {
                setProgress((prevProgress) => {
                    if (prevProgress >= 100) {
                        clearInterval(fakeProgress);
                        setUploading(false);
                        return 100;
                    }
                    return prevProgress + 10;
                });
            }, 500); // Every 0.5 seconds
        }
    }, [selectedFile]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file); // Set the selected file
    };

    return (
        <div>
            <h1 className="main">Upload Your Job Description</h1>
            <div className="upload">
                <div className="uploadbox">
                    <label htmlFor="file-upload" className="upload-label">
                        <div className="upload-icon"></div>
                        {!selectedFile ? <p>Choose file or drag here</p> : <p>{selectedFile.name}</p>} {/* Show file name */}
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        className="upload-input"
                        onChange={handleFileChange}
                    />

                    {uploading && (
                        <div className="progress-bar">
                            <div className="progress" style={{ width: `${progress}%` }}></div>
                            <div className="progress-text">{progress}%</div>
                        </div>
                    )}
                </div>     <br/>
                <br/>
                <button className='upload-btn'>Upload job description</button>
            </div>
        </div>
    );
};

export default JobDescriptionUpload;
