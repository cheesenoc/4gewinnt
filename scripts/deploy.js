import * as ftp from 'basic-ftp';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function deploy() {
    const client = new ftp.Client();
    client.ftp.verbose = true;

    const config = {
        host: process.env.FTP_HOST,
        user: process.env.FTP_USER,
        password: process.env.FTP_PASSWORD,
        secure: process.env.FTP_SECURE === 'true' || !!process.env.FTP_TLS_MIN_VERSION, // Enable secure if TLS version is specified
        port: process.env.FTP_PORT ? parseInt(process.env.FTP_PORT) : 21,
        secureOptions: process.env.FTP_TLS_MIN_VERSION ? { minVersion: process.env.FTP_TLS_MIN_VERSION } : undefined,
    };

    const localDir = path.join(__dirname, '../dist');
    const remoteDir = process.env.FTP_REMOTE_DIR || '/';

    console.log('Starting deployment...');
    console.log(`Local  : ${localDir}`);
    console.log(`Remote : ${remoteDir}`);
    console.log(`Host   : ${config.host}`);

    if (!config.host || !config.user || !config.password) {
        console.error('Error: Missing FTP credentials in .env file');
        process.exit(1);
    }

    try {
        await client.access(config);
        console.log('FTP Connected');

        await client.ensureDir(remoteDir);
        await client.clearWorkingDir(); // Careful: Clears remote dir!
        console.log('Uploading files...');
        await client.uploadFromDir(localDir, remoteDir);

        console.log('Deployment successful!');
    } catch (err) {
        console.error('Deployment failed:', err);
        process.exit(1);
    } finally {
        client.close();
    }
}

deploy();
