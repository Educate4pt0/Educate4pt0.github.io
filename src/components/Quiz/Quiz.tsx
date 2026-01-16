import React, { useState, useMemo } from 'react';
import styles from './quiz.module.css';

export interface QuizQuestion {
    question: string;
    answers: string[];
    distractors?: string[];
}

interface QuizProps {
    questions: QuizQuestion[];
}

// Fisher-Yates shuffle algorithm
const shuffleArray = (array: string[]): string[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

const Quiz: React.FC<QuizProps> = ({ questions }) => {
    const [submitted, setSubmitted] = useState<boolean[]>(new Array(questions.length).fill(false));
    const [selectedAnswers, setSelectedAnswers] = useState<(string | string[])[]>(
        new Array(questions.length).fill(null)
    );



    const getQuestionType = (q: QuizQuestion): 'qa' | 'radio' | 'multiselect' => {
        if (q.answers.length > 1) return 'multiselect';
        if (q.distractors && q.distractors.length > 0) return 'radio';
        return 'qa';
    };

    // Pre-compute shuffled options for each question on component mount
    const shuffledOptions = useMemo(() => {
        return questions.map((q) => {
            const qType = getQuestionType(q);
            if (qType === 'qa') {
                return q.answers;
            }
            return shuffleArray([...q.answers, ...(q.distractors || [])]);
        });
    }, [questions]);


    const handleSingleSelect = (qIndex: number, answer: string) => {
        const newSelected = [...selectedAnswers];
        newSelected[qIndex] = answer;
        setSelectedAnswers(newSelected);
    };

    const handleMultiSelect = (qIndex: number, answer: string) => {
        const newSelected = [...selectedAnswers];
        const current = Array.isArray(newSelected[qIndex]) ? newSelected[qIndex] : [];

        if ((current as string[]).includes(answer)) {
            newSelected[qIndex] = (current as string[]).filter(a => a !== answer);
        } else {
            newSelected[qIndex] = [...(current as string[]), answer];
        }
        setSelectedAnswers(newSelected);
    };

    const handleSubmit = (qIndex: number) => {
        const newSubmitted = [...submitted];
        newSubmitted[qIndex] = true;
        setSubmitted(newSubmitted);
    };

    const handleReset = (qIndex: number) => {
        const newSubmitted = [...submitted];
        const newSelected = [...selectedAnswers];
        newSubmitted[qIndex] = false;
        newSelected[qIndex] = null;
        setSubmitted(newSubmitted);
        setSelectedAnswers(newSelected);
    };

    const isCorrect = (qIndex: number): boolean => {
        const q = questions[qIndex];
        const selected = selectedAnswers[qIndex];
        const type = getQuestionType(q);

        if (type === 'multiselect') {
            if (!Array.isArray(selected)) return false;
            return (
                selected.length === q.answers.length &&
                q.answers.every(a => (selected as string[]).includes(a))
            );
        } else {
            return selected === q.answers[0];
        }
    };

    return (
        <div className={styles.quizContainer} role="region" aria-label="Quiz">
            {questions.map((question, qIndex) => {
                const qType = getQuestionType(question);
                const allOptions = shuffledOptions[qIndex];

                // Q&A questions use details tag
                if (qType === 'qa') {
                    return (
                        <details key={qIndex} className={styles.qaQuestion} data-quiz-qa>
                            <summary className={styles.qaSummary}>{question.question}</summary>

                            <div className={styles.qaAnswer} data-quiz-answer>
                                {question.answers.map((answer, aIndex) => (
                                    <div key={aIndex} className={styles.answerItem} data-answer-item>
                                        {answer}
                                    </div>
                                ))}
                            </div>
                        </details>
                    );
                }

                // Radio and multi-select use interactive format
                const isAnswered = selectedAnswers[qIndex] !== null;
                const isMarkedCorrect = submitted[qIndex] && isCorrect(qIndex);
                const isMarkedIncorrect = submitted[qIndex] && !isCorrect(qIndex);

                return (
                    <div key={qIndex} className={styles.questionWrapper} data-quiz-question>
                        <div className={styles.questionContent}>
                            <h4 className={styles.question}>{question.question}</h4>

                            <div className={styles.optionsContainer} data-quiz-options>
                                {allOptions.map((option, oIndex) => {
                                    const isSelected = qType === 'multiselect'
                                        ? Array.isArray(selectedAnswers[qIndex]) && (selectedAnswers[qIndex] as string[]).includes(option)
                                        : selectedAnswers[qIndex] === option;

                                    const isCorrectAnswer = question.answers.includes(option);

                                    return (
                                        <label
                                            key={oIndex}
                                            className={`${styles.option} ${isSelected ? styles.selected : ''} ${submitted[qIndex] && isCorrectAnswer ? styles.correct : ''
                                                } ${submitted[qIndex] && isSelected && !isCorrectAnswer ? styles.incorrect : ''}`}
                                            data-correct={isCorrectAnswer}
                                            data-quiz-option
                                        >
                                            <input
                                                type={qType === 'multiselect' ? 'checkbox' : 'radio'}
                                                name={`question-${qIndex}`}
                                                value={option}
                                                checked={isSelected}
                                                onChange={() => qType === 'multiselect'
                                                    ? handleMultiSelect(qIndex, option)
                                                    : handleSingleSelect(qIndex, option)
                                                }
                                                disabled={submitted[qIndex]}
                                            />
                                            <span className={styles.optionText}>{option}</span>
                                        </label>
                                    );
                                })}
                            </div>

                            <div className={styles.buttonGroup} data-quiz-buttons>
                                {!submitted[qIndex] ? (
                                    <button
                                        className={`${styles.button} ${styles.submitButton}`}
                                        onClick={() => handleSubmit(qIndex)}
                                        disabled={!isAnswered}
                                    >
                                        Check Answer
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            className={`${styles.button} ${styles.resetButton}`}
                                            onClick={() => handleReset(qIndex)}
                                        >
                                            Try Again
                                        </button>
                                        {isMarkedCorrect && (
                                            <div className={styles.feedback + ' ' + styles.correct}>
                                                Correct!
                                            </div>
                                        )}
                                        {isMarkedIncorrect && (
                                            <div className={styles.feedback + ' ' + styles.incorrect}>
                                                Incorrect.
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Quiz;
