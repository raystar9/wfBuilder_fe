import { NextApiRequest, NextApiResponse } from "next";
import { createHash } from "crypto";
import axios from "axios";
import serverConfig from '@/config'

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "GET") {
        const query = req.query;
        console.log(query);
        const hash = createHash("sha256")
        hash.update(req.query.password as string);
        const resultText = (await axios.get(`http://${serverConfig.publicAddr}:${serverConfig.backendPort}/rest/accounts/${req.query.id}?password=${hash.digest("hex")}`, req.body)).data
        console.log(resultText)
        res.status(200).send(resultText);
    } else {
        return res.status(404);
    }
}
export default handler