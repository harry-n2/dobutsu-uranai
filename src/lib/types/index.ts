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
  name: string;
  birthDate: string; // YYYY-MM-DD
  gender: 'male' | 'female' | 'other';
  familySize: number;
  region: string;
  currentIncome: number; // in Yen
  idealIncome: number;
  skills: string[];
  history: string;
  worries: string;
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
