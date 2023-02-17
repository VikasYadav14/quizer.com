import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const Quiz = () => {
  const router = useRouter();
  const { topic } = router.query;
  const [quizQuestions, setQuizQuestions] = useState([
    {
      _id: '63ed2cbbb3149138a9b979d5',
      topic: 'analogy',
      question: 'Fruit : Banana :: Mammal : ?',
      options: ['Sparrow', 'Fish', 'Snake', 'Cow'],
      answer: 'Cow',
      explanation: 'First denotes the class to which the second belongs.',
      __v: 0,
    },
    {
      _id: '63ed313ab3149138a9b979f4',
      topic: 'analogy',
      question: 'Sports : Logo :: Nation : ?',
      options: ['Animal', 'Emblem', 'Ruler', 'Anthem'],
      answer: 'Emblem',
      explanation: 'Second is a symbol of the first.',
      __v: 0,
    },
    {
      _id: '63ed30d7b3149138a9b979f0',
      topic: 'analogy',
      question: 'Knife : Cut :: Axe : ?',
      options: ['Chop', 'Sever', 'Slice', 'Lacerate'],
      answer: 'Chop',
      explanation: 'Second denotes the action of the first.',
      __v: 0,
    },
    {
      _id: '63ed3045b3149138a9b979ec',
      topic: 'analogy',
      question: 'Doctor : Diagnosis :: Judge : ?',
      options: ['Judgement', 'Lawyer', 'Punishment', 'Court'],
      answer: 'Judgement',
      explanation:
        'The function of a doctor is to diagnose a disease and that of a judge is to give judgement.',
      __v: 0,
    },
    {
      _id: '63ed2e9db3149138a9b979e0',
      topic: 'analogy',
      question: 'Appraiser : Building :: Critic : ?',
      options: ['Gold', 'Book', 'Judge', 'Masterpiece'],
      answer: 'Book',
      explanation: 'First comments on the second.',
      __v: 0,
    },
    {
      _id: '63ed2fa3b3149138a9b979ea',
      topic: 'analogy',
      question: 'Horse : Jockey :: Car : ?',
      options: ['Brake', 'Steering', 'Chauffeur', 'Mechanic'],
      answer: 'Chauffeur',
      explanation:
        'Horse is driven by a jockey.\nSimilarly, car is driven by a chauffeur.',
      __v: 0,
    },
  ]);
  const [totalQuestions, setTotalQuestions] = useState(10);

  //   useEffect(() => {
  //     async function getData() {
  //       const response = await fetch(`/api/getQuestions/analogy}`);
  //       if (response.status === 404) {
  //         toast('Question Coming Soon', { position: 'bottom-center' });
  //       }
  //       const data = await response.json();
  //       if (data.status === true) {
  //         setQuizQuestions(data.questions);
  //       }
  //     }
  //     getData();
  //   }, []);

  const [quizStart, setQuizStart] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [solved, setSolved] = useState([]);
  const [markedForReview, setMarkedForReview] = useState([]);
  console.log(quizQuestions);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(intervalId);
          setIsQuizFinished(true);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [minutes, seconds]);

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
  return (
    <div className="h-screen">
        <div className='flex justify-center text-center text-2xl font-bold mt-5'>Mock Test No. = 1</div>
      <div className=" bg-gray-100 lg:p-14 border-2 mt-10 rounded-md">
        <div className="">
          {isQuizFinished ? (
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
          ) : (
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-3/4 p-8 border-2 m-2 bg-white rounded-md">
                <h2 className="text-xl font-bold mb-4 ">
                  {currentQuestion + 1}.{' '}
                  {quizQuestions[currentQuestion].question}
                </h2>
                <div className="mb-6">
                  {quizQuestions[currentQuestion].options.map(
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
              <div className="lg:w-1/4 p-4 border-2 rounded-md m-2 bg-white">
                <div className="text-center">
                  <p
                    className={`mb-4 font-bold text-3xl ${
                      minutes < 2 ? 'text-red-500' : 'text-green-400'
                    }`}
                  >
                    {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                  </p>
                </div>
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
      </div>
    </div>
  );
};

export default Quiz;

quizQuestions: [
  {
    topic: 'analogy',
    question: 'Fruit : Banana :: Mammal : ?',
    options: ['Sparrow', 'Fish', 'Snake', 'Cow'],
    answer: 'Cow',
    explanation: 'First denotes the class to which the second belongs.',
    __v: 0,
  },
  {
    _id: '63ed313ab3149138a9b979f4',
    topic: 'analogy',
    question: 'Sports : Logo :: Nation : ?',
    options: ['Animal', 'Emblem', 'Ruler', 'Anthem'],
    answer: 'Emblem',
    explanation: 'Second is a symbol of the first.',
    __v: 0,
  },
  {
    _id: '63ed30d7b3149138a9b979f0',
    topic: 'analogy',
    question: 'Knife : Cut :: Axe : ?',
    options: ['Chop', 'Sever', 'Slice', 'Lacerate'],
    answer: 'Chop',
    explanation: 'Second denotes the action of the first.',
    __v: 0,
  },
  {
    _id: '63ed3045b3149138a9b979ec',
    topic: 'analogy',
    question: 'Doctor : Diagnosis :: Judge : ?',
    options: ['Judgement', 'Lawyer', 'Punishment', 'Court'],
    answer: 'Judgement',
  },
  {
    topic: 'analogy',
    question: 'Appraiser : Building :: Critic : ?',
    options: ['Gold', 'Book', 'Judge', 'Masterpiece'],
    answer: 'Book',
  },
  {
    topic: 'analogy',
    question: 'Horse : Jockey :: Car : ?',
    options: ['Brake', 'Steering', 'Chauffeur', 'Mechanic'],
    answer: 'Chauffeur',
  },
];
