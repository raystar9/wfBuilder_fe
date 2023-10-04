import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios"

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const characters = (await axios("http://localhost:3000/rest/characters")).data;
  res.status(200).json(characters);
}