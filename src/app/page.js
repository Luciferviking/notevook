import styles from "./page.module.css";
import Navbar from "./components/navbar/page";
import Card from "./components/card/page";
import Create from "./components/create/page";

//base root

export default function Home() {
  return (
    <div className={styles.page}>
      <Create/>
      <Card/>
    </div>
  );
}
