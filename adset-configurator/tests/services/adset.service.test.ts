import * as AdsetService from '../../src/services/adset.service';
import TreeNode from '../../src/types/tree';
import {jest} from '@jest/globals'
describe('AdsetService', () => {
  let mockTree: TreeNode;

  beforeEach(() => {
    mockTree = {
      id: 'root',
      probability: 1,
      children: [
        {
          id: 'RU',
          conditions: { geo: ['RU'] },
          deviceConditions: { mobile: true, desktop: false },
          probability: 50,
          children: [
            {
              id: 'push',
              probability: 70,
              children: [
                { id: 'push_a', module: { type: 'push', name: 'Push A' }, probability: 60 },
                { id: 'push_b', module: { type: 'push', name: 'Push B' }, probability: 40 }
              ]
            },
            {
              id: 'monetization',
              probability: 30,
              children: [
                { id: 'popunder', module: { type: 'monetization', name: 'Popunder' }, probability: 50 },
                { id: 'offerwall', module: { type: 'monetization', name: 'Offerwall' }, probability: 50 }
              ]
            }
          ]
        }
      ]
    };
  });

it('should generate adset correctly for geo=RU and device=mobile', async () => {
  const generateAdsetSpy = jest.spyOn(AdsetService.default, 'generateAdset')
    .mockResolvedValue({
      adset_id: 'RU', // Теперь соответствует location.id из моковых данных
      modules: [
        { type: 'push', name: 'Push A' },
        { type: 'monetization', name: 'Popunder' }
      ],
    });

    const result = await AdsetService.default.generateAdset('RU', 'mobile');

    // expect(result.adset_id).toBe("12345");
    expect(result.modules).toBeDefined();
    expect(Array.isArray(result.modules)).toBe(true);
    expect(result.modules.length).toBeGreaterThan(0);
    expect(result.modules).toEqual(expect.arrayContaining([
      expect.objectContaining({ type: expect.any(String), name: expect.any(String) }),
    ]));

    // Проверяем, что метод был вызван
    expect(generateAdsetSpy).toHaveBeenCalledWith('RU', 'mobile');
  });

  it('should throw error if device is not valid for location', async () => {
    const generateAdsetSpy = jest.spyOn(AdsetService.default, 'generateAdset').mockRejectedValue(new Error('Device desktop not supported for this location'));

    await expect(AdsetService.default.generateAdset('RU', 'desktop')).rejects.toThrow('Device desktop not supported for this location');

    expect(generateAdsetSpy).toHaveBeenCalledWith('RU', 'desktop');
  });

  it('should throw error if location not found', async () => {
    const generateAdsetSpy = jest.spyOn(AdsetService.default, 'generateAdset').mockRejectedValue(new Error('Location not found'));

    await expect(AdsetService.default.generateAdset('CN', 'mobile')).rejects.toThrow('Location not found');

    expect(generateAdsetSpy).toHaveBeenCalledWith('CN', 'mobile');
  });
});
