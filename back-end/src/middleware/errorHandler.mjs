import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
const __appdir = path.resolve(__dirname, '..')


export default async ( err, req, res, next ) => {

    const logsDir = path.join( __appdir,'logs')
    const filePath = path.join( __appdir, 'logs', 'error.log' );

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'Internal Server Error';
    err.success = false;

    res.status(err.statusCode).json({
        success: err.success,
        status: err.status,
        statusCode: err.statusCode,
        message: err.message,
    });

    const message = `
    Method: ${req.method} 
    Url: ${req.originalUrl} 
    Date: ${new Date().toLocaleDateString('sv-SE')} 
    Time: ${new Date().toLocaleTimeString('sv-SE')} 
    Success: ${err.success}  
    Message: ${err.message}\n
    `;

    try {

        await fs.mkdir(logsDir, { recursive: true })
        await fs.appendFile(filePath, message);
        
    } catch (error) {

        console.error('Failed to write error log:', error);
        
    }

}