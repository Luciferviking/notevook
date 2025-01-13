import styles from "./page.module.css";
import { read } from "../../../script/method";

export default async function Page({ params }) {
  // Await params if it's a Promise
  const resolvedParams = await params;
  const { writing } = resolvedParams;
  const valueOfSlugInt = parseInt(resolvedParams.writing, 10);

  // console.log(valueOfSlug);
  // console.log(typeof valueOfSlug);

  // console.log(read(valueOfSlug));

  const readObj = read(valueOfSlugInt);
  // console.log(readObj);

  const ListItems = () => (
    <div key={readObj.id} id={styles.mainCont}>
      <p id={styles.pTest}>Checking CSS connectivity</p>
      <div id={styles.titleCont}>{readObj.content}</div>
    </div>
  );

  return (
    <div>
      <ListItems />
    </div>
  );
}
