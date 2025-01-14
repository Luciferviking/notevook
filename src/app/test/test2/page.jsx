"use client";
import { useEffect, useState } from "react";

export default function MyComponent() {
  const [data, setData] = useState([]);
  const [trial, setTrial] = useState(null); // Store trial value separately
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/saveData"); // Adjust API endpoint path as necessary
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Ensure loading stops
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Process `trial` only after `data` is loaded
    if (data[1]) {
      setTrial(data[1].paragraph); // Safely access `data[1].id` once available
    }
  }, [data]); // Run this effect whenever `data` changes

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div>this is the log content: {JSON.stringify(trial)}</div>
    </div>
  );
}
