import styles from "./page.module.css";
import { read } from "../../../script/method";
import InputContent from "../../input/inputContent/page";

export default async function Page({ params }) {
  // Await params if it's a Promise
  const resolvedParams = await params;
  const { writing } = resolvedParams;
  const valueOfSlugInt = parseInt(resolvedParams.writing, 10);

  return (
    <div>
      {/* <ListItems /> */}
      <div id={styles.mainCont}>
        <InputContent
          getSlug={valueOfSlugInt}
          getContent={read(valueOfSlugInt)}
        />
      </div>
    </div>
  );
}
