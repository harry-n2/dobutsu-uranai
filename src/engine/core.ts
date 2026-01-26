import { UserProfile, FortuneResult, AnimalType } from '../lib/types';
import { ANIMALS } from '../lib/constants';
import { calculateAnimalFromBirthDate, calculateVitalityScore } from './life-path';

// Core Fortune Telling Engine
export function calculateFortune(profile: UserProfile): FortuneResult {
    // 1. Life Path (命): Determine Base Animal
    const animalType = calculateAnimalFromBirthDate(profile.birthDate);
    const animalData = ANIMALS[animalType];
    const vitality = calculateVitalityScore(profile.birthDate);

    // 2. Economic Calculation (Potential)
    // Logic: (Ideal - Current) * Factor + Base
    // Heavily influenced by the "Animal Strategy"
    // Note: idealIncome is in 万円 (10,000 yen units)
    const potentialIncome = profile.idealIncome || 50; // Default to 50万円
    const economicSteps = generateEconomicRoadmap(animalType, profile.skills, potentialIncome);

    // 3. Divination (卜) & Story
    // Generate a story based on the transition from "Worry" to "Success"
    const story = generateStory(profile.name, animalData.name, profile.worries);

    // 4. Physiognomy/Feng Shui (相) - Lucky Elements
    const luckyElements = determineLuckyElements(animalType, profile.region);

    return {
        animalType,
        animalName: animalData.name,
        catchphrase: animalData.catchphrase,
        coreAssets: {
            talent: animalData.description,
            hiddenSkill: `${profile.skills[0] || '直感'}を活かした${animalData.name}流のアプローチ`,
            winningPattern: animalData.strategy,
        },
        economicForecast: {
            potentialIncome: `${potentialIncome.toLocaleString()}万円`,
            roadmapSteps: economicSteps,
        },
        dailyAdvice: `今日の${animalData.name}タイプは、${luckyElements.direction}の方角にツキがあります。`,
        luckyElements,
        story,
    };
}

function generateEconomicRoadmap(type: AnimalType, skills: string[], target: number) {
    const steps = [
        {
            step: 1,
            title: '隠れた才能の解放',
            description: 'まずは自分自身を縛っている「思い込み」を捨てましょう。',
        },
        {
            step: 2,
            title: 'スキルと強みの掛け合わせ',
            description: `${skills[0] || 'あなたの経験'}を、${ANIMALS[type].catchphrase}として発信することで価値が生まれます。`,
        },
        {
            step: 3,
            title: '経済的自立の達成',
            description: `月収${target.toLocaleString()}円への道筋は、あなた独自の「${ANIMALS[type].name}スタイル」で確立されます。`,
        },
    ];
    return steps;
}

function generateStory(userName: string, animalName: string, worry: string): string {
    return `"${worry}"... そんな悩みの中にこそ、${userName}さんの本当の強さが眠っています。あなたは本来、${animalName}のように輝く存在です。今こそ、その封印を解く時が来ました。`;
}

function determineLuckyElements(type: AnimalType, region: string) {
    const data = ANIMALS[type];
    return {
        color: 'ゴールド', // Default global theme accent
        colorCode: data.colors.primary,
        direction: '南東', // Feng shui default for wealth
        item: '手帳', // Placeholder
    };
}
