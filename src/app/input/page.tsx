'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NameInput() {
  const router = useRouter();
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name1 && name2) {
      router.push(`/result?name1=${encodeURIComponent(name1)}&name2=${encodeURIComponent(name2)}`);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            이름 궁합 보기
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            두 사람의 이름을 입력하고 궁합을 확인해보세요
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name1" className="sr-only">
                첫 번째 이름
              </label>
              <input
                id="name1"
                name="name1"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                placeholder="첫 번째 이름"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="name2" className="sr-only">
                두 번째 이름
              </label>
              <input
                id="name2"
                name="name2"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                placeholder="두 번째 이름"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              궁합 보기
            </button>
          </div>
        </form>
      </div>
    </main>
  );
} 