"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { calculateCompatibility, getCompatibilitySteps } from '@/lib/hangul';

export default function Result() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const name1 = searchParams.get('name1') || '';
  const name2 = searchParams.get('name2') || '';

  const { score, message } = calculateCompatibility(name1, name2);
  const steps = getCompatibilitySteps(name1, name2);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            {name1}과(와) {name2}의 궁합
          </h2>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 text-center">계산 과정</h3>
          {steps.map((step, index) => (
            <div key={index} className="flex justify-center space-x-2">
              {step.map((num, numIndex) => (
                <span
                  key={numIndex}
                  className="w-8 h-8 flex items-center justify-center bg-pink-100 text-pink-600 rounded-full"
                >
                  {num}
                </span>
              ))}
            </div>
          ))}
        </div>

        <div className="text-center pt-4 border-t border-gray-200">
          <div className="text-6xl font-bold text-pink-600 mb-4">
            {score}점
          </div>
          <p className="text-lg text-gray-600 mb-8">
            {message}
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => router.push('/input')}
            className="px-4 py-2 text-sm font-medium text-pink-600 hover:text-pink-700"
          >
            다시하기
          </button>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 text-sm font-medium text-pink-600 hover:text-pink-700"
          >
            처음으로
          </button>
        </div>
      </div>
    </main>
  );
} 