export function getRandomValueFromArray(arr: any[]) {
  // Ensure the array is not empty
  if (arr.length === 0) {
    throw new Error("Array is empty");
  }

  // Get a random index
  const randomIndex = Math.floor(Math.random() * arr.length);

  // Return the element at the random index
  return arr[randomIndex];
}
