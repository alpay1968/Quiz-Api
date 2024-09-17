// App.js

import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Question from "./Components/Question";
import Score from "./Components/Score";
import Pagination from "./Components/Pagination";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionBank: [],
            currentQuestion: 0,
            selectedOption: "",
            score: 0,
            quizEnd: false,
            loading: false,
            amount: 10,
            category: "9",
            difficulty: "easy",
            answers: [],  // Kullanıcı yanıtlarını ve doğru cevapları saklamak için
        };
    }

    fetchQuestions = () => {
        const { amount, category, difficulty } = this.state;
        this.setState({ loading: true });
        const API_URL = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;

        axios
            .get(API_URL)
            .then((response) => {
                const questions = response.data.results.map((questionItem, index) => ({
                    id: index + 1,
                    question: questionItem.question,
                    options: [...questionItem.incorrect_answers, questionItem.correct_answer].sort(),
                    answer: questionItem.correct_answer,
                }));
                this.setState({ questionBank: questions, currentQuestion: 0, quizEnd: false, score: 0, loading: false, answers: [] });
            })
            .catch((error) => {
                console.error("Error fetching questions:", error);
                this.setState({ loading: false });
            });
    };

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.fetchQuestions();
    };

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleOptionChange = (e) => {
        this.setState({ selectedOption: e.target.value });
    };

    handleNextQuestion = () => {
        const { questionBank, currentQuestion } = this.state;
        if (currentQuestion + 1 < questionBank.length) {
            this.setState((prevState) => ({
                currentQuestion: prevState.currentQuestion + 1,
                selectedOption: "",
            }));
        } else {
            this.setState({
                quizEnd: true,
            });
        }
    };

    handlePageChange = (index) => {
        this.setState({ currentQuestion: index });
    };

    checkAnswer = () => {
        const { questionBank, currentQuestion, selectedOption } = this.state;
        const question = questionBank[currentQuestion];
        const isCorrect = selectedOption === question.answer;

        this.setState((prevState) => ({
            score: isCorrect ? prevState.score + 1 : prevState.score,
            answers: [
                ...prevState.answers,
                {
                    question: question.question,
                    selectedOption: selectedOption,
                    correctAnswer: question.answer,
                    isCorrect: isCorrect
                }
            ]
        }));
    };

    render() {
        const { questionBank, currentQuestion, selectedOption, score, quizEnd, loading, amount, category, difficulty, answers } =
            this.state;

        return (
            <div className="App d-flex flex-column align-items-center justify-content-center">
                <h1 className="app-title">QUIZ APP</h1>

                {!loading && questionBank.length === 0 && (
                    <form onSubmit={this.handleFormSubmit} className="quiz-settings">
                        <div>
                            <label>Soru Sayısı (amount): </label>
                            <input
                                type="number"
                                name="amount"
                                value={amount}
                                onChange={this.handleInputChange}
                                className="form-control"
                                min="1"
                                max="50"
                                required
                            />
                        </div>

                        <div>
                            <label>Kategori (category): </label>
                            <select
                                name="category"
                                value={category}
                                onChange={this.handleInputChange}
                                className="form-control"
                            >
                                <option value="9">General Knowledge</option>
                                <option value="11">Movies</option>
                                <option value="21">Sports</option>
                                {/* İstediğin kadar kategori ekleyebilirsin */}
                            </select>
                        </div>

                        <div>
                            <label>Zorluk (difficulty): </label>
                            <select
                                name="difficulty"
                                value={difficulty}
                                onChange={this.handleInputChange}
                                className="form-control"
                            >
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>

                        <button type="submit" className="btn btn-primary mt-3">Soruları Getir</button>
                    </form>
                )}

                {loading && <p>Yükleniyor...</p>}

                {!quizEnd && questionBank.length > 0 && !loading && (
                    <>
                        <Question
                            question={questionBank[currentQuestion]}
                            selectedOption={selectedOption}
                            onOptionChange={this.handleOptionChange}
                            onSubmit={(e) => {
                                e.preventDefault();
                                this.checkAnswer();
                                this.handleNextQuestion();
                            }}
                        />
                        <Pagination
                            currentQuestion={currentQuestion}
                            totalQuestions={questionBank.length}
                            onPageChange={this.handlePageChange}
                        />
                    </>
                )}

                {quizEnd && <Score score={score} answers={answers} />}
            </div>
        );
    }
}

export default App;
