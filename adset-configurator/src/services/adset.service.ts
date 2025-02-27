import { readFile } from 'node:fs/promises';
import selectByProbability from '../utils/probability.js';
import TreeNode from '../types/tree.js';
import path from 'path';
import { fileURLToPath } from 'url';

export default class AdsetService {
  private static tree: TreeNode | null = null;

  // Метод для инициализации данных из файла
  static async initialize(): Promise<void> {
    try {
      // Используем import.meta.url для получения текущего пути в модулях ESM
      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const filePath = path.join(__dirname, '../../data/tree.json');
      const data = await readFile(filePath, 'utf-8');
      this.tree = JSON.parse(data);
    } catch (error) {
      throw new Error(`Failed to initialize: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Метод для генерации AdSet для заданной географической локации и устройства
  static async generateAdset(
    geo: string,
    device: string
  ): Promise<{
    adset_id: string;
    modules: Array<{ type: string; name: string }>
  }> {
    if (!this.tree) await this.initialize();

    const location = this.tree?.children?.find(n =>
      n.conditions?.geo?.includes(geo)
    );

    if (!location) throw new Error('Location not found');

    const isDeviceValid = location.deviceConditions?.[device];
    if (!isDeviceValid) throw new Error(`Device ${device} not supported`);

    const modules = this.selectModule(location).modules;

    // Используем id локации для генерации adset_id
    const adset_id = `${geo}-${device}-${Date.now()}`;
    return {
      adset_id,  // Теперь адсет будет соответствовать id локации
      modules
    };
  }

  // Рекурсивная функция для выбора модуля из дерева
  private static selectModule(node: TreeNode): { modules: Array<{ type: string; name: string }> } {
    // Если у узла нет дочерних элементов, возвращаем модуль
    if (!node.children || node.children.length === 0) {
      return { modules: node.module ? [node.module] : [] };  // Если есть модуль, возвращаем его, если нет - пустой массив
    }

    const selected = selectByProbability(node.children);  // Выбираем узел на основе вероятности
    return this.selectModule(selected);  // Рекурсивный вызов для следующего уровня
  }
}