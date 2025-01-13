import styles from "./page.module.css";
import { read } from "../../../script/method";
import InputPara from "../../input/inputPara/page";
import InputTitle from "../../input/inputTitle/page";
import InputContent from "../../input/inputContent/page";

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
      <InputContent
        getSlug={valueOfSlugInt}
        getContent={read(valueOfSlugInt)}
      />
      <InputTitle getSlug={valueOfSlugInt} getContent={read(valueOfSlugInt)} />
      <InputPara getSlug={valueOfSlugInt} getContent={read(valueOfSlugInt)} />
    </div>
  );

  return (
    <div>
      <ListItems />
    </div>
  );
}
