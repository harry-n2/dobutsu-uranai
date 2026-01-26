'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { motion } from 'framer-motion';
import { Home, RotateCcw } from 'lucide-react';

export default function Step2Lifestyle() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        familySize: '',
        idealIncome: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onNext = () => {
        if (!formData.familySize || !formData.idealIncome) {
            return alert('必須項目を入力してください');
        }

        const current = JSON.parse(localStorage.getItem('fortune_profile') || '{}');
        localStorage.setItem('fortune_profile', JSON.stringify({
            ...current,
            familySize: Number(formData.familySize),
            idealIncome: Number(formData.idealIncome)
        }));
        router.push('/diagnosis/step3-skills');
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
        >
            <Card>
                <div className="text-center mb-8">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold tracking-wider">STEP 2 / 3</span>
                    <h1 className="text-2xl font-bold mt-4 text-gray-800">環境と理想の未来</h1>
                    <p className="text-gray-500 text-sm mt-2">「相」と「金運」を観るため、<br />現在の環境と理想を教えてください。</p>
                </div>

                <div className="space-y-6">
                    <Input
                        label="家族人数（ご自身を含む）"
                        type="number"
                        name="familySize"
                        placeholder="例: 4"
                        min="1"
                        value={formData.familySize}
                        onChange={handleChange}
                        required
                    />

                    <div className="relative">
                        <Input
                            label="理想の月収（万円）"
                            type="number"
                            name="idealIncome"
                            placeholder="あなたの本当の望みは？"
                            className="border-yellow-300 bg-yellow-50/50 pr-16"
                            value={formData.idealIncome}
                            onChange={handleChange}
                            required
                        />
                        <span className="absolute right-4 top-10 text-yellow-500 font-bold">万円</span>
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
