export default async function Page({ params }) {
  // Await params if it's a Promise
  const resolvedParams = await params;
  const { writing } = resolvedParams;

  return (
    <div>
      <h1>Slug: {writing}</h1>
      <p>This is a server-side rendered page for the slug: {writing}</p>
    </div>
  );
}
