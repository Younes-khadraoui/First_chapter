import { component$, useContext  } from "@builder.io/qwik";
import { categoryContext } from "~/routes/layout";

export const categories = [
  "Fiction",
  "Non-fiction",
  "Mystery",
  "Romance",
  "Fantasy",
  "Biography",
  "History",
  "Development",
  "Business",
  "Young Adult",
  "Children",
  "Crime",
  "Horror",
  "Poetry",
  "Travel",
  "Cooking",
  "Art",
  "Religion",
  "Philosophy",
  "Psychology",
];

export const Sidebar = component$(() => {
  const categoryData = useContext(categoryContext);
  // const showSidebar = useSignal(false);
  return (
    <div class="flex min-h-screen flex-1">
      <div class="border-4 flex flex-col gap-4 border-[#292828] rounded-lg p-4 w-fit h-fit mt-3 ml-2 sticky top-3">
        <p class="underline underline-offset-2 text-xl">Categories</p>
        <ul class="flex items-start flex-col">
          {categories.map((category, index) => (
            <li class="w-full px-2 flex" key={index}>
              <input
                class="accent-[#292828] ou</label>tline-none cursor-pointer"
                type="radio"
                id={category}
                name={"category"}
                value={category}
                checked={category === categoryData.value}
                onChange$={() => {
                  categoryData.value = category;
                }}
              />
              <label for={category} class="px-2 text-sm">
                {category}
              </label>
            </li>
          ))}
        </ul>
        <button
          class="bg-white text-sm rounded-sm border text-black p-1 hover:bg-[#242121] hover:border hover:border-white hover:text-white transition-all duration-300 ease-in-out"
          onClick$={() => {
            categoryData.value = "";
            document
              .querySelectorAll('input[type="radio"][name="category"]')
              .forEach((input) => {
                (input as HTMLInputElement).checked = false;
              });
          }}
        >
          Clear Selection
        </button>
      </div>
    </div>
  );
});
