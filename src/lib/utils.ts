import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomElement(arr: any[]) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return null; // Return null if the input is not an array or is empty
  }
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

function getRandomElements(arr1: any[], arr2: any[], arr3: any[]) {
  const pickRandom = (arr: any[]) => {
    if (!Array.isArray(arr) || arr.length === 0) {
      return null; // Return null if the input is not an array or is empty
    }
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  };

  return [pickRandom(arr1), pickRandom(arr2), pickRandom(arr3)];
}
