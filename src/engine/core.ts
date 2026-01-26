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
    const potentialIncome = profile.idealIncome || 50;
    const skillsText = profile.skills || '直感';
    const economicSteps = generateEconomicRoadmap(animalType, skillsText, potentialIncome);

    // 3. Divination (卜) & Story
    const story = generateStory(profile.name, animalData.name, profile.history || profile.remarks || '');

    // 4. Physiognomy/Feng Shui (相) - Lucky Elements
    const luckyElements = determineLuckyElements(animalType);

    return {
        animalType,
        animalName: animalData.name,
        catchphrase: animalData.catchphrase,
        coreAssets: {
            talent: animalData.description,
            hiddenSkill: `${skillsText.split(/[,、]/)[0] || '直感'}を活かした${animalData.name}流のアプローチ`,
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

function generateEconomicRoadmap(type: AnimalType, skills: string, target: number) {
    const firstSkill = skills.split(/[,、\s]/)[0] || 'あなたの経験';
    const steps = [
        {
            step: 1,
            title: '隠れた才能の解放',
            description: 'まずは自分自身を縛っている「思い込み」を捨てましょう。',
        },
        {
            step: 2,
            title: 'スキルと強みの掛け合わせ',
            description: `${firstSkill}を、${ANIMALS[type].catchphrase}として発信することで価値が生まれます。`,
        },
        {
            step: 3,
            title: '経済的自立の達成',
            description: `月収${target.toLocaleString()}万円への道筋は、あなた独自の「${ANIMALS[type].name}スタイル」で確立されます。`,
        },
    ];
    return steps;
}

function generateStory(userName: string, animalName: string, background: string): string {
    if (background) {
        return `"${background.slice(0, 50)}${background.length > 50 ? '...' : ''}"... そんな背景の中にこそ、${userName}さんの本当の強さが眠っています。あなたは本来、${animalName}のように輝く存在です。今こそ、その封印を解く時が来ました。`;
    }
    return `${userName}さん、あなたは本来、${animalName}のように輝く存在です。今こそ、その封印を解く時が来ました。自分を信じて、一歩を踏み出しましょう。`;
}

function determineLuckyElements(type: AnimalType) {
    const data = ANIMALS[type];
    const directions = ['東', '西', '南', '北', '南東', '南西', '北東', '北西'];
    const items = ['手帳', '観葉植物', 'アロマキャンドル', 'パワーストーン', '写真立て', 'お財布'];

    // Deterministic selection based on animal type
    const index = Object.values(AnimalType).indexOf(type);

    return {
        color: 'ゴールド',
        colorCode: data.colors.primary,
        direction: directions[index % directions.length],
        item: items[index % items.length],
    };
}
