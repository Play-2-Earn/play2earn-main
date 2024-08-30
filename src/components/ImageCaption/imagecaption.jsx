import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const [view, setView] = useState('main'); // State to toggle between 'main' and 'chooseLevels'
  const [selectedLevel, setSelectedLevel] = useState(null);
  const navigate = useNavigate();

  const handleStartClick = () => {
    setView('chooseLevels'); // Switch to level selection view
  };

  const handleLevelSelect = (levelId) => {
    setSelectedLevel(levelId);
    navigate(`/test?level=${levelId}`);
  };

  const getButtonStyle = (levelId) => ({
    borderRadius: '70px',
    fontSize: '24px',
    width: '220px',
    marginRight: '20px',
    border: '2px solid',
    backgroundColor: selectedLevel === levelId ? 'rgba(15, 98, 254, 1)' : 'transparent',
    color: selectedLevel === levelId ? 'white' : 'black',
  });

  return (
    <div style={{ textAlign: 'center' }}>
      {view === 'main' ? (
        <>
          {/* Main Page */}
          <div>
            <h1 style={{ fontSize: '36px' }}>Welcome to the AI Image Caption game</h1>
            <br />
            <br />
            <br />
            <br />
            <br />

            <div
              style={{
                display: 'inline-block',
                textAlign: 'center',
                border: '4px solid white',
                borderRadius: '25px',
                padding: '20px',
                width: '710px',
                height: '357px',
                backgroundColor: 'rgba(247, 250, 255, 0.8)',
                color: 'black'
              }}
            >
              <h1 style={{ fontSize: '40px' }}>Image Captioning Task</h1>
              <br />
              <p style={{ fontSize: '24px' }}>
                Please read the instruction below <br />before you start the game.
              </p>
              <br />
              <br />
              <Button
                onClick={handleStartClick}
                style={{
                  border: '4px',
                  borderRadius: '100px',
                  color: 'white',
                  fontSize: '36px',
                  background: 'rgba(15, 98, 254, 1)',
                  width: '375px',
                  height: '80px'
                }}
              >
                Start
              </Button>
            </div>
            <br /><br /><br /><br /><br />

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <section
                style={{
                  textAlign: 'left',
                  fontSize: '20px',
                  width: '80%',
                  maxWidth: '800px'
                }}
              >
                <h2 style={{ fontSize: '24px', color: 'rgba(15, 98, 254, 1)' }}>
                  Instruction:
                </h2>
                In this task, you will be provided with an image and an AI-generated caption.
                Your goal is to refine and enhance the caption to make it SEO-friendly and include trending hashtags.
                The refined caption should be unique, engaging, and relevant to the image. Your caption will be evaluated by an AI system,
                and you will receive points and tokens based<br /> on the quality of your caption.
              </section>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Level Selection Page */}
          <div style={{ marginTop: '50px' }}>
            <h1 style={{ fontSize: '48px' }}>Level Select</h1>
            <br />
            <br />
            <ButtonGroup size="large" style={{ height: '100px' }}>
              {[1, 2, 3, 4, 5].map(level => (
                <Button
                  key={level}
                  style={getButtonStyle(level)}
                  onClick={() => handleLevelSelect(level)}
                >
                  Level {level}
                </Button>
              ))}
            </ButtonGroup>
            <br />
            <br />
            <ButtonGroup size="large" style={{ height: '100px' }}>
              {[6, 7, 8, 9, 10].map(level => (
                <Button
                  key={level}
                  style={getButtonStyle(level)}
                  onClick={() => handleLevelSelect(level)}
                >
                  Level {level}
                </Button>
              ))}
            </ButtonGroup>
            <br />
            <br />
            <br />
            <br />
            <Button
              onClick={() => setView('main')}
              style={{
                border: '4px',
                borderRadius: '100px',
                color: 'white',
                fontSize: '36px',
                background: 'rgba(15, 98, 254, 1)',
                width: '375px',
                height: '80px',
              }}
            >
              Home
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Main;
