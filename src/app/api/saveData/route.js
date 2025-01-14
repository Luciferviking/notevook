// pages/api/saveData.js
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    const filePath = path.join(process.cwd(), "data/mockData.json");
    const { id, newParagraph } = req.body;

    if (!id || !newParagraph) {
      return res.status(400).json({ message: "Invalid data provided" });
    }

    // Read the current data
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // Find and update the item by ID
    const itemIndex = data.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found" });
    }

    data[itemIndex].paragraph = newParagraph;

    // Save the updated data
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    res.status(200).json({ message: "Data saved successfully" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
