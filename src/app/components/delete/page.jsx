"use client";

import { useRouter } from "next/navigation"; // For navigation
import styles from "./page.module.css";
import Image from "next/image";

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
    vibrate();
    error_show();
  };

  return (
    <button onClick={handleDelete} id={styles.mainCont}>
      <div id={styles.createdMess} className="createdMess">
        Note Deleted
      </div>
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
