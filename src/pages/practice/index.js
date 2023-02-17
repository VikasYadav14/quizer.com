import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function Practice({data}) {
  const [allData, setAllData] = useState(data);
  const [selected, setSelected] = useState('Reasoning');
  const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch(`/api/getSubject`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setAllData(data);
  //       setIsLoading(false);
  //     });
  // }, []);
  const router = useRouter();

  if (router.isFallback) {return <div className='min-h min-h-screen flex justify-center items-center'><p>Loading...</p></div>;}
  return (
    <div className='bg-white min-h-screen'>
      <div className="p-10">
        <div className="bg-violet-500 text-white p-4 rounded-md">
          <ul className="flex justify-around">
            {allData?.map((sub) => (
              <li className='m-2 cursor-pointer'
                key={sub.name}
                onClick={() => {
                  setSelected(sub?.name);
                }}
              >
                {sub.name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="w-full h-auto lg:px-20">
            <div className="p-4">
              {allData?.map((sub) => {
                if (sub.name === selected) {
                  return (
                    <div key={sub?.name}>
                      <h2 className="text-center text-2xl font-medium mb-10">
                        {selected} Topics
                      </h2>
                      <div className="flex flex-col">
                        <div className="p-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5 bg-gray-100 rounded-2xl">
                          {sub.topics.map((category, index) => {
                            return (
                              <Link
                                href={`/practice/${category
                                  .toLowerCase()
                                  }`}
                                key={index}
                                className="text-lg font-medium text-gray-800 hover:text-violet-600"
                              >
                                <li className="p-2">{category}</li>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Practice;
export async function getServerSideProps(context) {
  const baseUrl = process.env.BASE_URL;
  const res = await fetch(`${baseUrl}/api/getSubject`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data },
  }
}