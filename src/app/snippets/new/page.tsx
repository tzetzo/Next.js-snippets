"use client";

import { useFormState } from "react-dom";

import * as actions from "@/actions";

export default function SnippetCreatePage() {
  // `formState` is returned by the Server Action (actions.createSnippet) after form is submitted
  // `action` is updated version of actions.createSnippet
  // actions.createSnippet is called when the form is submitted!
  // we decide what the formState object will look like, in this case default message value is empty string
  const [formState, action] = useFormState(actions.createSnippet, {
    message: "",
  });

  return (
    <form action={action}>
      <h3 className="font-bold m-3">Create a snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>
          <input
            name="title"
            className="border rounded p-2 w-full"
            id="title"
          />
        </div>
        <div className="flex gap-4">
          <label className="w-12" htmlFor="code">
            Code
          </label>
          <textarea
            name="code"
            className="border rounded p-2 w-full"
            id="code"
          />
        </div>
        {formState.message ? <div className='my-2 p-2 bg-red-200 border rounded border-red-400'>{formState.message}</div> : null}
        <button className="rounded p-2 bg-blue-200" type="submit">
          Create
        </button>
      </div>
    </form>
  );
}
