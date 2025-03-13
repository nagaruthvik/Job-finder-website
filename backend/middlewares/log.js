import fs from "fs";
import path from "path";

export function log(req, res, next) {
    const date = new Date();
    const logfile = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.log`;
    const logDir = path.join(process.cwd(), "logs");

    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }

    const logPath = path.join(logDir, logfile);
    const logData = `${req.method} ${req.url} ${req.ip}\n`;

    fs.appendFile(logPath, logData, (err) => {
        if (err) throw err;
    });

    next();
}

export function errorlog(err, req, res, next) {
    const date = new Date();
    const logfile = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-error.log`;
    const errorLog = `[${date.toISOString()}] ${err.stack || err.message}\n`;

    const logDir = path.join(process.cwd(), "logs");
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }

    const logPath = path.join(logDir, logfile);
    fs.appendFile(logPath, errorLog, (writeErr) => {
        if (writeErr) console.error("Error writing to error log", writeErr);
    });

    res.status(err.status || 500).json({
        error: {
            message: err.message || "Internal Server Error",
            status: err.status || 500
        }
    });
}