import React, { Component } from "react";
import Options from "./Option";

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitMessage: "",  // Bu state mesajı tutacak
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(e);  // Dışarıdan gelen form gönderme işlemi

        // Mesajı güncelle
        this.setState({
            submitMessage: "Yanıtınız kaydedildi!",  // Mesajı güncelliyoruz
        });

        // 3 saniye sonra mesajı temizle
        setTimeout(() => {
            this.setState({ submitMessage: "" });
        }, 3000);
    };

    render() {
        const { question, selectedOption, onOptionChange } = this.props;
        const { submitMessage } = this.state;

        return (
            <div>
                <h3>Question {question.id}</h3>
                <container className="sorular">
                <h5 className="mt-2">{question.question}</h5>
                <form onSubmit={this.handleSubmit} className="mt-2 mb-2">
                    <Options
                        options={question.options}
                        selectedOption={selectedOption}
                        onOptionChange={onOptionChange}
                    />
                    <button type="submit" className="btn btn-primary mt-2">
                        SUBMIT
                    </button>
                </form>
                </container>

                {/* Eğer submitMessage varsa göster */}
                {submitMessage && (
                    <p className="text-success mt-2">{submitMessage}</p>
                )}
            </div>
        );
    }
}

export default Question;
