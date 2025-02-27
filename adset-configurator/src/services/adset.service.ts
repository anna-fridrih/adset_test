import { readFile } from 'node:fs/promises';
import selectByProbability from '../utils/probability.js';
import TreeNode from '../types/tree.js';
import path from 'path';
import { fileURLToPath } from 'url';

export default class AdsetService {
  private static tree: TreeNode | null = null;

  static async initialize(): Promise<void> {
    try {
      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const filePath = path.join(__dirname, '../../data/tree.json');
      const data = await readFile(filePath, 'utf-8');
      this.tree = JSON.parse(data);
    } catch (error) {
      throw new Error(`Failed to initialize: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
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

    const adset_id = `${geo}-${device}-${Date.now()}`;
    return {
      adset_id,
      modules
    };
  }

  private static selectModule(node: TreeNode): { modules: Array<{ type: string; name: string }> } {
    if (!node.children || node.children.length === 0) {
      return { modules: node.module ? [node.module] : [] };
    }
    const selected = selectByProbability(node.children);
    return this.selectModule(selected);
  }
}