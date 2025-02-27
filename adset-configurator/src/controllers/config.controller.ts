import { Request, Response } from 'express';
import AdsetService from '../services/adset.service.js';

export const getConfig = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { geo, device = 'mobile' } = req.query;  // Добавляем device с дефолтным значением

    // Проверка на наличие параметра geo
    if (!geo) {
      return res.status(400).json({ error: 'Geo parameter is required' });
    }

    // Получение результата из AdsetService
    const adset = await AdsetService.generateAdset(geo.toString(), device.toString());

    // Отправка ответа
    return res.json(adset);  // Здесь мы отправляем ответ и сразу его возвращаем
  } catch (error) {
    // Обработка ошибок
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
