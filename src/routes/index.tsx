import {
  Resource,
  component$,
  useContext,
  useResource$,
} from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { searchContext, categoryContext } from "./layout";
import { type Book, getBooks } from "~/features/api/fetchBooks";
import placeholder from "~/assets/placeholder.jpg";

export default component$(() => {
  const nav = useNavigate();

  const categorieData = useContext(categoryContext);
  const searchData = useContext(searchContext);

  const dataResource = useResource$<Book[]>(
    async ({ track, cleanup }: { track: any; cleanup: any }) => {
      track(() => categorieData.value);
      track(() => searchData.value);

      const controller = new AbortController();
      cleanup(() => controller.abort("cleanup"));

      if (searchData.value)
        return await getBooks(
          searchData.value,
          categorieData.value,
          controller
        );
      else return await getBooks("search", categorieData.value, controller);
    }
  );

  return (
    <div class="min-h-screen">
      <Resource
        value={dataResource}
        onPending={() => (
          <div class="loader w-full p-10 flex justify-center items-center">
            Loading...
          </div>
        )}
        onRejected={(reason) => (
          <div class="p-4 text-red-500">Error: {reason.message}</div>
        )}
        onResolved={(Books) => (
          <div class="flex flex-wrap gap-4 p-4 justify-center ">
            {Books.map((book) => (
              <div key={book.id}>
                <img
                  class="h-full cursor-pointer"
                  src={
                    book.volumeInfo.imageLinks?.thumbnail?.replace(
                      /^http:\/\//i,
                      "https://"
                    ) || placeholder
                  }
                  width={200}
                  height={80}
                  onClick$={() => {
                    nav("/books/" + book.id);
                  }}
                  alt="Book Image"
                />
              </div>
            ))}
          </div>
        )}
      />
    </div>
  );
});

export const head: DocumentHead = {
  title: "First Chapter",
  meta: [
    {
      name: "description",
      content: "Books store ",
    },
    // Open graph
    {
      property: "og:title",
      content: "First Chapter",
    },
    {
      property: "og:description",
      content: "Books store",
    },
  ],
};
