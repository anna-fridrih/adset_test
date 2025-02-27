// import type { TreeNode } from '../services/adset.service.js'; // Правильный импорт
import type  TreeNode  from '../types/tree.js';
const selectByProbability = <T extends TreeNode>(options: T[]): T => {
  const validOptions = options.filter(o => o.probability > 0);
  if (validOptions.length === 0) {
    throw new Error("No valid options available");
  }
  // Проверка на пустой список
  if (options.length === 0) {
    throw new Error('No options provided');
  }
  // Расчет общей вероятности
  const total = validOptions.reduce((sum, opt) => sum + opt.probability, 0);

  // Нормализация
  const normalized = validOptions.map(opt => ({
    ...opt,
    probability: opt.probability / total
  }));

  // Выбор опции
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