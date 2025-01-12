import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div>
      <button>
        <Link href={"/"}>Home</Link>
      </button>
    </div>
  );
}
