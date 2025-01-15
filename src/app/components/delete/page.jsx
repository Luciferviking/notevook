"use client";

import { useRouter } from "next/navigation"; // For navigation
import styles from "./page.module.css";
import Image from "next/image";

export default function DeleteButton({ id_ }) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await fetch("/api/deleteData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_ }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Item deleted:", data);

        // Redirect to a different page (e.g., homepage)
        router.push("/");
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error while deleting item:", error);
    }
  };

  return (
    <button onClick={handleDelete} id={styles.mainCont}>
      <p>Delete</p>
      <Image
        aria-hidden
        src="/delete.svg"
        alt="File icon"
        width={20}
        height={20}
        id={styles.saveImg}
      />
    </button>
  );
}
