import app from './app.js';
import 'dotenv/config';
import AdsetService from './services/adset.service.js';
const PORT = process.env.PORT || 3000;
async function startServer() {
    try {
        await AdsetService.initialize();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}
startServer();
