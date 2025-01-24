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
    <div key={notes.id} id={styles.mainCont}>
      <div id={styles.topCont}>
        <div id={styles.topContHeading}>{notes.content}</div>
      </div>
      <div id={styles.bottomPaCont}>
        <div id={styles.bottomCont}>
          <p>{notes.title}</p>
          <div id={styles.bottomPillsCont}>
            <div>250 words</div>
            <div>Number: {notes.id}</div>
          </div>
        </div>
        <div id={styles.bottomLeftPaPaCont}>
          <Link href={`/components/card/${notes.id}`}>
            <div id={styles.bottomLeftPaCont}>
              <div id={styles.bottomLeftCont}>
                <Image
                  aria-hidden
                  src="/arrow.svg"
                  alt="arrow icon"
                  width={50}
                  height={50}
                  id={styles.fontImg}
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  ));

  return <div>{listItems}</div>;
}
