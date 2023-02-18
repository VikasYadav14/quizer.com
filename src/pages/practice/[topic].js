import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import Solutions from '@/components/Solutions';
const Quiz = () => {
  const router = useRouter();
  const { topic } = router.query;

  const { data, error } = useSWR(`/api/getQuestions/${topic}`, fetcher);

  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizStart, setQuizStart] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [solved, setSolved] = useState([]);
  const [markedForReview, setMarkedForReview] = useState([]);
  const [timer, setTimer] = useState();

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await fetcher(`/api/getQuestions/${topic}`);
      setQuizQuestions(data);
    };
    fetchQuestions();
  }, [topic]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(intervalId);
          {
            timer && setIsQuizFinished(true);
          }
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [minutes, seconds, timer]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    const solvedQuestions = [...solved];
    if (!solvedQuestions.includes(currentQuestion)) {
      solvedQuestions.push(currentQuestion);
    }
    setSolved(solvedQuestions);

    let updatedQuestions = [...quizQuestions];
    updatedQuestions[currentQuestion] = {
      ...updatedQuestions[currentQuestion],
      selectedOption: option,
    };
    setQuizQuestions(updatedQuestions);
  };

  const handleNextQuestion = () => {
    if (selectedOption === quizQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }

    setCurrentQuestion(currentQuestion + 1);
    setSelectedOption('');
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
    setSelectedOption(quizQuestions[currentQuestion - 1].selectedOption || '');
  };

  const handleSubmit = () => {
    if (selectedOption === quizQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setIsQuizFinished(true);
  };

  const handleMarkForReview = () => {
    const markedQuestions = [...markedForReview];
    if (!markedQuestions.includes(currentQuestion)) {
      markedQuestions.push(currentQuestion);
    } else {
      const index = markedQuestions.indexOf(currentQuestion);
      markedQuestions.splice(index, 1);
    }
    setMarkedForReview(markedQuestions);
  };
  if (error)
    return (
      <div className="min-h min-h-screen flex justify-center items-center">
        Error fetching data
      </div>
    );
  if (!data)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="flex justify-center items-center space-x-1 text-sm text-gray-700">
          <svg
            fill="none"
            className="w-6 h-6 animate-spin"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>

          <div>Loading ...</div>
        </div>
      </div>
    );
  return (
    <div className="min-h-screen">
      {!quizStart ? (
        <div className="flex flex-col justify-center items-center py-10 px-4">
          <h2 className="font-bold text-2xl mb-4">Welcome to the Quiz</h2>
          <div className="flex flex-col justify-center">
            <button
              className="bg-violet-400 w-72 px-4 py-2 mb-5 rounded-lg hover:bg-violet-500"
              onClick={() => {
                setQuizStart(true);
                setMinutes(10);
                setSeconds(0);
                setTimer(true);
              }}
            >
              Practice with timer
            </button>
            <button
              className="bg-violet-400 w-72 px-4 py-2 mb-5 rounded-lg hover:bg-violet-500"
              onClick={() => {
                setQuizStart(true);
                setTimer(false);
              }}
            >
              Practice without timer
            </button>
          </div>
        </div>
      ) : (
        <div className="container mx-auto lg:px-20 w-full">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 text-violet-600">
              {topic.toLocaleUpperCase()}
            </h1>
          </div>
          {isQuizFinished ? (
            <div>
              <div className="flex flex-col text-center items-center">
                <h2 className="text-xl font-bold mb-4">Quiz Completed</h2>
                <p className="mb-4">
                  Your score is {score}/{quizQuestions.length}
                </p>
                <Link
                  className="bg-violet-400 w-60 items-center px-4 py-2 rounded-lg hover:bg-violet-500"
                  href="/practice"
                >
                  Main Section
                </Link>
              </div>
              <Solutions data={quizQuestions} />
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-3/4 p-10">
                <h2 className="text-xl font-bold mb-4 ">
                  {currentQuestion + 1}.{' '}
                  {quizQuestions[currentQuestion]?.question}
                </h2>
                <div className="mb-6">
                  {quizQuestions[currentQuestion]?.options.map(
                    (option, index) => (
                      <div
                        key={index}
                        className={`flex items-center p-2 mb-4 ${
                          selectedOption === option
                            ? 'bg-violet-400 text-white'
                            : quizQuestions[currentQuestion].selectedOption ===
                              option
                            ? 'bg-violet-400'
                            : 'bg-gray-200'
                        }`}
                        onClick={() => handleOptionClick(option)}
                      >
                        <span
                          className={`w-3 h-3 mr-2 rounded-full ${
                            selectedOption === option
                              ? 'bg-gray-200'
                              : quizQuestions[currentQuestion]
                                  .selectedOption === option
                              ? 'bg-gray-200'
                              : 'bg-violet-400'
                          }`}
                        ></span>
                        <p className="font-medium">{option}</p>
                      </div>
                    )
                  )}
                </div>
                <div>
                  <div className="flex justify-between">
                    {currentQuestion > 0 && (
                      <button
                        className="bg-gray-400 px-4 py-2 rounded-lg hover:bg-gray-500"
                        onClick={handlePreviousQuestion}
                      >
                        Previous
                      </button>
                    )}
                    {currentQuestion < quizQuestions.length - 1 ? (
                      <button
                        className="bg-violet-400 px-4 py-2 rounded-lg hover:bg-violet-500"
                        onClick={handleNextQuestion}
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        className="bg-violet-400 px-4 py-2 rounded-lg hover:bg-violet-500"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    )}
                  </div>
                  <div className="mt-4">
                    <button
                      className={`px-4 py-2 rounded-md ${
                        markedForReview.includes(currentQuestion)
                          ? 'bg-orange-400 text-white'
                          : 'bg-gray-200 hover:bg-orange-100'
                      }`}
                      onClick={handleMarkForReview}
                    >
                      {markedForReview.includes(currentQuestion)
                        ? 'Marked for Review'
                        : 'Mark for Review'}
                    </button>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/4 p-4">
                {timer && (
                  <div className="text-center">
                    <p
                      className={`mb-4 font-bold text-3xl ${
                        minutes < 2 ? 'text-red-500' : 'text-green-400'
                      }`}
                    >
                      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                    </p>
                  </div>
                )}
                <div className="font-bold text-lg mb-4 text-center">
                  Question Status
                </div>
                <div className="p-4 grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-2">
                  {quizQuestions.map((question, index) => (
                    <div
                      key={question.id}
                      className={`p-2 rounded-md cursor-pointer text-center ${
                        index === currentQuestion
                          ? 'bg-blue-200'
                          : solved.includes(index)
                          ? 'bg-green-400'
                          : markedForReview.includes(index)
                          ? 'bg-orange-400'
                          : 'bg-gray-200 hover:bg-blue-100'
                      }`}
                      onClick={() => setCurrentQuestion(index)}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>
                <div className="p-4">
                  <div className="flex text-center mb-2">
                    <div className="bg-green-500 rounded-md mr-4 p-4"></div>
                    <p>Solved</p>
                  </div>
                  <div className="flex text-center mb-2">
                    <div className="bg-gray-200 rounded-md mr-4 p-4"></div>
                    <p>Unsolved</p>
                  </div>
                  <div className="flex text-center">
                    <div className="bg-orange-400 rounded-md mr-4 p-4"></div>
                    <p>Marked for Review</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;

async function fetcher(url) {
  const res = await fetch(url);
  const data = await res.json();
  return data.questions;
}
