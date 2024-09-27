import React, { useState, useEffect } from 'react';
import '../css/cvjobupload.css';

const JobDescriptionUpload = () => {
    const [selectedJobFile, setSelectedJobFile] = useState(null);
    const [selectedCvFile, setSelectedCvFile] = useState(null);
    const [uploadingJob, setUploadingJob] = useState(false);
    const [uploadingCv, setUploadingCv] = useState(false);
    const [jobProgress, setJobProgress] = useState(0);
    const [cvProgress, setCvProgress] = useState(0);

    useEffect(() => {
        if (selectedJobFile) {
            setUploadingJob(true);
            setJobProgress(0);
            const fakeProgress = setInterval(() => {
                setJobProgress((prevProgress) => {
                    if (prevProgress >= 100) {
                        clearInterval(fakeProgress);
                        setUploadingJob(false);
                        return 100;
                    }
                    return prevProgress + 10;
                });
            }, 500);
        }
    }, [selectedJobFile]);

    useEffect(() => {
        if (selectedCvFile) {
            setUploadingCv(true);
            setCvProgress(0);
            const fakeProgress = setInterval(() => {
                setCvProgress((prevProgress) => {
                    if (prevProgress >= 100) {
                        clearInterval(fakeProgress);
                        setUploadingCv(false);
                        return 100;
                    }
                    return prevProgress + 10;
                });
            }, 500);
        }
    }, [selectedCvFile]);

    const handleJobFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedJobFile(file);
    };

    const handleCvFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedCvFile(file);
    };

    return (
        <div>
            <h1 className="main">Upload Your CV and Job Description</h1>
            <div className="upload">
                <div className="upload-container">
                    <div className="jobuploadbox">
                        <label htmlFor="job-file-upload" className="upload-label">
                            <div className="upload-icon"></div>
                            {!selectedJobFile ? <p>Choose job description file or drag here</p> : <p>{selectedJobFile.name}</p>}
                        </label>
                        <input
                            id="job-file-upload"
                            type="file"
                            className="upload-input"
                            onChange={handleJobFileChange}
                        />
                        {uploadingJob && (
                            <div className="progress-bar">
                                <div className="progress" style={{ width: `${jobProgress}%` }}></div>
                                <div className="progress-text">{jobProgress}%</div>
                            </div>
                        )}
                    </div>

                    <div className="cvuploadbox">
                        <label htmlFor="cv-file-upload" className="upload-label">
                            <div className="upload-icon"></div>
                            {!selectedCvFile ? <p>Choose CV file or drag here</p> : <p>{selectedCvFile.name}</p>}
                        </label>
                        <input
                            id="cv-file-upload"
                            type="file"
                            className="upload-input"
                            onChange={handleCvFileChange}
                        />
                        {uploadingCv && (
                            <div className="progress-bar">
                                <div className="progress" style={{ width: `${cvProgress}%` }}></div>
                                <div className="progress-text">{cvProgress}%</div>
                            </div>
                        )}
                    </div>
                </div>
                <br/>
                <br/>
                <button className='upload-btn'>Upload CV and job description</button>
            </div>
        </div>
    );
};

export default JobDescriptionUpload;
