"use client";
import { useEffect, useState } from "react";

export default function MockDataComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getData", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        setData(data);
        console.log("Object added:", data); // Log after setting state
      } catch (error) {
        console.error("Error adding object:", error);
      }
    };

    fetchData();
  }, []);

  console.log("below here page output");
  console.log(data); // Log state data

  return (
    <div>
      <h1>Mock Data</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.content}</li>
        ))}
      </ul>
    </div>
  );
}
