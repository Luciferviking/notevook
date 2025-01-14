// pages/api/getData.js
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "GET") {
    const filePath = path.join(process.cwd(), "data/mockData.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    res.status(200).json(data);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
