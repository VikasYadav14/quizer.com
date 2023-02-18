import React from 'react';

const Solutions = ({data}) => {
  return (
    <div className="flex justify-center p-10">
      <div className="rounded-md bg-gray-100 w-full">
        <h1 className='text-center p-5 text-3xl font-bold text-violet-600 underline'>Answers</h1>
        {data.map((que, idx) => (
          <ul key={idx}>
            <h2 className="text-lg font-bold pl-10">{idx+1}. {que.question}</h2>
            <li className='flex items-center mb-4 text-gray-600 font-bold pl-10'>Ans=&gt; {que.answer}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Solutions;
