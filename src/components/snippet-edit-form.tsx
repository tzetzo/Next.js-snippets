// This component will be rendered in the browser
// Client Component - used when hooks or event handlers are needed!!!
"use client";

import { useState } from "react";
import { Editor } from "@monaco-editor/react";

import type { Snippet } from "@prisma/client";

import * as actions from "@/actions";

interface SnippetEditFormProps {
  snippet: Snippet; // OR redifine it with { id: string; title: string; code: string };
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setCode] = useState(snippet.code);

  function handleEditorChange(value: string = "") {
    setCode(value);
  }

  // using server action defined in separate file
  // we need to use bind, otherwise formdata will be passed as first argument instead of the id and code
  const editSnippetAction = actions.editSnippet.bind(null, snippet.id, code);

  return (
    <div>
      <Editor
        height="40vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={snippet.code}
        options={{ minimap: { enabled: false } }}
        onChange={handleEditorChange}
      />
      <form action={editSnippetAction}>
        <button className="rounded p-2 border" type="submit">Save</button>
      </form>
    </div>
  );
}
