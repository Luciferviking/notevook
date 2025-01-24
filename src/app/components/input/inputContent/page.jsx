"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import styles from "./page.module.css";
import Remove from "../../delete/page";

const InputContent = ({ getSlug }) => {
  //fetching get api
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

  const textareaRef = useRef(null);
  const textareaRefTitle = useRef(null);
  const textareaRefPara = useRef(null);

  const [rows, setRows] = useState(1);
  const [rowsTitle, setRowsTitle] = useState(1);
  const [rowsPara, setRowsPara] = useState(1);

  // for text area dynamic rows
  const adjustRows = () => {
    if (textareaRef.current) {
      const lineHeight = 27.75; // Adjust based on your textarea's CSS line height fontsize(rem) * 18.5
      const { scrollHeight } = textareaRef.current;

      // Calculate rows based on scrollHeight and line height
      const newRows = Math.max(1, Math.ceil(scrollHeight / lineHeight));
      setRows(newRows);
    }
  };
  const adjustRowsTitle = () => {
    if (textareaRefTitle.current) {
      const lineHeight = 18.5; // Adjust based on your textarea's CSS line height fontsize(rem) * 18.5
      const { scrollHeight } = textareaRefTitle.current;

      // Calculate rows based on scrollHeight and line height
      const newRows = Math.max(1, Math.ceil(scrollHeight / lineHeight));
      setRowsTitle(newRows);
    }
  };
  const adjustRowsPara = () => {
    if (textareaRefPara.current) {
      const lineHeight = 27.75; // Adjust based on your textarea's CSS line height fontsize(rem) * 18.5
      const { scrollHeight } = textareaRefPara.current;

      // Calculate rows based on scrollHeight and line height
      const newRows = Math.max(1, Math.ceil(scrollHeight / lineHeight));
      setRowsPara(newRows);
    }
  };

  // Log data after it has been updated
  useEffect(() => {
    console.log("below is new");
    console.log(data);

    const getContent = data[getSlug] || {}; // Ensure getContent is defined

    console.log(getContent);

    const getContentOnly = getContent.content || "";
    const getParaOnly = getContent.paragraph || "";
    const getTitleOnly = getContent.title || "";

    setUserContent(getContentOnly);
    setUserPara(getParaOnly);
    setUserTitle(getTitleOnly);

    // Adjust rows on initial render (e.g., after page reload)
    adjustRows();
    adjustRowsTitle();
    adjustRowsPara();
  }, [data, getSlug]);

  const [userContent, setUserContent] = useState("");
  const [userPara, setUserPara] = useState("");
  const [userTitle, setUserTitle] = useState("");
  const [response, setResponse] = useState(""); // Store the response message

  const handleContentChange = (event) => {
    const textarea = textareaRef.current;
    // Reset the height to recalculate scroll height
    textarea.style.height = "auto";
    // Set the height to match the scroll height
    textarea.style.height = `${textarea.scrollHeight}px`;
    setUserContent(event.target.value);

    // Update the user input
  };
  const handleTitleChange = (event) => {
    const textarea = textareaRefTitle.current;
    // Reset the height to recalculate scroll height
    textarea.style.height = "auto";
    // Set the height to match the scroll height
    textarea.style.height = `${textarea.scrollHeight}px`;
    setUserTitle(event.target.value);

    // Update the user input
  };
  const handleParaChange = (event) => {
    const textarea = textareaRefPara.current;
    // Reset the height to recalculate scroll height
    textarea.style.height = "auto";
    // Set the height to match the scroll height
    textarea.style.height = `${textarea.scrollHeight}px`;
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
            ref={textareaRef}
            rows={rows}
            id={styles.inputCont}
            type="text"
            value={userContent}
            onChange={handleContentChange}
            // placeholder={getContentOnly}
          />

          {/* title */}
          <textarea
            rows={rowsTitle}
            ref={textareaRefTitle}
            id={styles.inputTitle}
            type="text"
            value={userTitle}
            onChange={handleTitleChange}
          />

          {/* paragraph */}
          <textarea
            rows={rowsPara}
            ref={textareaRefPara}
            id={styles.inputPara}
            type="text"
            value={userPara}
            onChange={handleParaChange}
            // onInput={handleParaChange}
            // placeholder={getContentOnly}
          />

          <button id={styles.buttonSave} type="submit">
            <Image
              aria-hidden
              src="/save.svg"
              alt="File icon"
              width={24}
              height={24}
              id={styles.saveImg}
            />
          </button>
        </form>
        <p>{response}</p>
      </div>
      <Remove id_={getSlug} />
    </div>
  );
};

export default InputContent;
