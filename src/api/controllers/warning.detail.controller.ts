import { Request, Response, NextFunction } from 'express';
import { Downloader } from '../../floods/Downloader';
import { FloodWarningParser } from '../../parser/floodWarning';

export async function warningDetailController(req: Request, res: Response, next: NextFunction) {
    const downloader = new Downloader();
    const xmlId = req.params.id;

    const warning = await downloader.download(xmlId);
    const warningParser = new FloodWarningParser(warning);
    const text = await downloader.downloadText(xmlId) || "";

    const warningData = await warningParser.getWarning();

    // Send successful response
    res.status(200).json({ ...warningData, text });
}