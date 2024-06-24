import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { db } from "@/db";
import * as actions from "@/actions";

interface SnippetShowPageProps {
  params: { id: string };
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
  // introduce artificial pause just to see our Loading in dev
  // await new Promise(r => setTimeout(r, 2000));

  const snippet = await db.snippet.findFirst({
    where: {
      id: parseInt(props.params.id),
    },
  });

  // if snippet doesnt exist Next will show its default NotFound page
  if (!snippet) {
    return notFound();
  }

  // using server action defined in separate file
  // we need to use bind, otherwise formdata will be passed as first argument instead of the id
  const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);

  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-4">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="border p-2 rounded"
          >
            Edit
          </Link>
          <form action={deleteSnippetAction}>
            <button className="border p-2 rounded" type="submit">
              Delete
            </button>
          </form>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}

// this function is auto run when `npm run build` is executed
// caches the /snippet/:id pages i.e. makes them Static at build time(prod)
export async function generateStaticParams() {
  const snippets = await db.snippet.findMany();

  return snippets.map((snippet) => ({ id: snippet.id.toString() }));
}
