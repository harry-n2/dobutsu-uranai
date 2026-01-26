'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { calculateFortune } from '@/engine/core';
import { FortuneResult, UserProfile, AnimalType } from '@/lib/types';
import Link from 'next/link';
/* eslint-disable @next/next/no-img-element */
import { Home, RotateCcw, Lock, Shield, User, Mail, Calendar, Users, Briefcase } from 'lucide-react';

const ANIMAL_EMOJIS: Record<AnimalType, string> = {
    [AnimalType.PEGASUS]: '🦄',
    [AnimalType.LION]: '🦁',
    [AnimalType.CHEETAH]: '🐆',
    [AnimalType.DEER]: '🦌',
    [AnimalType.ELEPHANT]: '🐘',
    [AnimalType.MONKEY]: '🐵',
    [AnimalType.BLACK_PANTHER]: '🐈‍⬛',
    [AnimalType.RACCOON_DOG]: '🦝',
    [AnimalType.KOALA]: '🐨',
    [AnimalType.TIGER]: '🐯',
    [AnimalType.SHEEP]: '🐑',
    [AnimalType.WOLF]: '🐺',
};

function ResultContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [result, setResult] = useState<FortuneResult | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Check admin mode from URL param OR localStorage
        const urlAdmin = searchParams.get('admin') === '1';
        const storageAdmin = localStorage.getItem('admin_mode') === '1';
        setIsAdmin(urlAdmin || storageAdmin);

        const timer = setTimeout(() => {
            const dataStr = localStorage.getItem('fortune_profile');
            if (dataStr) {
                const profileData = JSON.parse(dataStr) as UserProfile;
                setProfile(profileData);
                const res = calculateFortune(profileData);
                setResult(res);
            }
            setLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, [searchParams]);

    if (loading) {
        return (
            <div className="fixed inset-0 bg-white/90 backdrop-blur-xl flex flex-col items-center justify-center z-50">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="text-6xl mb-8"
                >
                    🔮
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-700 mb-2">鑑定中...</h2>
                <p className="text-gray-500">あなたの隠れ資産を計算しています</p>
            </div>
        );
    }

    if (!result) return <div>Data Error. Please retry.</div>;

    return (
        <div className="pb-20">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="mb-8 text-center"
            >
                <div className="inline-block bg-white/50 backdrop-blur-sm px-6 py-2 rounded-full mb-6 border border-white">
                    <span className="text-gray-500 text-sm font-bold tracking-widest">あなたの本質は...</span>
                </div>

                <div className="relative w-64 h-64 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-tr from-pink-200 to-yellow-200 rounded-full animate-pulse blur-xl opacity-70" />
                    <div className="relative bg-white rounded-full w-full h-full flex items-center justify-center shadow-2xl border-4 border-white text-8xl">
                        {ANIMAL_EMOJIS[result.animalType]}
                    </div>
                </div>

                <h1 className="text-4xl font-bold text-gray-800 mb-2">{result.animalName}</h1>
                <p className="text-xl text-pink-500 font-bold">{result.catchphrase}</p>
            </motion.div>

            <div className="space-y-6">
                <Card className="bg-gradient-to-br from-white to-pink-50 border-pink-100">
                    <h3 className="font-bold text-gray-700 mb-3 flex items-center">
                        <span className="w-1 h-6 bg-pink-400 mr-2 rounded-full" />
                        あなたへのメッセージ
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                        {result.story}
                    </p>
                </Card>

                <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white border-none shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500 rounded-full blur-3xl opacity-20" />
                    <h3 className="text-yellow-400 font-bold tracking-wider text-xs mb-1">ECONOMIC POTENTIAL</h3>
                    <p className="text-gray-400 text-xs mb-4">あなたの潜在的な経済価値</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl md:text-5xl font-bold text-white">{result.economicForecast.potentialIncome}</span>
                        <span className="text-sm text-gray-400">/ 月</span>
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-700">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-300">隠れ資産レベル</span>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-8 h-2 bg-yellow-500 rounded-full" />)}
                            </div>
                        </div>
                    </div>
                </Card>

                {isAdmin ? (
                    <>
                    {/* Admin: User Input Information */}
                    <Card className="border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-white">
                        <div className="flex items-center gap-2 mb-4">
                            <User className="text-blue-500" size={20} />
                            <span className="text-xs font-bold text-blue-500 tracking-wider">ユーザー入力情報</span>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-white p-3 rounded-lg border">
                                    <div className="text-gray-400 text-xs flex items-center gap-1">
                                        <User size={12} /> 氏名
                                    </div>
                                    <div className="font-bold text-gray-700">{profile?.name || '-'}</div>
                                </div>
                                <div className="bg-white p-3 rounded-lg border">
                                    <div className="text-gray-400 text-xs flex items-center gap-1">
                                        <Mail size={12} /> メール
                                    </div>
                                    <div className="font-bold text-gray-700 text-xs break-all">{profile?.email || '-'}</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-white p-3 rounded-lg border">
                                    <div className="text-gray-400 text-xs flex items-center gap-1">
                                        <Calendar size={12} /> 生年月日
                                    </div>
                                    <div className="font-bold text-gray-700">{profile?.birthDate || '-'}</div>
                                </div>
                                <div className="bg-white p-3 rounded-lg border">
                                    <div className="text-gray-400 text-xs">性別</div>
                                    <div className="font-bold text-gray-700">
                                        {profile?.gender === 'female' ? '女性' : profile?.gender === 'male' ? '男性' : 'その他'}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-white p-3 rounded-lg border">
                                    <div className="text-gray-400 text-xs flex items-center gap-1">
                                        <Users size={12} /> 家族人数
                                    </div>
                                    <div className="font-bold text-gray-700">{profile?.familySize || '-'}人</div>
                                </div>
                                <div className="bg-white p-3 rounded-lg border">
                                    <div className="text-gray-400 text-xs">理想の月収</div>
                                    <div className="font-bold text-gray-700">{profile?.idealIncome || '-'}万円</div>
                                </div>
                            </div>

                            <div className="bg-white p-3 rounded-lg border">
                                <div className="text-gray-400 text-xs flex items-center gap-1">
                                    <Briefcase size={12} /> スキル・特技
                                </div>
                                <div className="text-gray-700">{profile?.skills || '-'}</div>
                            </div>

                            <div className="bg-white p-3 rounded-lg border">
                                <div className="text-gray-400 text-xs">趣味</div>
                                <div className="text-gray-700">{profile?.hobbies || '-'}</div>
                            </div>

                            <div className="bg-white p-3 rounded-lg border">
                                <div className="text-gray-400 text-xs">略歴・経験</div>
                                <div className="text-gray-700 whitespace-pre-wrap">{profile?.history || '-'}</div>
                            </div>

                            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                                <div className="text-yellow-600 text-xs font-bold">備考欄（その他希望）</div>
                                <div className="text-gray-700 whitespace-pre-wrap">{profile?.remarks || '-'}</div>
                            </div>
                        </div>
                    </Card>

                    {/* Admin: Fortune Details */}
                    <Card className="border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-white">
                        <div className="flex items-center gap-2 mb-4">
                            <Shield className="text-purple-500" size={20} />
                            <span className="text-xs font-bold text-purple-500 tracking-wider">鑑定結果詳細</span>
                        </div>
                        <h3 className="font-bold text-gray-700 mb-4">自立への3ステップ</h3>
                        {result.economicForecast.roadmapSteps.map((step) => (
                            <div key={step.step} className="mb-4 p-3 bg-white rounded-lg border border-gray-100">
                                <div className="font-bold text-gray-800">STEP {step.step}: {step.title}</div>
                                <div className="text-sm text-gray-600 mt-1">{step.description}</div>
                            </div>
                        ))}
                        <div className="mt-6 pt-4 border-t border-purple-100">
                            <h4 className="font-bold text-gray-700 mb-3">ラッキー要素</h4>
                            <div className="grid grid-cols-3 gap-3 text-center text-sm">
                                <div className="bg-white p-3 rounded-lg border">
                                    <div className="text-gray-400 text-xs">カラー</div>
                                    <div className="font-bold text-gray-700">{result.luckyElements.color}</div>
                                </div>
                                <div className="bg-white p-3 rounded-lg border">
                                    <div className="text-gray-400 text-xs">方角</div>
                                    <div className="font-bold text-gray-700">{result.luckyElements.direction}</div>
                                </div>
                                <div className="bg-white p-3 rounded-lg border">
                                    <div className="text-gray-400 text-xs">アイテム</div>
                                    <div className="font-bold text-gray-700">{result.luckyElements.item}</div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 pt-4 border-t border-purple-100">
                            <h4 className="font-bold text-gray-700 mb-3">コア資産</h4>
                            <div className="space-y-2 text-sm">
                                <div className="bg-white p-3 rounded-lg border">
                                    <div className="text-gray-400 text-xs">才能</div>
                                    <div className="text-gray-700">{result.coreAssets.talent}</div>
                                </div>
                                <div className="bg-white p-3 rounded-lg border">
                                    <div className="text-gray-400 text-xs">隠れスキル</div>
                                    <div className="text-gray-700">{result.coreAssets.hiddenSkill}</div>
                                </div>
                                <div className="bg-white p-3 rounded-lg border">
                                    <div className="text-gray-400 text-xs">勝ちパターン</div>
                                    <div className="text-gray-700">{result.coreAssets.winningPattern}</div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 pt-4 border-t border-purple-100">
                            <h4 className="font-bold text-gray-700 mb-2">今日のアドバイス</h4>
                            <p className="text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg">{result.dailyAdvice}</p>
                        </div>
                    </Card>
                    </>
                ) : (
                    <div className="relative">
                        <Card className="opacity-80 blur-[2px] pointer-events-none select-none">
                            <h3 className="font-bold text-gray-700 mb-4">自立への3ステップ</h3>
                            {result.economicForecast.roadmapSteps.map((step) => (
                                <div key={step.step} className="mb-4">
                                    <div className="font-bold text-gray-800">STEP {step.step}: {step.title}</div>
                                    <div className="text-sm text-gray-500">{step.description}</div>
                                </div>
                            ))}
                        </Card>
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/5 rounded-2xl z-10">
                            <Card className="bg-white/95 shadow-2xl max-w-xs text-center p-6 border-2 border-green-400">
                                <Lock className="mx-auto text-green-500 mb-2" />
                                <h3 className="font-bold text-gray-800 mb-2">鑑定書の完全版を受け取る</h3>
                                <p className="text-xs text-gray-500 mb-4">
                                    詳細なロードマップと<br />あなただけの成功戦略をLINEで送付します
                                </p>
                                <div className="mb-4 p-3 bg-white rounded-xl border border-gray-100 shadow-inner">
                                    <img
                                        src="https://harry-n2.github.io/dobutsu-uranai/line-qr.png"
                                        alt="LINE公式アカウント QRコード"
                                        width={160}
                                        height={160}
                                        className="mx-auto"
                                    />
                                </div>
                                <p className="text-xs text-gray-400 mb-3">
                                    QRコードをスキャン or 下のボタンをタップ
                                </p>
                                <a href="https://lin.ee/WdYf2tq" target="_blank" rel="noopener noreferrer">
                                    <Button className="w-full bg-[#06C755] hover:bg-[#05b54c] text-white shadow-green-200 shadow-lg" size="sm">
                                        LINEで友だち追加 (無料)
                                    </Button>
                                </a>
                            </Card>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-center gap-4">
                <Link href="/">
                    <Button variant="secondary" size="sm" className="text-gray-500">
                        <Home size={16} className="mr-1" />
                        スタートに戻る
                    </Button>
                </Link>
                <Button
                    variant="outline"
                    size="sm"
                    className="text-gray-500"
                    onClick={() => {
                        localStorage.removeItem('fortune_profile');
                        router.push('/diagnosis/step1-basic');
                    }}
                >
                    <RotateCcw size={16} className="mr-1" />
                    リセット
                </Button>
            </div>
        </div>
    );
}

export default function ResultPage() {
    return (
        <Suspense fallback={
            <div className="fixed inset-0 bg-white/90 backdrop-blur-xl flex flex-col items-center justify-center z-50">
                <div className="text-6xl mb-8 animate-spin">🔮</div>
                <h2 className="text-2xl font-bold text-gray-700 mb-2">読み込み中...</h2>
            </div>
        }>
            <ResultContent />
        </Suspense>
    );
}
