import { Request, Response, NextFunction } from "express";
import { Downloader } from "../helpers/floods/Downloader";
import { FloodWarningParser } from "../helpers/parser/floodWarning";

export async function warningDetailController(req: Request, res: Response, next: NextFunction) {
    try {
        const downloader = new Downloader();
        const xmlId = req.params.id;

        const warning = await downloader.download(xmlId);
        const warningParser = new FloodWarningParser(warning);
        const text = await downloader.downloadText(xmlId) || "";

        const warningData = await warningParser.getWarning();

        // Send successful response
        return res.status(200).json({ ...warningData, text });
    } catch (err) {
        console.error(err);
        // Send to our error handler middleware
        next(err);
    }
}