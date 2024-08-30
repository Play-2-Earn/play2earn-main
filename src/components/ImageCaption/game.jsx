'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent, useCallback } from 'react';
import imageData from './imageData.json'; // Corrected path with lowercase 'imageData'
import Button from '@mui/material/Button';

// Constants
const TOTAL_LEVELS = 10;
const TIMER_DURATIONS = [90, 80, 70, 60, 50, 40, 30, 20, 15, 10];
const INITIAL_LIVES = 3;

// Helper functions
const getTimerDuration = (level) => {
  return TIMER_DURATIONS[Math.min(level - 1, TIMER_DURATIONS.length - 1)];
};

const startTimer = (duration, onTick, onComplete) => {
  let timeLeft = duration;
  const id = setInterval(() => {
    if (timeLeft <= 1) {
      clearInterval(id);
      onComplete();
    } else {
      timeLeft -= 1;
      onTick(timeLeft);
    }
  }, 1000);

  return id;
};

const clearTimer = (intervalId) => {
  if (intervalId) clearInterval(intervalId);
};

const decreaseLives = (lives, onGameOver) => {
  const newLives = lives - 1;
  if (newLives <= 0) {
    onGameOver();
    return 0;
  }
  return newLives;
};

const areCaptionsSimilar = (userCaption, correctCaption) => {
  const userWords = userCaption.toLowerCase().split(' ').filter(Boolean);
  const correctWords = correctCaption.toLowerCase().split(' ').filter(Boolean);
  return userWords.some(word => correctWords.includes(word));
};

const getRandomImage = (usedImages) => {
  const unusedImages = imageData.filter(image => !usedImages.has(image.id));
  if (unusedImages.length === 0) return null;
  return unusedImages[Math.floor(Math.random() * unusedImages.length)];
};

// GameCompleted Component
const GameCompleted = ({ score, onRestart }) => {
  return (
    <div
      style={{
        textAlign: 'center',
        border: '4px solid white',
        borderRadius: '25px',
        padding: '20px',
        width: '710px',
        height: '504px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(247, 250, 255, 0.8)',
        color: 'black'
      }}
    >
      <h1 style={{ fontSize: '32px' }}>Congratulations🎉</h1>
      <p style={{ fontSize: '24px' }}>Your final score: {score}</p>
      <Button
        href='/levels'
        style={{
          border: '4px',
          borderRadius: '4px',
          color: 'white',
          fontSize: '24px',
          background: 'rgba(205, 26, 26, 1)',
          padding: '15px',
          position: 'relative',
          right: '50px'
        }}
        onClick={onRestart}
      >
        Play again
      </Button>
      <Button
        href='/'
        style={{
          border: '4px',
          borderRadius: '4px',
          color: 'white',
          fontSize: '24px',
          background: 'rgba(15, 98, 254, 1)',
          padding: '15px',
          position: 'relative',
          left: '70px'
        }}
      >
        Back to tasks
      </Button>
    </div>
  );
};

