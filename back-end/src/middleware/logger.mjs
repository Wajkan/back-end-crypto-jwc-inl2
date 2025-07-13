import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const logsDir = path.join(__dirname, '../logs')

if ( !fs.existsSync ( logsDir ) ) {
  fs.mkdirSync( logsDir, { recursive: true })
}

const logFilePath = path.join( logsDir, 'requests.log' )

export const logger = (req, res, next) => {

   const startTime = Date.now()
   const originalResJson = res.json;
 
res.json = function ( data ) {

    const endTime = Date.now()
    const duration = endTime - startTime;
    
    const logMessage = `
        Method: ${req.method}
        Url: ${req.originalUrl}
        Date: ${new Date().toLocaleDateString('sv-SE')}
        Time: ${new Date().toLocaleTimeString('sv-SE')}
        Status: ${res.statusCode}
        Duration: ${duration}ms
        Response: ${JSON.stringify(data)}
        `;

    fs.appendFile(logFilePath, logMessage, (err) => {
      if (err) {
        console.error("Could not write to log file:", err);
      }
    })
    
    return originalResJson.call(this, data);

  }
  
  next()

};