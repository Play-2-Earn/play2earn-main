import React, { useState } from 'react';
import './SurveyTask.css';
import FormfacadeEmbed from "@formfacade/embed-react";

function App() {
  const [points, setPoints] = useState(0);
  const [showForm1, setShowForm1] = useState(false);
  const [showForm2, setShowForm2] = useState(false);
  const [showForm3, setShowForm3] = useState(false);
  const [showForm4, setShowForm4] = useState(false);
  const [form1Submitted, setForm1Submitted] = useState(false);
  const [form2Submitted, setForm2Submitted] = useState(false);
  const [form3Submitted, setForm3Submitted] = useState(false);
  const [form4Submitted, setForm4Submitted] = useState(false);

  const completeSurvey = (surveyNumber) => {
    setTimeout(() => {
      alert('Survey completed!');
      setPoints(points + 10);
      switch(surveyNumber) {
        case 1:
          setForm1Submitted(true);
          setShowForm1(false);
          break;
        case 2:
          setForm2Submitted(true);
          setShowForm2(false);
          break;
        case 3:
          setForm3Submitted(true);
          setShowForm3(false);
          break;
        case 4:
          setForm4Submitted(true);
          setShowForm4(false);
          break;
        default:
          break;
      }
    }, 1000);
  };

  const handleButtonClick = (surveyNumber) => {
    setShowForm1(surveyNumber === 1);
    setShowForm2(surveyNumber === 2);
    setShowForm3(surveyNumber === 3);
    setShowForm4(surveyNumber === 4);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>User Tasks</h1>
        <p>Complete the surveys and earn points!</p>
        
        <div className="button-container">
          {(!showForm1 && !form1Submitted) && (
            <button onClick={() => handleButtonClick(1)}>Survey 1</button>
          )}
          {showForm1 && (
            <div className="form-container">
              <FormfacadeEmbed
                formFacadeURL="https://formfacade.com/include/100803528896069566345/form/1FAIpQLScMVxecWiZVZsQCqvZF9IhIPf8sRfkig7Haz_iISKspJhABEg/classic.js/?div=ff-compose"
                onSubmitForm={() => completeSurvey(1)}
              />
            </div>
          )}

          {(!showForm2 && !form2Submitted) && (
            <button onClick={() => handleButtonClick(2)}>Survey 2</button>
          )}
          {showForm2 && (
            <div className="form-container1">
              <FormfacadeEmbed
                formFacadeURL="https://formfacade.com/include/100803528896069566345/form/1FAIpQLSengGwziQ69T11J914qGpII4f2ygwU1raDfs_Ivul3JYcQxpA/classic.js/?div=ff-compose"
                onSubmitForm={() => completeSurvey(2)}
              />
            </div>
          )}

          {(!showForm3 && !form3Submitted) && (
            <button onClick={() => handleButtonClick(3)}>Survey 3</button>
          )}
          {showForm3 && (
            <div className="form-container">
              <FormfacadeEmbed
                formFacadeURL="https://formfacade.com/include/100803528896069566345/form/1FAIpQLSdD5pzaxU6ReGLhXN_SLj89nTn0pdOYVslX1wSoPdrBma4S0A/classic.js/?div=ff-compose"
                onSubmitForm={() => completeSurvey(3)}
              />
            </div>
          )}

          {(!showForm4 && !form4Submitted) && (
            <button onClick={() => handleButtonClick(4)}>Survey 4</button>
          )}
          {showForm4 && (
            <div className="form-container1">
              <FormfacadeEmbed
                formFacadeURL="https://formfacade.com/include/100803528896069566345/form/1FAIpQLSfpKtPhSFYrdcZ0Zay5PtfYMf-_RzOboe6F75v_6eziLBoEwg/classic.js/?div=ff-compose"
                onSubmitForm={() => completeSurvey(4)}
              />
            </div>
          )}
        </div>

        <h2>Your Points: {points}</h2>
      </header>
    </div>
  );
}

export default App;
