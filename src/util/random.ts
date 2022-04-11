function generateRandomNum(min: number, max: number): number {
    const range = max - min
    return (Math.random() * range) + min;
}

export { generateRandomNum };