import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export default function Navbar() {
  return (
    <div id={styles.mainCont}>
      <button id={styles.navItem}>
        <Link id={styles.homeCont} href={"/"}>
          {" "}
          <p>Home</p>
          <Image
            aria-hidden
            src="/arrow.svg"
            alt="arrow icon"
            width={20}
            height={20}
            id={styles.navImg}
          />
        </Link>
      </button>
    </div>
  );
}
