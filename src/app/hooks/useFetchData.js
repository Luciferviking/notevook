import { useState, useEffect } from "react";

export const useFetchData = (params) => {
  const [data, setData] = useState([]);
  const [resolvedParams, setResolvedParams] = useState(null);
  const [loading, setLoading] = useState(true);

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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params;
      setResolvedParams(resolved);
      setLoading(false);
    };

    resolveParams();
  }, [params]);

  return { data, resolvedParams, loading };
};