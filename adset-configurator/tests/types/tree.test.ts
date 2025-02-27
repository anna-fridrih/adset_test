import  TreeNode  from '../../src/types/tree';
import selectByProbability  from '../../src/utils/probability';

describe('Tree structure and selection logic', () => {
  it('should select correct module based on probability', () => {
    const mockNodes: TreeNode[] = [
      { id: 'Node1', probability: 0.8 },
      { id: 'Node2', probability: 0.2 }
    ];

    const selectedNode = selectByProbability(mockNodes);
    expect(mockNodes).toContainEqual(selectedNode);
    expect(['Node1', 'Node2']).toContain(selectedNode.id);
  });
});
