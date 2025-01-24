// src/app/api/delete/route.js (for the app directory structure)
import fs from "fs";
import path from "path";

export async function POST(req) {

  const dataPath = "public/data/mockData.json" // Path to your JSON file

  try {
    // Read the request body and parse JSON
    const { id_ } = await req.json();

    // Read the current data from the file
    const fileData = fs.readFileSync(dataPath, "utf8");
    const jsonArray = JSON.parse(fileData);

    // Find and delete the item with the matching ID
    const index = jsonArray.findIndex((item) => item.id === id_);
    if (index === -1) {
      return new Response(
        JSON.stringify({ error: "Item not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Splice the array to remove the item
    jsonArray.splice(index, 1);

    // changing the id of other data so it doesn't leaves hole in the data id
    for(let i = id_; i < jsonArray.length; i++){
        //  console.log(i);
          jsonArray[i].id = i;
      }

    // Write the updated data back to the file
    fs.writeFileSync(dataPath, JSON.stringify(jsonArray, null, 2), "utf8");

    return new Response(
      JSON.stringify({ message: "Item deleted successfully", data: jsonArray }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to delete item" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
