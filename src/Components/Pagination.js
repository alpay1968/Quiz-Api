// Pagination.js

import React from 'react';

const Pagination = ({ currentQuestion, totalQuestions, onPageChange }) => {
    const pages = [];
    
    for (let i = 0; i < totalQuestions; i++) {
        pages.push(
            <button
                key={i}
                className={`btn btn-secondary m-1 ${i === currentQuestion ? 'active' : ''}`}
                onClick={() => onPageChange(i)}
            >
                {i + 1}
            </button>
        );
    }

    return (
        <div className="pagination">
            {pages}
        </div>
    );
};

export default Pagination;
