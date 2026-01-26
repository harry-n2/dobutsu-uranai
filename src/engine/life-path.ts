import { AnimalType } from '../lib/types';

// Simplified Logic for MVP:
// In a real full star version, this would use the 60 sexagenary cycle (Gan-Zhi) calculation.
// Here we use a modulo operation on the birth timestamp to deterministically assign an animal.

export function calculateAnimalFromBirthDate(birthDateStr: string): AnimalType {
    const birthDate = new Date(birthDateStr);
    const time = birthDate.getTime();

    // Total 12 animals
    const animalValues = Object.values(AnimalType);

    // Simple deterministic hash based on date
    // (Day of year + Year) % 12
    // Note: This is a placeholder for the complex Four Pillars logic.

    const day = birthDate.getDate();
    const month = birthDate.getMonth() + 1;
    const year = birthDate.getFullYear();

    // A simple way to get variation
    const index = (year + month + day) % 12;

    return animalValues[index];
}

export function calculateVitalityScore(birthDateStr: string): number {
    // Returns a score 1-100 based on "season" (born in season of strength?)
    // Placeholder: random-ish deterministic score
    const date = new Date(birthDateStr);
    return 70 + (date.getDate() % 30);
}
