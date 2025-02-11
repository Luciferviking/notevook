"use client";
import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Card() {
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

  const listItems = data.map((notes) => (
    <div key={notes.id} className={styles.mainCont}>
      <div className={styles.cardInfo}>
        <p>{notes.content}</p>
        <p>{notes.paragraph}</p>
        <p>{notes.title}</p>
      </div>
      <div className={styles.cardButton}>
        <Link href={`/components/card/${notes.id}`}>
          <Image
            aria-hidden
            src="/arrow.svg"
            alt="arrow icon"
            width={50}
            height={50}
            id={styles.fontImg}
          />
        </Link>
      </div>
    </div>
  ));

  return <div>{listItems}</div>;
}
