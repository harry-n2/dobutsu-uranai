import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
                    {
                        'bg-gradient-to-r from-pink-400 to-yellow-400 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5': variant === 'primary',
                        'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50': variant === 'secondary',
                        'border-2 border-pink-400 text-pink-500 hover:bg-pink-50': variant === 'outline',
                        'h-9 px-4 text-sm': size === 'sm',
                        'h-12 px-8 text-lg': size === 'md',
                        'h-14 px-10 text-xl': size === 'lg',
                    },
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';
