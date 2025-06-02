"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { calculateCompatibility, getCompatibilitySteps } from '@/lib/hangul';

export default function ResultContent() {
  const searchParams = useSearchParams();
  const name1 = searchParams.get('name1') || '';
  const name2 = searchParams.get('name2') || '';

  const [combinedName, setCombinedName] = useState<string>('');
  const [steps, setSteps] = useState<number[][]>([]);
  const [finalResult, setFinalResult] = useState<{ score: number; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (name1 && name2) {
      setIsLoading(true);
      // 이름을 번갈아 합치기 (getCompatibilitySteps 내부 로직과 동일)
      const combined = [];
      for (let i = 0; i < Math.max(name1.length, name2.length); i++) {
        if (i < name1.length) combined.push(name1[i]);
        if (i < name2.length) combined.push(name2[i]);
      }
      const combinedString = combined.join('');
      setCombinedName(combinedString);
      console.log('Combined Name:', combinedString);

      const compatibilitySteps = getCompatibilitySteps(name1, name2);
      setSteps(compatibilitySteps);
      console.log('Compatibility Steps:', compatibilitySteps);

      const result = calculateCompatibility(name1, name2);
      setFinalResult(result);
      console.log('Final Result:', result);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [name1, name2]);

  if (!name1 || !name2) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 to-purple-100">
        <p className="text-xl text-gray-700">이름 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 to-purple-100">
        <p className="text-xl text-gray-700">궁합 계산 중...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">궁합 결과</h1>

        {combinedName && (
          <div className="text-2xl font-semibold mb-8 text-gray-700">
            {combinedName.split('').map((char, index) => (
              <span key={index} className={index % 2 === 0 ? 'text-blue-600' : 'text-red-600'}>
                {char}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-col items-center space-y-4">
          {steps.map((step, stepIndex) => (
            <div key={stepIndex} className="flex justify-center space-x-4">
              {step.map((num, numIndex) => (
                <div key={numIndex} className="text-xl font-mono text-gray-800">
                  {num}
                </div>
              ))}
            </div>
          ))}
        </div>

        {finalResult && steps.length > 0 && (
          <div className="mt-12 p-8 bg-pink-50 rounded-lg flex flex-col items-center justify-center" style={{ minWidth: '200px', minHeight: '150px' }}>
            <div className="text-6xl font-bold text-pink-500 mb-2">
              {finalResult.score}%
            </div>
            <div className="text-xl text-gray-700 font-medium">
              {finalResult.message}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 