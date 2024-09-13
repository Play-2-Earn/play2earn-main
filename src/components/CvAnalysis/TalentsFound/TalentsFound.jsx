import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation hook
import "./TalentsFound.css";
import Header from "../Header/Header";

const TalentsFound = () => {
  const location = useLocation(); // Access location object
  const topCVs = location.state?.topCVs || []; // Get the state passed from ProjectDescriptionForm

  return (
    <div>
    <Header />
    <div className="talents-found-container">
      <h3>Talents Found</h3>
      <div className="talents-list">
        {topCVs.map((cv, index) => (
          <div key={index} className="talent-card">
            <div className="talent-header">
              <p className="talent-name">{cv.candidate_name}</p>
            </div>
            <div className="talent-details">
              {cv.combined_score && (
                <p className="talent-score">Score: {cv.combined_score}%</p>
              )}
              {cv.experience_text && (
                <p className="talent-experience"><b>Experience</b>: {cv.experience_text}</p>
              )}
              {cv.education && (
                <p className="talent-education"><b>Education:</b> {cv.education}</p>
              )}
              {cv.skills && (
                <p className="talent-skills"><b>Skills:</b> {cv.skills}</p>
              )}
            </div>
            <button className="talent-action-button">INVITE</button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default TalentsFound;
