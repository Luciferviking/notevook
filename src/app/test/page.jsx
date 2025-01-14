"use client";

import React, { useEffect, useState } from "react";

const EditableComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState("");

  // Fetch data from mockData.json
  const fetchData = async () => {
    try {
      const res = await fetch("../api/getData", { cache: "no-store" }); // Prevent caching
      if (!res.ok) throw new Error("Failed to fetch data");
      const jsonData = await res.json();
      setData(jsonData);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Update data on the server
  const saveData = async (id, newParagraph) => {
    try {
      const res = await fetch("../api/saveData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, newParagraph }),
      });

      if (!res.ok) {
        const error = await res.json();
        setResponse(error.message || "Failed to save data!");
        return;
      }

      const result = await res.json();
      setResponse(result.message);
      fetchData(); // Refresh the data
    } catch (error) {
      console.error(error);
      setResponse("An error occurred while saving data.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Editable Mock Data</h1>
      {data.map((item) => (
        <div key={item.id} style={{ marginBottom: "20px" }}>
          <textarea
            value={item.paragraph}
            onChange={(e) => {
              const updatedData = data.map((d) =>
                d.id === item.id ? { ...d, paragraph: e.target.value } : d
              );
              setData(updatedData);
            }}
            rows="4"
            cols="50"
          />
          <br />
          <button
            onClick={() => saveData(item.id, item.paragraph)}
            style={{ marginTop: "10px" }}
          >
            Save
          </button>
        </div>
      ))}
      {response && <p>{response}</p>}
    </div>
  );
};

export default EditableComponent;
