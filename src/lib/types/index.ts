export enum AnimalType {
  PEGASUS = 'PEGASUS',
  LION = 'LION',
  CHEETAH = 'CHEETAH',
  DEER = 'DEER',
  ELEPHANT = 'ELEPHANT',
  MONKEY = 'MONKEY',
  BLACK_PANTHER = 'BLACK_PANTHER',
  RACCOON_DOG = 'RACCOON_DOG',
  KOALA = 'KOALA',
  TIGER = 'TIGER',
  SHEEP = 'SHEEP',
  WOLF = 'WOLF',
}

export interface UserProfile {
  // STEP 1: 基本情報
  name: string;
  email: string;
  birthDate: string; // YYYY-MM-DD
  gender: 'male' | 'female' | 'other';

  // STEP 2: 環境・理想
  familySize: number;
  idealIncome: number; // 万円

  // STEP 3: スキル・経験
  skills: string;
  hobbies: string;
  history: string;
  remarks: string; // 備考欄
}

export interface FortuneResult {
  animalType: AnimalType;
  animalName: string; // "ペガサス"
  catchphrase: string; // "自由な表現者"
  coreAssets: {
    talent: string;
    hiddenSkill: string;
    winningPattern: string;
  };
  economicForecast: {
    potentialIncome: string; // "月収 100万円"
    roadmapSteps: {
      step: number;
      title: string;
      description: string;
    }[];
  };
  dailyAdvice: string;
  luckyElements: {
    color: string;
    colorCode: string;
    direction: string;
    item: string;
  };
  story: string; // Immersive narrative
}
