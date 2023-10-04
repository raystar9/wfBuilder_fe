import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios"
import serverConfig from '@/config'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  req.query["largeCategory"]
  let url = `http://${serverConfig.publicAddr}:${serverConfig.backendPort}/rest/decks?largeCategory=${
    req.query["largeCategory"]??""
  }&mediumCategory=${
    req.query["mediumCategory"]??""
  }&smallCategory=${
    req.query["smallCategory"]??""
  }`;
  const decks = (await axios.get(url)).data
  
  res.status(200).json(decks);
}