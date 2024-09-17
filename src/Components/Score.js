// Score.js

import React from 'react';
import '../App.css';

const Score = ({ score, answers }) => {
    return (
        <div>
            <h2>Results</h2>
            <h4>Your score: {score}</h4>
            <h5>Answer Breakdown:</h5>
            <ul>
                {answers.map((answer, index) => (
                    <li key={index}>
                        <strong>Question:</strong> {answer.question} <br />
                        <strong>Your Answer:</strong> {answer.selectedOption} <br />
                        <strong>Correct Answer:</strong> {answer.correctAnswer} <br />
                        <strong>Result:</strong> {answer.isCorrect ? "Correct" : "Incorrect"} <br />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Score;
