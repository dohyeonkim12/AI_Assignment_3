// 초성 획수
const CHOSEONG_STROKES: { [key: string]: number } = {
  'ㄱ': 2, 'ㄲ': 4, 'ㄴ': 2, 'ㄷ': 3, 'ㄸ': 6,
  'ㄹ': 5, 'ㅁ': 4, 'ㅂ': 4, 'ㅃ': 8, 'ㅅ': 2,
  'ㅆ': 4, 'ㅇ': 1, 'ㅈ': 3, 'ㅉ': 6, 'ㅊ': 4,
  'ㅋ': 3, 'ㅌ': 4, 'ㅍ': 4, 'ㅎ': 3
};

// 중성 획수
const JUNGSEONG_STROKES: { [key: string]: number } = {
  'ㅏ': 2, 'ㅐ': 3, 'ㅑ': 3, 'ㅒ': 4, 'ㅓ': 2,
  'ㅔ': 3, 'ㅕ': 3, 'ㅖ': 4, 'ㅗ': 2, 'ㅘ': 4,
  'ㅙ': 5, 'ㅚ': 3, 'ㅛ': 3, 'ㅜ': 2, 'ㅝ': 4,
  'ㅞ': 5, 'ㅟ': 3, 'ㅠ': 3, 'ㅡ': 1, 'ㅢ': 2,
  'ㅣ': 1
};

// 종성 획수
const JONGSEONG_STROKES: { [key: string]: number } = {
  '': 0, 'ㄱ': 2, 'ㄲ': 4, 'ㄳ': 3, 'ㄴ': 2,
  'ㄵ': 4, 'ㄶ': 4, 'ㄷ': 3, 'ㄹ': 5, 'ㄺ': 7,
  'ㄻ': 9, 'ㄼ': 9, 'ㄽ': 7, 'ㄾ': 9, 'ㄿ': 9,
  'ㅀ': 8, 'ㅁ': 4, 'ㅂ': 4, 'ㅄ': 5, 'ㅅ': 2,
  'ㅆ': 4, 'ㅇ': 1, 'ㅈ': 3, 'ㅊ': 4, 'ㅋ': 3,
  'ㅌ': 4, 'ㅍ': 4, 'ㅎ': 3
};

// 한글 자모 분리 함수
function decomposeHangul(char: string): { choseong: string; jungseong: string; jongseong: string } {
  const code = char.charCodeAt(0);
  console.log(`Character: ${char}, Code: ${code}`);
  
  if (code < 0xAC00 || code > 0xD7A3) {
    console.log('Not a valid Hangul character');
    return { choseong: '', jungseong: '', jongseong: '' };
  }

  const syllable = code - 0xAC00;
  const jong = syllable % 28;
  const jung = ((syllable - jong) / 28) % 21;
  const cho = Math.floor(((syllable - jong) / 28) / 21);

  console.log(`Syllable: ${syllable}, Jong: ${jong}, Jung: ${jung}, Cho: ${cho}`);

  const choList = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
  const jungList = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ';
  const jongList = 'ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ';

  const result = {
    choseong: choList[cho],
    jungseong: jungList[jung],
    jongseong: jong > 0 ? jongList[jong - 1] : ''
  };
  
  console.log(`Decomposed: ${JSON.stringify(result)}`);
  return result;
}

// 한 글자의 획수 계산
function getStrokeCount(char: string): number {
  const { choseong, jungseong, jongseong } = decomposeHangul(char);
  const strokes = (CHOSEONG_STROKES[choseong] || 0) + 
                 (JUNGSEONG_STROKES[jungseong] || 0) + 
                 (JONGSEONG_STROKES[jongseong] || 0);
  console.log(`Stroke count for ${char}: ${strokes} (${choseong}:${CHOSEONG_STROKES[choseong]}, ${jungseong}:${JUNGSEONG_STROKES[jungseong]}, ${jongseong}:${JONGSEONG_STROKES[jongseong]})`);
  return strokes;
}

// 이름의 각 글자 획수를 계산하는 함수
function getStrokeCounts(name: string): number[] {
  return name.split('').map(char => getStrokeCount(char));
}

// 궁합 계산 단계를 반환하는 함수
export function getCompatibilitySteps(name1: string, name2: string): number[][] {
  const strokes1 = getStrokeCounts(name1);
  const strokes2 = getStrokeCounts(name2);
  
  const steps: number[][] = [];
  // 이름을 번갈아가며 획수 배열 생성
  let currentStep: number[] = [];
  const maxLength = Math.max(strokes1.length, strokes2.length);
  
  for (let i = 0; i < maxLength; i++) {
    if (i < strokes1.length) currentStep.push(strokes1[i]);
    if (i < strokes2.length) currentStep.push(strokes2[i]);
  }
  
  steps.push([...currentStep]);

  while (currentStep.length > 2) {
    const nextStep: number[] = [];
    for (let i = 0; i < currentStep.length - 1; i++) {
      const sum = currentStep[i] + currentStep[i + 1];
      // 10 이상이면 10으로 나눈 나머지를 사용
      nextStep.push(sum >= 10 ? sum % 10 : sum);
    }
    currentStep = nextStep;
    steps.push([...currentStep]);
  }

  return steps;
}

// 최종 궁합 점수와 메시지를 계산하는 함수
export function calculateCompatibility(name1: string, name2: string): { score: number; message: string } {
  const steps = getCompatibilitySteps(name1, name2);
  const finalScore = parseInt(steps[steps.length - 1].join(''));

  let message = '';
  if (finalScore >= 80) {
    message = '완벽한 궁합! 영원한 사랑이 이어질 거예요.';
  } else if (finalScore >= 60) {
    message = '좋은 궁합! 서로를 이해하고 존중하는 관계가 될 거예요.';
  } else if (finalScore >= 40) {
    message = '보통의 궁합. 서로의 차이를 인정하고 배려하면 좋은 관계가 될 수 있어요.';
  } else {
    message = '조금 어려운 궁합. 하지만 서로의 노력으로 좋은 관계를 만들 수 있어요.';
  }

  return {
    score: finalScore,
    message
  };
} 