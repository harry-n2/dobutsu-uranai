'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { motion } from 'framer-motion';

export default function Step2Lifestyle() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        familySize: 3,
        region: '',
        currentIncome: '',
        idealIncome: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onNext = () => {
        const current = JSON.parse(localStorage.getItem('fortune_profile') || '{}');
        localStorage.setItem('fortune_profile', JSON.stringify({
            ...current,
            ...formData,
            familySize: Number(formData.familySize),
            currentIncome: Number(formData.currentIncome),
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
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="家族構成 (人数)"
                            type="number"
                            name="familySize"
                            value={formData.familySize}
                            onChange={handleChange}
                        />
                        <Input
                            label="お住まいの地域"
                            name="region"
                            placeholder="例: 東京都"
                            value={formData.region}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="border-t border-dashed border-gray-200 my-4" />

                    <Input
                        label="現在の月収 (万円・任意)"
                        type="number"
                        name="currentIncome"
                        placeholder="おこづかい含む"
                        value={formData.currentIncome}
                        onChange={handleChange}
                    />

                    <div className="relative">
                        <Input
                            label="理想の月収 (万円)"
                            type="number"
                            name="idealIncome"
                            placeholder="あなたの本当の望みは？"
                            className="border-yellow-300 bg-yellow-50/50"
                            value={formData.idealIncome}
                            onChange={handleChange}
                        />
                        <span className="absolute right-4 top-10 text-yellow-500 font-bold">万円</span>
                    </div>

                    <Button onClick={onNext} className="w-full mt-4" size="lg">
                        次へ進む
                    </Button>
                </div>
            </Card>
        </motion.div>
    );
}
