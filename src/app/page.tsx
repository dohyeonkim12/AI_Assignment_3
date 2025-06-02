"use client";

import { useRouter } from 'next/navigation';

export default function Landing() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-100 to-purple-100">
      <div className="text-center space-y-8 p-8">
        <h1 className="text-4xl md:text-6xl font-bold text-pink-600 mb-4">
          이름 궁합 테스트
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          당신과 그 사람의 이름 궁합을 알아보세요
        </p>
        <button
          onClick={() => router.push('/input')}
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors duration-200"
        >
          시작하기
        </button>
      </div>
    </main>
  );
}
