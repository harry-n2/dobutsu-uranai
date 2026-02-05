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
        birthYear: '',
        birthMonth: '',
        birthDay: '',
        gender: 'female',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onNext = () => {
        if (!formData.name || !formData.email || !formData.birthYear || !formData.birthMonth || !formData.birthDay) {
            return alert('必須項目を入力してください');
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            return alert('有効なメールアドレスを入力してください');
        }
        const y = parseInt(formData.birthYear, 10);
        const m = parseInt(formData.birthMonth, 10);
        const d = parseInt(formData.birthDay, 10);
        if (isNaN(y) || y < 1900 || y > 2026 || isNaN(m) || m < 1 || m > 12 || isNaN(d) || d < 1 || d > 31) {
            return alert('正しい生年月日を入力してください');
        }
        const birthDate = `${formData.birthYear.padStart(4, '0')}-${formData.birthMonth.padStart(2, '0')}-${formData.birthDay.padStart(2, '0')}`;

        const current = JSON.parse(localStorage.getItem('fortune_profile') || '{}');
        localStorage.setItem('fortune_profile', JSON.stringify({ ...current, name: formData.name, email: formData.email, birthDate, gender: formData.gender }));

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

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">生年月日</label>
                        <div className="flex gap-2 items-center">
                            <input
                                type="text"
                                inputMode="numeric"
                                name="birthYear"
                                placeholder="1985"
                                maxLength={4}
                                value={formData.birthYear}
                                onChange={handleChange}
                                className="flex h-12 w-full rounded-xl border border-gray-200 bg-white/80 px-3 py-2 text-base text-center placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 transition-all"
                            />
                            <span className="text-gray-500 text-sm shrink-0">年</span>
                            <input
                                type="text"
                                inputMode="numeric"
                                name="birthMonth"
                                placeholder="03"
                                maxLength={2}
                                value={formData.birthMonth}
                                onChange={handleChange}
                                className="flex h-12 w-20 rounded-xl border border-gray-200 bg-white/80 px-3 py-2 text-base text-center placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 transition-all"
                            />
                            <span className="text-gray-500 text-sm shrink-0">月</span>
                            <input
                                type="text"
                                inputMode="numeric"
                                name="birthDay"
                                placeholder="15"
                                maxLength={2}
                                value={formData.birthDay}
                                onChange={handleChange}
                                className="flex h-12 w-20 rounded-xl border border-gray-200 bg-white/80 px-3 py-2 text-base text-center placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 transition-all"
                            />
                            <span className="text-gray-500 text-sm shrink-0">日</span>
                        </div>
                    </div>

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
                        setFormData({ name: '', email: '', birthYear: '', birthMonth: '', birthDay: '', gender: 'female' });
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
