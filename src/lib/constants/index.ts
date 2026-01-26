import { AnimalType } from '../types';

export const ANIMALS: Record<AnimalType, {
    name: string;
    catchphrase: string;
    description: string;
    colors: { primary: string; secondary: string };
    strategy: string;
}> = {
    [AnimalType.PEGASUS]: {
        name: 'ペガサス',
        catchphrase: '自由な表現者',
        description: '束縛を嫌い、感性のままに生きる天才肌。直感に従うことで最大の成果を生む。',
        colors: { primary: '#FFB7B2', secondary: '#FFF4E0' }, // Pastel Pink / Light Gold
        strategy: '数秘術「5」の冒険心で、常識外の表現ビジネスを構築。',
    },
    [AnimalType.LION]: {
        name: 'ライオン',
        catchphrase: '完璧を求めるプロ',
        description: '百獣の王のような威厳と、完璧主義な一面を持つ。人々を統率するリーダー。',
        colors: { primary: '#FFD700', secondary: '#DAA520' }, // Gold / Goldenrod
        strategy: '特別感を演出するブランディングで、高単価サービスを展開。',
    },
    [AnimalType.CHEETAH]: {
        name: 'チーター',
        catchphrase: '超速のゼロイチ達成者',
        description: '誰よりも早くスタートダッシュを切ることができる行動派。',
        colors: { primary: '#FFDAB9', secondary: '#FF8C00' }, // Peach / Dark Orange
        strategy: 'スピード感を活かし、トレンドをいち早く取り入れたビジネスを展開。',
    },
    [AnimalType.DEER]: {
        name: 'こじか',
        catchphrase: '共感を生むコミュニケーター',
        description: '愛らしさと純粋さを持ち、周囲から愛される存在。安心感を与える。',
        colors: { primary: '#FFC0CB', secondary: '#FF69B4' }, // Pink / Hot Pink
        strategy: '共感力を活かしたコミュニティ運営や、信頼性の高いサポート業。',
    },
    [AnimalType.ELEPHANT]: {
        name: 'ゾウ',
        catchphrase: '不言実行の努力家',
        description: '一度決めたことは最後までやり遂げる精神力を持つ。',
        colors: { primary: '#B0C4DE', secondary: '#4682B4' }, // Light Steel Blue / Steel Blue
        strategy: '専門性を極め、長期的な信頼を築くコンサルティング。',
    },
    [AnimalType.MONKEY]: {
        name: '猿',
        catchphrase: '好奇心旺盛な戦略家',
        description: '器用で飲み込みが早く、どんなこともゲーム感覚で楽しめる。',
        colors: { primary: '#FFA07A', secondary: '#FF4500' }, // Light Salmon / Orange Red
        strategy: '遊び心を加えた企画や、効率的な仕組み化によるビジネス構築。',
    },
    [AnimalType.BLACK_PANTHER]: {
        name: '黒ひょう',
        catchphrase: 'センス溢れる先駆者',
        description: '美意識が高く、常にスマートで新しいものを追い求める。',
        colors: { primary: '#E6E6FA', secondary: '#9370DB' }, // Lavender / Medium Purple
        strategy: '洗練されたデザインや、最先端のライフスタイル提案。',
    },
    [AnimalType.RACCOON_DOG]: {
        name: 'たぬき',
        catchphrase: '経験を活かす調整役',
        description: 'どんな環境にも馴染む柔軟性と、古き良きものを大切にする心を持つ。',
        colors: { primary: '#F5DEB3', secondary: '#D2691E' }, // Wheat / Chocolate
        strategy: '過去の経験や人脈を活かしたマッチングビジネスや再生事業。',
    },
    [AnimalType.KOALA]: {
        name: '子守熊',
        catchphrase: '長期視点のリアリスト',
        description: '一見おっとりしているが、実は計算高く将来を見据えている。',
        colors: { primary: '#ADD8E6', secondary: '#00BFFF' }, // Light Blue / Deep Sky Blue
        strategy: 'リスクを回避しつつ、着実に資産を増やす投資やストック型ビジネス。',
    },
    [AnimalType.TIGER]: {
        name: '虎',
        catchphrase: '責任感の強いリーダー',
        description: 'バランス感覚に優れ、全体を見渡して組織をまとめる力がある。',
        colors: { primary: '#F0E68C', secondary: '#BDB76B' }, // Khaki / Dark Khaki
        strategy: '組織構築やマネジメント、信頼に基づく高単価契約の獲得。',
    },
    [AnimalType.SHEEP]: {
        name: 'ひつじ',
        catchphrase: '情報の宝庫・相談役',
        description: '客観的で冷静、人脈も広く情報通。和を尊ぶ。',
        colors: { primary: '#E0FFFF', secondary: '#00CED1' }, // Light Cyan / Dark Turquoise
        strategy: '豊富な情報とネットワークを活かした仲介業や情報提供サービス。',
    },
    [AnimalType.WOLF]: {
        name: '狼',
        catchphrase: '唯一無二の独創者',
        description: '群れることを嫌い、自分だけのスタイルを貫く個性派。',
        colors: { primary: '#D3D3D3', secondary: '#696969' }, // Light Gray / Dim Gray
        strategy: '独創的な世界観を打ち出し、熱狂的なファンを作るクリエイティブ事業。',
    },
};
