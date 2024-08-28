import React, { useState, useEffect } from 'react';
import './App.css';
import AudioPlayer from './components/AudioPlayer';
import Feedback from './components/Feedback';
import spellingVariations from './components/spellingVariations';
import { FaHeart, FaGem, FaArrowLeft, FaTimes, FaLock, FaUnlock, FaStar } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import Confetti from 'react-confetti';
import 'react-toastify/dist/ReactToastify.css';
import { fetchAllTasks, submitTranscription } from './services/apiService'; // Import your API functions

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [transcription, setTranscription] = useState("");
    const [feedback, setFeedback] = useState("");
    const [isError, setIsError] = useState(false);
    const [points, setPoints] = useState(0);
    const [lives, setLives] = useState(3);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameEnded, setEndGame] = useState(false);
    const [levelSelectVisible, setLevelSelectVisible] = useState(false);
    const [currentLevel, setCurrentLevel] = useState(1); // Track the current level

    useEffect(() => {
        // Fetch tasks from backend
        const loadTasks = async () => {
            try {
                const tasks = await fetchAllTasks();
                setTasks(tasks);
            } catch (error) {
                console.error('Failed to fetch tasks:', error);
            }
        };

        loadTasks();
    }, [])

    const normalizeText = (text) => {
        let normalizedText = text.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").trim();
        Object.keys(spellingVariations).forEach(ukSpelling => {
            const usSpelling = spellingVariations[ukSpelling];
            const regex = new RegExp(ukSpelling, 'g');
            normalizedText = normalizedText.replace(regex, usSpelling);
        });
        return normalizedText;
    };

    const checkTranscription = async () => {
        const currentTask = tasks[currentTaskIndex];
        const normalizedTranscription = normalizeText(transcription); // Normalize the transcription

        try {
            const result = await submitTranscription(currentTask._id, normalizedTranscription); // Use normalized transcription
            if (result.isCorrect) {
                setIsError(false);
                setPoints(points + currentTask.points);  // Use the points value from the current task
                setTranscription("");
                setLives(Math.min(lives + 1, 3)); // Limit lives to a maximum of 3
                toast.success(result.message, { autoClose: 3000 });

                if (currentTaskIndex < tasks.length - 1) {
                    setCurrentTaskIndex(currentTaskIndex + 1);
                    setCurrentLevel(currentLevel + 1); // Move to the next level
                } else {
                    toast.success("Congratulations! You've completed all levels!", { autoClose: 3000 });
                    setGameStarted(false);
                    setEndGame(true);
                }
            } else {
                setIsError(true);
                setLives(lives - 1);
                toast.error(result.message, { autoClose: 3000 });

                if (lives - 1 === 0) {
                    setFeedback("You've lost all your lives! Try again tomorrow.");
                }
            }
        } catch (error) {
            console.error('Error submitting transcription:', error);
        }
    };



    const renderHearts = () => {
        const hearts = [];
        for (let i = 0; i < lives; i++) {
            hearts.push(<FaHeart key={i} className="heart full"/>);
        }
        for (let i = lives; i < 3; i++) {
            hearts.push(<FaHeart key={i} className="heart empty"/>);
        }
        return hearts;
    };

    const handleLevelSelect = (index) => {
        setCurrentTaskIndex(index);
        setGameStarted(true);
        setLevelSelectVisible(false);
    };

    const renderLevelsPage = () => {
        const levels = [];
        for (let i = 1; i <= tasks.length; i++) {
            const isLocked = i > currentLevel;
            const isCompleted = i < currentLevel;

            levels.push(
                <button
                    key={i}
                    className={`level-button ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''} ${!isLocked && !isCompleted ? 'current' : ''}`}
                    onClick={() => !isLocked && handleLevelSelect(i - 1)}
                    disabled={isLocked || isCompleted}
                >
                    {isLocked || isCompleted ? (
                        <FaLock className="icon" style={{marginRight: '3px'}}/>
                    ) : (
                        <FaUnlock className="icon" style={{marginRight: '3px'}}/>
                    )}
                    {(!isLocked || isCompleted) && <span className="level-number">{i}</span>}
                </button>
            );
        }
        return (
            <div className="levels-page">
                <header className="app-header">
                    <h1>Select a Level</h1>
                </header>
                <div className="levels-container">
                    {levels}
                </div>
            </div>
        );
    };

    return (
        <div className={`App ${gameStarted || levelSelectVisible ? "expanded" : "initial"}`}>
            {!gameStarted && !levelSelectVisible && !gameEnded ? (
                <div className="start-page">
                    <h1 className="title-head">Audio Transcription Game</h1>
                    <hr/>
                    <button className="start-button" onClick={() => setLevelSelectVisible(true)}>Start</button>
                </div>
            ) : levelSelectVisible ? (
                renderLevelsPage()
            ) : gameEnded ? (
                <>
                    <div>
                        <button className="exit-button" onClick={() => setLevelSelectVisible(true)}>
                            <FaArrowLeft/>
                        </button>
                        <h2 className='end-header'>Game Completed!</h2>
                        <FaStar size={50} color='orange'/><FaStar size={100} color='orange'/><FaStar size={50}
                                                                                                     color='orange'/>
                        <p className='end-para'>You completed all the levels </p>
                        <div>
                            <h2>Your total points: {points}</h2>
                        </div>
                        <Confetti
                            width={window.innerWidth}
                            height={window.innerHeight}
                        />
                    </div>
                </>
            ) : (
                <>
                    <div className="top-buttons">
                        <button className="exit-button" onClick={() => setLevelSelectVisible(true)}>
                            <FaArrowLeft/> Level Select
                        </button>
                        <button className="exit-button" onClick={() => setGameStarted(false)}>
                            <FaTimes/> Exit
                        </button>
                    </div>
                    <h1>{gameStarted ? `Level ${currentTaskIndex + 1}` : 'Audio Transcription Task'}</h1>
                    <hr/>
                    {lives > 0 ? (
                        <>
                            {tasks[currentTaskIndex] && (
                                <AudioPlayer src={tasks[currentTaskIndex].audio_url}/>
                            )}
                            <textarea value={transcription} onChange={(e) => setTranscription(e.target.value)}/>
                            <button className="submit-button" onClick={checkTranscription}>Submit</button>
                        </>
                    ) : null}
                    <Feedback message={feedback}
                              isError={isError}/> {/* The Feedback component handles displaying the message */}
                    <div className="point-lives">
                        <div className="points">
                            <p><FaGem/> Points: {points}</p>
                        </div>
                        <div className="lives">
                            <p>Lives: {renderHearts()}</p>
                        </div>
                    </div>
                </>
            )}
            <ToastContainer/>
        </div>
    );
};

export default App;


