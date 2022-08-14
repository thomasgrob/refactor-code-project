import { Request, Response, NextFunction } from 'express';
import { Downloader } from '../../floods/Downloader';
import { FloodWarningParser } from '../../parser/floodWarning';

const warningDetail = async (req: Request, res: Response, next: NextFunction) => {
    const downloader = new Downloader();
    const xmlId = req.params.id;

    const warning = await downloader.download(xmlId);
    const warningParser = new FloodWarningParser(warning);
    const text = await downloader.downloadText(xmlId);

    res.send({ ...(await warningParser.getWarning()), text: text || "" });
};

export default warningDetail;