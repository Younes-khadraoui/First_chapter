import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { type DocumentHead, Link, routeLoader$ } from "@builder.io/qwik-city";
import { type Book, getBook } from "~/features/api/fetchBooks";
import placeholder from "~/assets/placeholder.jpg";
import { FaHeartRegular } from "@qwikest/icons/font-awesome";

export const useBook = routeLoader$(async (requestEvent) => {
  return (await getBook(requestEvent.params.id)) as Book;
});

export default component$(() => {
  const favourite = useSignal(false);
  const descriptionSignal = useSignal('');

  const res = useBook();
  const book = res.value;

  useTask$(() => {
    if (book.volumeInfo.description) {
      descriptionSignal.value = book.volumeInfo.description;
    }
  });

  return (
    <div class="min-h-[calc(100vh-9rem)] flex flex-wrap">
      <div class="p-4 bg-[#292828] gap-4 flex flex-col lg:flex-row flex-1">
        <img
          class="rounded-sm max-h-80 min-w-[200px]"
          src={
            book.volumeInfo.imageLinks.thumbnail?.replace(
              /^http:\/\//i,
              "https://"
            ) || placeholder
          }
          width={200}
          height={120}
          alt="Book Image"
        />
        <div class="py-5 lg:py-0">
          <h1 class="text-2xl">{book.volumeInfo.title}</h1>
          <p class="opacity-70">{book.volumeInfo.authors.join(", ")}</p>
          <p class="opacity-70 mb-4">
            {book.volumeInfo.categories?.join(", ")}
          </p>
          <div class="flex items-center">
            <Link
              class="bg-white rounded-lg text-[#242121] p-2 hover:bg-[#242121] hover:border hover:border-white hover:text-white transition-all duration-300 ease-in-out"
              href={book.volumeInfo.previewLink}
              target="_blank"
            >
              Preview
            </Link>
            <div
              onClick$={() => {
                favourite.value = !favourite.value;
              }}
            >
              <FaHeartRegular
                class={`text-2xl ml-4 ${favourite.value ? "text-red-500" : ""} cursor-pointer`}
              />
            </div>
          </div>
        </div>
      </div>
      <div class="p-4 flex-1">
        {book.volumeInfo.description && (
          <h2 class="text-2xl pb-2">Description :</h2>
        )}
        {!book.volumeInfo.description && (
          <h2 class="text-2xl pb-2 opacity-80">No Description available </h2>
        )}
        <div
          class="opacity-70"
          dangerouslySetInnerHTML={descriptionSignal.value} // Injecting the HTML string safely
        />
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Book Details",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
