import AdsetService from '../services/adset.service.js';
export const getConfig = async (req, res) => {
    try {
        const { geo, device = 'mobile' } = req.query;
        // Проверка на наличие параметра geo
        if (!geo) {
            return res.status(400).json({ error: 'Geo parameter is required' });
        }
        const adset = await AdsetService.generateAdset(geo.toString(), device.toString());
        return res.json(adset);
    }
    catch (error) {
        return res.status(500).json({
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
