import { buildApp } from './app.js';

//Config
import { PORT } from './config.js';

const startServer = async () => {
    const app = buildApp();

    try {

        await app.listen({ port: PORT, host: '0.0.0.0' });

    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

startServer();