// Main Game Component
const Game = () => {
  const [currentImage, setCurrentImage] = useState(() => getRandomImage(new Set()));
  const [caption, setCaption] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [timer, setTimer] = useState(getTimerDuration(level));
  const [intervalId, setIntervalId] = useState(null);
  const [usedImages, setUsedImages] = useState(new Set());

  useEffect(() => {
    if (intervalId) clearTimer(intervalId);

    if (timer <= 0) {
      setFeedback('Time is up! Game Over!');
      setGameOver(true);
      setButtonDisabled(true);
      setTimer(0); // Stop the timer
      return;
    }

    const id = startTimer(timer, setTimer, () => {
      setFeedback('Time is up! Game Over!');
      setGameOver(true);
      setButtonDisabled(true);
      setTimer(0); // Stop the timer
    });
    setIntervalId(id);

    return () => clearTimer(id);
  }, [timer]);

  useEffect(() => {
    setTimer(getTimerDuration(level));
  }, [level]);

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (caption.trim() === '') {
      setFeedback('Please enter a caption.');
      return;
    }

    const correctCaption = currentImage?.caption.toLowerCase();
    const userCaption = caption.trim().toLowerCase();

    if (correctCaption && areCaptionsSimilar(userCaption, correctCaption)) {
      handleCorrectAnswer();
    } else {
      handleIncorrectAnswer(correctCaption || '');
    }
  };

  const handleCorrectAnswer = useCallback(() => {
    if (intervalId) clearTimer(intervalId);
    setScore(prevScore => prevScore + 10);
    setFeedback('Caption is similar to the correct one! You scored 10 points.');
    setIsCorrect(true);
    setButtonDisabled(true);
    setShowScoreModal(true);

    setTimeout(() => {
      setShowScoreModal(false);

      if (level >= TOTAL_LEVELS) {
        setShowResults(true);
      } else {
        const nextImage = getRandomImage(usedImages);
        if (nextImage) {
          setUsedImages(prev => new Set(prev).add(nextImage.id));
          setCurrentImage(nextImage);
          setCaption('');
          setFeedback('');
          setIsCorrect(false);
          setLevel(prevLevel => prevLevel + 1);
          setButtonDisabled(false);
          setTimer(getTimerDuration(level + 1));
        } else {
          setFeedback('No more images available! Game Over!');
          setGameOver(true);
          setButtonDisabled(true);
          setTimer(0); // Stop the timer
        }
      }
    }, 2000);
  }, [intervalId, level, usedImages]);

  const handleIncorrectAnswer = (correctCaption) => {
    setFeedback(`Incorrect caption. The correct caption was: "${correctCaption}". Try again!`);
    setIsCorrect(false);
    setLives(prevLives => {
      const newLives = decreaseLives(prevLives, () => {
        setFeedback('Out of lives! Game Over!');
        setGameOver(true);
        setButtonDisabled(true);
        setTimer(0); // Stop the timer
      });
      if (newLives > 0) {
        const nextImage = getRandomImage(usedImages);
        if (nextImage) {
          setUsedImages(prev => new Set(prev).add(nextImage.id));
          setCurrentImage(nextImage);
          setCaption('');
          setTimer(getTimerDuration(level));
        }
      }
      return newLives;
    });
  };

  const handleRestart = () => {
    setCurrentImage(getRandomImage(new Set()));
    setCaption('');
    setFeedback('');
    setScore(0);
    setLevel(1);
    setLives(INITIAL_LIVES);
    setGameOver(false);
    setShowResults(false);
    setShowScoreModal(false);
    setButtonDisabled(false);
    setTimer(getTimerDuration(1));
    setUsedImages(new Set());
  };

  const renderLives = (count) => {
    return '❤️'.repeat(count);
  };

  if (showResults) {
    return <GameCompleted score={score} onRestart={handleRestart} />;
  }

  if (gameOver) {
    return (
      <div>
        <h1>Game Over</h1>
        <p>Your final score is: {score}</p>
        <Button onClick={handleRestart} style={{ margin: '20px' }}>
          Restart
        </Button>
        <Button href='/' style={{ margin: '20px' }}>
          Home
        </Button>
      </div>
    );
  }

  return (
    <div style={{
      textAlign: 'center',
      border: '4px solid white',
      borderRadius: '25px',
      padding: '20px',
      width: '710px',
      height: '504px',
      position: 'relative',
      margin: 'auto',
      backgroundColor: 'rgba(247, 250, 255, 0.8)',
      color: 'black'
    }}>
      <h1>Level {level}</h1>
      <p>Time left: {timer}s</p>
      <p>Lives: {renderLives(lives)}</p>
      <img src={currentImage?.src} alt={currentImage?.alt} style={{ width: '300px', height: '200px' }} />
      <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
        <textarea
          value={caption}
          onChange={handleCaptionChange}
          placeholder="Enter your caption here"
          rows="4"
          cols="50"
          style={{ fontSize: '18px', padding: '10px', borderRadius: '10px', border: '2px solid rgba(15, 124, 255, 1)' }}
          disabled={buttonDisabled}
        />
        <br />
        <Button
          type="submit"
          disabled={buttonDisabled}
          style={{
            background: 'rgba(63, 212, 60, 1)',
            padding: '10px',
            border: '4px',
            borderRadius: '100px',
            color: 'white',
            fontSize: '24px',
            width: '150px',
            height: '50px',
            marginRight: '20px'
          }}
        >
          Evaluate
        </Button>
      </form>

      {showScoreModal && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            border: '2px solid #000',
            borderRadius: '10px',
            background: '#fff',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
            zIndex: '1000',
          }}
        >
          <h2>Your score: {score}</h2>
          <Button onClick={() => setShowScoreModal(false)}>Close</Button>
        </div>
      )}
    </div>
  );
};

export default Game;
