"use client";
import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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
  };

  return (
    <div id={styles.mainCont}>
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
