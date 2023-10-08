import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios"
import serverConfig from '@/config'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      req.query["largeCategory"]
      let url = `http://${serverConfig.publicAddr}:${serverConfig.backendPort}/rest/decks?largeCategory=${req.query["largeCategory"] ?? ""
        }&mediumCategory=${req.query["mediumCategory"] ?? ""
        }&smallCategory=${req.query["smallCategory"] ?? ""
        }&page=${req.query["page"]??""
        }`;
      const decks = (await axios.get(url)).data

      res.status(200).json(decks);
      break;

    case "POST":
      axios.post(`http://${serverConfig.publicAddr}:${serverConfig.backendPort}/rest/decks`, req.body)
      res.status(200).send("");
      break;
  }
}