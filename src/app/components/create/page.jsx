"use client";
import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

function vibrate() {
  navigator.vibrate(70);
  // console.log("triggered");
}
function error_show() {
  const error = document.getElementsByClassName("createdMess")[0];
  error.style.display = "block";
  setTimeout(close_error, 600);
  function close_error() {
    error.style.display = "none";
  }
}

export default function CreateButton() {
  const addObject = async () => {
    const newObject = { title: "New Object" }; // Define the new object here
    try {
      const response = await fetch("/api/createData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newObject),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Object added:", data);
    } catch (error) {
      console.error("Error adding object:", error);
    }
    vibrate();
    error_show();
  };

  return (
    <div id={styles.mainCont}>
      <div id={styles.createdMess} className="createdMess">
        Note Created
      </div>
      <Link onClick={addObject} id={styles.mainContLink} href={"/"}>
        <p>Create</p>
        <Image
          aria-hidden
          src="/create.svg"
          alt="arrow icon"
          width={20}
          height={20}
          id={styles.navImg}
        />
      </Link>
    </div>
  );
}
