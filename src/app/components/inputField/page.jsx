"use client";

import React, { useState } from "react";

const InputForm = () => {
  const [userInput, setUserInput] = useState(""); // Store user input
  const [response, setResponse] = useState(""); // Store the response message

  const handleChange = (event) => {
    setUserInput(event.target.value); // Update the user input
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch("/api/saveData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput }),
      });
      ``;

      if (!res.ok) {
        const error = await res.json(); // Handle API error response
        setResponse(error.message || "Failed to save data!");
        return;
      }

      const result = await res.json();
      setResponse(result.message); // Display success message
      //   setUserInput(""); // Clear the input field
    } catch (error) {
      setResponse("An error occurred. Please try again.");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Enter Words</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={handleChange}
          placeholder="Type something..."
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "300px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          type="submit"
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
      <p style={{ marginTop: "20px" }}>{response}</p>
    </div>
  );
};

export default InputForm;
