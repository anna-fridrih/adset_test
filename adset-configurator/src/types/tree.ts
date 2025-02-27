
export default interface TreeNode {
  id: string;
  conditions?: {
    geo?: string[];
  };
  deviceConditions?: { [device: string]: boolean };
  probability: number;
  children?: TreeNode[];
  module?: { type: string; name: string };
}
