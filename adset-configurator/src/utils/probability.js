const selectByProbability = (options) => {
    const validOptions = options.filter(o => o.probability > 0);
    if (validOptions.length === 0) {
        throw new Error("No valid options available");
    }
    if (options.length === 0) {
        throw new Error('No options provided');
    }
    const total = validOptions.reduce((sum, opt) => sum + opt.probability, 0);
    const normalized = validOptions.map(opt => ({
        ...opt,
        probability: opt.probability / total
    }));
    let random = Math.random();
    for (const option of normalized) {
        if (random < option.probability) {
            return option;
        }
        random -= option.probability;
    }
    return normalized[normalized.length - 1];
};
export default selectByProbability;
