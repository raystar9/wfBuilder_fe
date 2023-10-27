import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import serverConfig from '@/config'

export default function(req: NextApiRequest, res: NextApiResponse) {
    switch(req.method) {
        case "POST" :
            axios.post(`http://${serverConfig.publicAddr}:${serverConfig.backendPort}/rest/accounts`, req.body)
            res.status(200).send("");
            break;
    }
}