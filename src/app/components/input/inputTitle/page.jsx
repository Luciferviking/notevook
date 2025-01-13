"use client";

import React, { useState } from "react";
import styles from "./page.module.css";

const InputTitle = ({ getSlug, getContent }) => {
  const getContentOnly = getContent.title;
  const [userInput, setUserInput] = useState(getContentOnly); // Store user input
  const [response, setResponse] = useState(""); // Store the response message

  const whichKey = "a"; // b: refers for the content key value pair

  const handleChange = (event) => {
    setUserInput(event.target.value);
    // Update the user input
  };

  const handleSubmitTitle = async (event) => {
    event.preventDefault();

    //tempo slug for testing
    // const tempoSlug = 4;

    try {
      const res = await fetch("/api/saveData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug: getSlug, userInput, whichKey }), //slug should be getSlug
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
    <div id={styles.mainCont}>
      {/* title input field */}
      <div>
        <form onSubmit={handleSubmitTitle}>
          <textarea
            rows={1}
            id={styles.inputCont}
            type="text"
            value={userInput}
            onChange={handleChange}
            // placeholder={getContentOnly}
          />
          <button id={styles.buttonSave} type="submit">
            S
          </button>
        </form>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default InputTitle;
