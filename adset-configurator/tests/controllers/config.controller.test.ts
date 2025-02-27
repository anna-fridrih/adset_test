import app from '../../src/app';
import AdsetService from "../../src/services/adset.service";
// @ts-ignore
import request from "supertest";
describe('ConfigController', () => {
  it('should return a valid Ad Set when valid geo and device parameters are provided', async () => {
    const response = await request(app).get('/config?geo=RU&device=mobile');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('adset_id');
    expect(response.body.modules).toEqual(expect.arrayContaining([
      expect.objectContaining({ type: expect.any(String), name: expect.any(String) })
    ]));
  });

  it('should return 400 if geo parameter is missing', async () => {
  const response = await request(app).get('/config');
  expect(response.status).toBe(400);
  expect(response.body).toHaveProperty('error', 'Geo parameter is required');
  });

  it('should return 500 if an error occurs', async () => {
    // Можешь создать моки для имитации ошибок в сервисах, например, загрузки дерева
    jest.spyOn(AdsetService, 'generateAdset').mockRejectedValue(new Error('Internal server error'));

    const response = await request(app).get('/config?geo=RU&device=mobile');
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Internal server error');
  });
});
