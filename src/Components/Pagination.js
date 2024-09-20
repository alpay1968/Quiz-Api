import React from "react";
const Pagination = ({ currentQuestion, totalQuestions, onPageChange }) => {
    const pages = [];
    const maxPagesToShow = 5; // Gösterilecek maksimum sayfa sayısı

    let startPage, endPage;

    if (totalQuestions <= maxPagesToShow) {
        startPage = 0;
        endPage = totalQuestions - 1;
    } else {
        startPage = Math.max(0, currentQuestion - Math.floor(maxPagesToShow / 2));
        endPage = Math.min(totalQuestions - 1, startPage + maxPagesToShow - 1);

        // Eğer son sayfa gösterilmiyorsa, son sayfayı göster
        if (endPage === totalQuestions - 1 && startPage > 0) {
            startPage = Math.max(0, endPage - maxPagesToShow + 1);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
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

    // Son sayfayı göstermek için
    if (endPage < totalQuestions - 1) {
        pages.push(
            <button
                key="last"
                className="btn btn-secondary m-1"
                onClick={() => onPageChange(totalQuestions - 1)}
            >
                {totalQuestions}
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