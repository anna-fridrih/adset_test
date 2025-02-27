import  selectByProbability  from '../../src/utils/probability';

describe('selectByProbability', () => {
  it('should select node based on probability distribution', () => {
    const mockNodes = [
      { id: 'Node1', probability: 0.8 },
      { id: 'Node2', probability: 0.2 },
    ];

    const selectedNode = selectByProbability(mockNodes);
    expect(mockNodes).toContainEqual(selectedNode);
    expect(['Node1', 'Node2']).toContain(selectedNode.id);
  });
});
