import styles from './Pomodoro.module.css';
import React, { useState, useEffect } from "react";

function Pomodoro() {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [displayMessage, setDisplayMessage] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [inputMinutes, setInputMinutes] = useState(25);
    const [inputSeconds, setInputSeconds] = useState(0);

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                if (seconds === 0) {
                    if (minutes !== 0) {
                        setSeconds(59);
                        setMinutes(minutes - 1);
                    } else {
                        let newMinutes = displayMessage ? inputMinutes - 1 : 4;
                        setMinutes(newMinutes);
                        setSeconds(59);
                        setDisplayMessage(!displayMessage); // Toggle message for break or session
                    }
                } else {
                    setSeconds(seconds - 1);
                }
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setMinutes(inputMinutes);
        setSeconds(inputSeconds);
        setIsActive(false);
    };

    const handleSetTimer = () => {
        const min = parseInt(inputMinutes);
        const sec = parseInt(inputSeconds);

        if (isNaN(min) || min < 0 || isNaN(sec) || sec < 0 || sec > 59) {
            alert("Please enter a valid time. Minutes should be 0 or positive, and seconds should be between 0 and 59.");
        } else {
            setMinutes(min);
            setSeconds(sec);
            setIsActive(false);
            setDisplayMessage(false);
        }
    };

    const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return (
        <div className={styles.app}>
            <div className={styles.pomodoro}>
                <div className={styles.message}>
                    {displayMessage && <div>Break time! New session starts in:</div>}
                </div>
                <div className={styles.timer}>
                    {timerMinutes}:{timerSeconds}
                </div>
                <button onClick={toggleTimer} className={styles.startPauseButton}>
                    {isActive ? "Pause" : "Start"}
                </button>
                <button onClick={resetTimer} className={styles.resetButton}>
                    Reset
                </button>

                <div className={styles.inputs}>
                    <input
                        type="number"
                        min="0"
                        placeholder="Minutes"
                        value={inputMinutes}
                        onChange={(e) => setInputMinutes(e.target.value)}
                        className={styles.timeInput}
                    />
                    <input
                        type="number"
                        min="0"
                        max="59"
                        placeholder="Seconds"
                        value={inputSeconds}
                        onChange={(e) => setInputSeconds(e.target.value)}
                        className={styles.timeInput}
                    />
                    <button onClick={handleSetTimer} className={styles.setTimerButton}>
                        Set Timer
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Pomodoro;
