'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Sparkles, Star, Heart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 overflow-hidden relative">

            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <motion.div
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute -top-20 -right-20 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-50"
                />
                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 15, repeat: Infinity }}
                    className="absolute top-40 -left-20 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50"
                />
            </div>

            <div className="max-w-4xl w-full z-10 flex flex-col items-center">

                {/* Header / Logo Area */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center justify-center gap-2 mb-4 bg-white/60 backdrop-blur px-4 py-1 rounded-full text-pink-600 font-medium text-sm shadow-sm border border-pink-100">
                        <Sparkles size={16} />
                        <span>2026年最新 没入型鑑定</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-500 mb-4 tracking-tight" style={{ lineHeight: 1.2 }}>
                        どうぶつ<span className="text-pink-400">幸福</span>占い
                    </h1>
                    <p className="text-gray-600 text-lg md:text-xl font-medium">
                        あなたの「隠れ資産」を眠らせていませんか？
                    </p>
                </motion.div>

                {/* Hero Visual Area - Placeholder for Animal Illustration */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative w-64 h-64 md:w-80 md:h-80 mb-12 flex items-center justify-center"
                >
                    {/* Circular Frame */}
                    <div className="absolute inset-0 border-4 border-white/50 rounded-full animate-pulse shadow-xl bg-gradient-to-br from-white/40 to-transparent backdrop-blur-sm" />

                    {/* Placeholder for Yuru-Chara */}
                    <div className="text-6xl animate-bounce">
                        🦁🐰🐯
                    </div>
                    <p className="absolute bottom-10 bg-white/80 px-4 py-1 rounded-full text-sm font-bold text-gray-500 shadow-sm">
                        全12タイプ
                    </p>
                </motion.div>

                {/* Main CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="w-full max-w-md text-center"
                >
                    <Link href="/diagnosis/step1-basic">
                        <Button size="lg" className="w-full text-xl shadow-pink-200/50 shadow-xl group">
                            今すぐ無料で鑑定する
                            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                    <p className="mt-4 text-sm text-gray-400">
                        ※鑑定は3分で完了します
                    </p>
                </motion.div>

                {/* Features / Authority */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full">
                    <FeatureCard
                        icon={<Star className="text-yellow-400" />}
                        title="命・卜・相の統合"
                        desc="西洋占星術から風水まで、12の占術を統合した精密アルゴリズム。"
                    />
                    <FeatureCard
                        icon={<Heart className="text-pink-400" />}
                        title="本来の自分へ"
                        desc="「ママ」や「妻」の役割を脱ぎ捨て、一人の女性としての輝きを発見。"
                    />
                    <FeatureCard
                        icon={<Sparkles className="text-blue-400" />}
                        title="金運と自立"
                        desc="あなたのスキルがいくらの価値になる？具体的な「理想月収」への道筋。"
                    />
                </div>

            </div>
        </main>
    );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <Card className="text-center hover:bg-white/90 transition-colors">
            <div className="bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                {icon}
            </div>
            <h3 className="font-bold text-gray-700 mb-2">{title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
        </Card>
    );
}
