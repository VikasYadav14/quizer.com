import { useRouter } from 'next/router';
import React, { useState } from 'react';

const Instructions = () => {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const handleStartQuiz = () => {
    router.push('/quiz');
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
        <div className='p-20 bg-white rounded-md'>
      <h1 className="text-4xl font-bold mb-8">Instructions</h1>
      <ul className="list-disc text-left">
        <li className="my-4">
          The quiz consists of multiple-choice questions.
        </li>
        <li className="my-4">
          Each question has 4 options, and only one option is correct.
        </li>
        <li className="my-4">
          You can navigate between questions using the &quot;Previous&quot; and
          &quot;Next&quot; buttons.
        </li>
        <li className="my-4">
          You can submit your answers using the &quot;Submit&quot; button once
          you have answered all questions.
        </li>
        <li className="my-4">
          The timer will start as soon as you begin the quiz, and the quiz will
          end automatically when the time is up.
        </li>
        <li className="my-4">
          You can see your score and review your answers after submitting the
          quiz.
        </li>
        <li className="my-4">You can see your questions status as same as following</li>
        <div className="flex  justify-betweenp-4">
          <div className="flex text-center m-2">
            <div className="bg-green-500 rounded-md mr-4 p-4"></div>
            <p>Solved</p>
          </div>
          <div className="flex text-center m-2">
            <div className="bg-gray-200 rounded-md mr-4 p-4"></div>
            <p>Unsolved</p>
          </div>
          <div className="flex text-center m-2">
            <div className="bg-orange-400 rounded-md mr-4 p-4"></div>
            <p>Marked for Review</p>
          </div>
        </div>
      </ul>
      <div className="mt-10">
        <input
          type="checkbox"
          id="agree"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          className="mr-4"
        />
        <label htmlFor="agree" className="font-medium">
          I agree to the quiz instructions
        </label>
      </div>
      <button
        className="mt-6 py-2 px-4 rounded-lg bg-blue-500 text-white font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        onClick={handleStartQuiz}
        disabled={!isChecked}
      >
        Start Quiz
      </button>
      </div>
    </div>
  );
};

export default Instructions;
