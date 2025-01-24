import fs from "fs";
import path from "path";

export async function POST(req) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const dataPath = "public/data/mockData.json" // Path to your JSON file
  try {
    const body = await req.json(); // Parse incoming JSON body
    if (!body || !body.title) {
      return new Response(JSON.stringify({ error: "Invalid object format. 'title' is required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Read existing data from JSON file
    let jsonArray = [];
    if (fs.existsSync(dataPath)) {
      const fileData = fs.readFileSync(dataPath, "utf8");
      jsonArray = JSON.parse(fileData);
    }

    // Add new object to array
    const newObject = {
      id: jsonArray.length,
      content: "New demo content is created",
      paragraph: "demo paragraph",
      title: body.title,
    };
    jsonArray.push(newObject);

    // Write updated array back to the file
    fs.writeFileSync(dataPath, JSON.stringify(jsonArray, null, 2), "utf8");

    // Return a JSON response with the updated array
    return new Response(
      JSON.stringify({ message: "Object added successfully", data: jsonArray }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Failed to add object" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
