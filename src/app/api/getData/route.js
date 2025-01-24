import path from "path";
import * as fs from "fs";
import { NextResponse } from "next/server";


export async function GET(res) {
  try {
    // Resolve the path to the mockData.json file

  const filePath =  "public/data/mockData.json";

    // Read and parse the JSON file
    const fileContent = await fs.promises.readFile(filePath, "utf-8");
    const data = JSON.parse(fileContent);

    // Log for debugging
    // console.log("File content:", data);

    // Return the data as JSON
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading mockData.json:", error);
    return NextResponse.json({ error: "Failed to fetch mock data" });
  }
}
