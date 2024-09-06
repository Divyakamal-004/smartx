function generateCode(): { code: string, timestamp: number } {
    const min = 1000;
    const max = 9999;
    const code = Math.floor(Math.random() * (max - min + 1)) + min;
    const timestamp = Date.now();
    return { code: code.toString(), timestamp };
}

export default generateCode;