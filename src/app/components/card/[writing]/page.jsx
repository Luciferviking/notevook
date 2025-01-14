export default async function Page({ params }) {
  // Await params if it's a Promise
  const resolvedParams = await params;
  const valueOfSlugInt = parseInt(resolvedParams.writing, 10);

  return <div>hello {valueOfSlugInt}</div>;
}
