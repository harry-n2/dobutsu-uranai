'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { motion } from 'framer-motion';
import { Home, RotateCcw } from 'lucide-react';

export default function Step3Skills() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        skills: '',
        history: '',
        worries: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onNext = () => {
        const current = JSON.parse(localStorage.getItem('fortune_profile') || '{}');

        // Save final data
        localStorage.setItem('fortune_profile', JSON.stringify({
            ...current,
            ...formData,
            skills: formData.skills.split(/,|\s+/).filter(Boolean), // Split by comma or space
        }));

        // Go to Result
        router.push('/diagnosis/result');
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
        >
            <Card>
                <div className="text-center mb-8">
                    <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-bold tracking-wider">FINAL STEP</span>
                    <h1 className="text-2xl font-bold mt-4 text-gray-800">秘めた才能と悩み</h1>
                    <p className="text-gray-500 text-sm mt-2">「卜」の要素を取り入れ、<br />現状を打破する鍵を探します。</p>
                </div>

                <div className="space-y-6">
                    <Input
                        label="特技・好きなこと (複数可)"
                        name="skills"
                        placeholder="例: 料理, 英語, 人の話を聞く"
                        value={formData.skills}
                        onChange={handleChange}
                    />
                    <p className="text-xs text-gray-400 -mt-4 ml-1">※あなたの「隠れ資産」の源泉になります</p>

                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                            今の最大の悩み
                        </label>
                        <textarea
                            name="worries"
                            className="flex w-full rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 resize-none h-24"
                            placeholder="例: 自分の時間が取れない、将来のお金が不安..."
                            value={formData.worries}
                            onChange={handleChange}
                        />
                    </div>

                    <Button onClick={onNext} className="w-full mt-4 bg-gradient-to-r from-purple-400 to-pink-400" size="lg">
                        鑑定する
                    </Button>
                </div>
            </Card>

            {/* Navigation Buttons */}
            <div className="mt-6 flex justify-center gap-4">
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
        </motion.div>
    );
}
