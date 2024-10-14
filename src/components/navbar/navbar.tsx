import {
  component$,
  useContext,
  useSignal,
  $,
  type QRL,
} from "@builder.io/qwik";
import { Form, Link } from "@builder.io/qwik-city";
import { FaHeartRegular } from "@qwikest/icons/font-awesome";
import { FaBellRegular } from "@qwikest/icons/font-awesome";
import { FaGemRegular } from "@qwikest/icons/font-awesome";
import BooksIcon from "~/assets/Books.svg?jsx";
import { searchContext } from "~/routes/layout";

export const useDebouncer = (fn: QRL<(args: any) => void>, delay: number) => {
  const timeoutId = useSignal<number>();

  return $((args: any) => {
    clearTimeout(timeoutId.value);
    timeoutId.value = Number(setTimeout(() => fn(args), delay));
  });
};

export const Navbar = component$(() => {

  const searchData = useContext(searchContext);
  const debounce = useDebouncer(
    $((value: string) => {
      searchData.value = value;
    }),
    1000
  );
  return (
    <div class="bg-[#292828] grid grid-cols-2 sm:grid-cols-3 justify-between p-2 items-center">
      <div class="flex text-start items-center ">
        <Link href="/" aria-label="Home">
          <BooksIcon width={80} />
        </Link>
        <Link href="/" aria-label="Home">
          <p class="text-xl md:text-2xl flex-grow hover:opacity-80">First Chapter</p>
        </Link>
      </div>
      <div class="order-4 col-span-2 sm:col-span-1 flex justify-center mt-2 sm:mt-0">
        <div class="flex  sm:w-full">
          <input
            class="flex-grow p-1 pl-4 rounded-lg bg-[#373737] border-none active:border-none focus:outline-none w-full"
            placeholder="search a book"
            type="text"
            onInput$={(_, target) => {
              debounce(target.value);
            }}
          />
        </div>
      </div>
      <dvi class="flex gap-4 justify-end items-center  sm:order-5">
        <Link href="/" class="text-2xl" aria-label="Favorite">
          <FaHeartRegular />
        </Link>
        <Link href="/" class="text-2xl" aria-label="Notifications">
          <FaBellRegular />
        </Link>
        <Link href="/" class="text-2xl" aria-label="Settings">
          <FaGemRegular />
        </Link>
          <Form >
            <input type="hidden" name="providerId" value="github" />
            <input
              type="hidden"
              name="options.callbackUrl"
              value="https://firstchap.vercel.app/"
            />
            <div class="rounded-full h-7 bg-white cursor-pointer w-7" />
          </Form>
      </dvi>
    </div>
  );
});
