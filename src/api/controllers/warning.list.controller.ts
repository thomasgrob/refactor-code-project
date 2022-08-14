import { Request, Response, NextFunction } from 'express';
import { getWarnings } from '../../floods/amoc';
import { getAmocToStateId } from "../utils";

export async function warningListController(req: Request, res: Response, next: NextFunction) {
    const data = await getWarnings();
    const state = getAmocToStateId(req.params.state);

    let results = [];
    for (let key in data) {
        if (key.startsWith(state)) {
            results.push(key.replace(/\.amoc\.xml/, ""));
        }
    }

    // Send successful response
    res.status(200).json(results);
}