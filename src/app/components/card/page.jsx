import React from "react";
import styles from "./page.module.css";
import { readFull } from "../../script/method";
import Link from "next/link";
//import "../../globals.css";

export default function Card() {
  const listItems = readFull.map((notes) => (
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
              <div id={styles.bottomLeftCont}>+</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  ));

  return <div>{listItems}</div>;
}
