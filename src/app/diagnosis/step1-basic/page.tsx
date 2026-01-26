'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { motion } from 'framer-motion';
import { Home, RotateCcw } from 'lucide-react';

export default function Step1Basic() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        birthDate: '',
        gender: 'female',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onNext = () => {
        if (!formData.name || !formData.email || !formData.birthDate) {
            return alert('必須項目を入力してください');
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            return alert('有効なメールアドレスを入力してください');
        }

        const current = JSON.parse(localStorage.getItem('fortune_profile') || '{}');
        localStorage.setItem('fortune_profile', JSON.stringify({ ...current, ...formData }));

        router.push('/diagnosis/step2-lifestyle');
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
        >
            <Card>
                <div className="text-center mb-8">
                    <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs font-bold tracking-wider">STEP 1 / 3</span>
                    <h1 className="text-2xl font-bold mt-4 text-gray-800">あなたについて教えてください</h1>
                    <p className="text-gray-500 text-sm mt-2">まずは基本情報を入力して、<br />本来の「命」の運勢を算出します。</p>
                </div>

                <div className="space-y-6">
                    <Input
                        label="お名前（ニックネーム可）"
                        name="name"
                        placeholder="例: 山田 花子"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        label="メールアドレス"
                        type="email"
                        name="email"
                        placeholder="例: example@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        label="生年月日"
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        required
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">性別</label>
                        <div className="flex gap-4">
                            {['female', 'male', 'other'].map((g) => (
                                <button
                                    key={g}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, gender: g })}
                                    className={`flex-1 py-3 rounded-xl border ${formData.gender === g
                                        ? 'bg-pink-50 border-pink-400 text-pink-600 font-bold'
                                        : 'bg-white border-gray-200 text-gray-400'
                                        } transition-all`}
                                >
                                    {g === 'female' ? '女性' : g === 'male' ? '男性' : 'その他'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Button onClick={onNext} className="w-full mt-4" size="lg">
                        次へ進む
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
                        setFormData({ name: '', email: '', birthDate: '', gender: 'female' });
                    }}
                >
                    <RotateCcw size={16} className="mr-1" />
                    リセット
                </Button>
            </div>

            <div className="mt-4 text-center text-xs text-gray-400 animate-pulse">
                ★ 入力された情報は鑑定のみに使用されます
            </div>
        </motion.div>
    );
}
