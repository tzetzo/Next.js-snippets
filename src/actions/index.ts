// "use server"; tells Next.js that all the functions exported here are `Server Actions`!
// `Server Actions are executed on the Server!`
"use server";

import { redirect } from "next/navigation";

import { db } from "@/db";
import { revalidatePath } from "next/cache";

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  try {
    // Check the user's inputs and make sure they're valid
    const title = formData.get("title"); // our input has name="title"
    const code = formData.get("code");

    // validation
    if (typeof title !== "string" || title.length < 3) {
      // If we want to communicate error back to the client we need to RETURN!
      return { message: "Title must be longer" };
    }
    if (typeof code !== "string" || code.length < 10) {
      return { message: "Code must be longer" };
    }

    // Create a new record in the DB
    await db.snippet.create({
      data: {
        title,
        code,
      },
    });
    // throw new Error("Failed to save to database");
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { message: err.message };
    } else {
      return { message: "Something went wrong..." };
    }
  }

  // re-render the Static Home page (necessary for prod, when the Home page is made Static during npm run build)
  revalidatePath('/');

  // Redirect the user back to the root route
  // never put `redirect` inside try/catch - it throws special kind of error for Next.js!!!
  redirect("/");
}

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    data: { code },
  });

  // re-render the Static /snippets/:id page (necessary for prod, when the page is made Static during npm run build)
  revalidatePath(`/snippets/${id}`);

  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  // delete a record in the DB
  await db.snippet.delete({
    where: {
      id,
    },
  });

  // re-render the Static Home page (necessary for prod, when the Home page is made Static during npm run build)
  revalidatePath('/');

  // Redirect the user back to the root route
  redirect("/");
}
