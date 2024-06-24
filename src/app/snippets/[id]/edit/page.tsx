import { notFound } from "next/navigation";

import SnippetEditForm from '@/components/snippet-edit-form';
import { db } from "@/db";

interface SnippetEditPageProps {
  params: { id: string };
}

export default async function SnippetEditPage(props: SnippetEditPageProps) {

  const snippet = await db.snippet.findFirst({
    where: {
      id: parseInt(props.params.id),
    },
  });

  // if snippet doesnt exist Next will show its default NotFound page
  if (!snippet) {
    return notFound();
  }

  return (
    <SnippetEditForm snippet={snippet} />
  );
}
