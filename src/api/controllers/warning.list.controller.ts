import { Request, Response, NextFunction } from 'express';
import { getWarnings } from "../helpers/floods/amoc";
import { getAmocToStateId } from "../utils";

export async function warningListController(req: Request, res: Response, next: NextFunction) {
    try {
        const data = await getWarnings();
        const state = getAmocToStateId(req.params.state);

        const results = [];
        for (const key in data) {
            if (key.indexOf(state) > -1) {
                results.push(key.replace(/\.amoc\.xml/, ""));
            }
        }

        // Send successful response
        return res.status(200).json(results);
    } catch (err) {
        console.error(err);
        // Send to our error handler middleware
        next(err);
    }
}