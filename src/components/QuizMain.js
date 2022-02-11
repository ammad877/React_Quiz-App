import React, {Component} from 'react';
import Question from './question/Question';
import Answer from './answer/Answer';
import './QuizMain.css';

export default class Quiz extends Component {

    // initiating the local state
    state = {
        quiestions: {
            1: 'What does HTML stand for?',
            2: 'Who is making the Web standards?',
            3: 'Choose the correct HTML element for the largest heading:',
            4: 'What is the correct HTML element for inserting a line break?',
            5: 'Choose the correct HTML element to define emphasized text'
        },
        answers: {
            1: {
                1: 'Hyper Text Markup language',
                2: 'Home Tool Markup language',
                3: 'Hyperlinks and text Markup language'
            },
            2: {
                1: 'Mozilla',
                2: 'Microsoft',
                3: 'The World Wide Web Consortium'
            },
            3: {
                1: '<heading>',
                2: '<h6>>',
                3: '<h1>>'
            },
            4:{
                1: '<br>',
                2: '<break>',
                3: '<lb>'
            },
            5:{
                1: '<i>',
                2: '<italic>',
                3: '<em>'
            }
        },
        correctAnswers: {
            1: '1',
            2: '3',
            3: '3',
            4: '1',
            5: '3'
        },
        correctAnswer: 0,
        clickedAnswer: 0,
        step: 1,
        score: 0
    }

    // the method that checks the correct answer
    checkAnswer = answer => {
        const { correctAnswers, step, score } = this.state;
        if(answer === correctAnswers[step]){
            this.setState({
                score: score + 1,
                correctAnswer: correctAnswers[step],
                clickedAnswer: answer
            });
        }else{
            this.setState({
                correctAnswer: 0,
                clickedAnswer: answer
            });
        }
    }

    // method to move to the next question
    nextStep = (step) => {
        this.setState({
            step: step + 1,
            correctAnswer: 0,
            clickedAnswer: 0
        });
    }

    render(){
        let { quiestions, answers, correctAnswer, clickedAnswer, step, score } = this.state;
        return(
            <div className="Content">
                {step <= Object.keys(quiestions).length ? 
                    (<>
                        <Question
                            question={quiestions[step]}
                        />
                        <Answer
                            answer={answers[step]}
                            step={step}
                            checkAnswer={this.checkAnswer}
                            correctAnswer={correctAnswer}
                            clickedAnswer={clickedAnswer}
                        />
                        <button
                        className="NextStep"
                        disabled={
                            clickedAnswer && Object.keys(quiestions).length >= step
                            ? false : true
                        }
                        onClick={() => this.nextStep(step)}>Next</button>
                    </>) : (
                        <div className="finalPage">
                            <h1>You have completed the quiz!</h1>
                            <h3>Your score is: {score} of {Object.keys(quiestions).length}</h3>
                            <p>Thank you!</p>
                        </div>
                    )
                }
            </div>
        );
    }
}