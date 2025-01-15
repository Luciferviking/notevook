"use client";

import React, { useState } from "react";
import styles from "./page.module.css";

const InputContent = ({ getSlug, getContent }) => {
  const getContentOnly = getContent.content;
  const getParaOnly = getContent.paragraph;
  const getTitleOnly = getContent.title;
  const [userContent, setUserContent] = useState(getContentOnly); // Store user input
  const [userPara, setUserPara] = useState(getParaOnly);
  const [userTitle, setUserTitle] = useState(getTitleOnly);
  const [response, setResponse] = useState(""); // Store the response message

  const handleContentChange = (event) => {
    setUserContent(event.target.value);
    // Update the user input
  };
  const handleTitleChange = (event) => {
    setUserTitle(event.target.value);
    // Update the user input
  };
  const handleParaChange = (event) => {
    setUserPara(event.target.value);
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
        body: JSON.stringify({
          slug: getSlug,
          userContent,
          userPara,
          userTitle,
        }), //slug should be getSlug
      });
      ``;

      if (!res.ok) {
        const error = await res.json(); // Handle API error response
        setResponse(error.message || "Failed to save data!");
        return;
      }

      const result = await res.json();
      setResponse(result.message); // Display success message
      //   setUserContent(""); // Clear the input field
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
            rows={3}
            id={styles.inputCont}
            type="text"
            value={userContent}
            onChange={handleContentChange}
            // placeholder={getContentOnly}
          />

          {/* title */}
          <textarea
            rows={3}
            id={styles.inputCont}
            type="text"
            value={userTitle}
            onChange={handleTitleChange}
          />

          {/* paragraph */}
          <textarea
            rows={3}
            id={styles.inputCont}
            type="text"
            value={userPara}
            onChange={handleParaChange}
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

export default InputContent;
