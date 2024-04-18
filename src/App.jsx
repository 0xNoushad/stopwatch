import './App.css';
import React, { useState, useEffect } from 'react';
import 1.mp3 from './1.mp3';

function App() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [inputHours, setInputHours] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [playSound, setPlaySound] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedTime(prevElapsedTime => {
          const remainingTime = prevElapsedTime - 1;
          if (remainingTime <= 0) {
            clearInterval(intervalId);
            setIsRunning(false);
            setPlaySound(true);
            return 0;
          }
          return remainingTime;
        });
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return (
      <div>
        <span>{hours.toString().padStart(2, '0')}</span>:
        <span>{minutes.toString().padStart(2, '0')}</span>:
        <span>{seconds.toString().padStart(2, '0')}</span>
      </div>
    );
  };

  const handleStartStop = () => {
    if (!isRunning) {
      const totalInputSeconds = inputHours * 3600 + inputMinutes * 60 + inputSeconds;
      if (totalInputSeconds > 0) {
        setElapsedTime(totalInputSeconds);
        setIsRunning(true);
        setPlaySound(false);
      }
    } else {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setPlaySound(false);
  };

  return (
    <div>
      <h1>Stopwatch</h1>
      {formatTime(elapsedTime)}
      <div>
        <input
          type="number"
          value={inputHours}
          onChange={(e) => setInputHours(parseInt(e.target.value))}
          placeholder="Hours"
        />
        <input
          type="number"
          value={inputMinutes}
          onChange={(e) => setInputMinutes(parseInt(e.target.value))}
          placeholder="Minutes"
        />
        <input
          type="number"
          value={inputSeconds}
          onChange={(e) => setInputSeconds(parseInt(e.target.value))}
          placeholder="Seconds"
        />
      </div>
      <button onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</button>
      <button onClick={handleReset}>Reset</button>
      {playSound && <audio autoPlay><source src={soundFile} type="audio/mpeg" /></audio>}
    </div>
  );
}

export default App;
