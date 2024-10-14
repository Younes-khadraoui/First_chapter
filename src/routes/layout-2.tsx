import {
  type Signal,
  Slot,
  component$,
  createContextId,
  useSignal,
  useContextProvider,
} from "@builder.io/qwik";
import { Footer } from "~/components/footer/footer";
import { Navbar } from "~/components/navbar/navbar";

export const searchContext = createContextId<Signal<string>>("Search_Context");

export default component$(() => {
  const searchedValue = useSignal("");

  useContextProvider(searchContext, searchedValue);
  return (
    <>
      <Navbar />
       <Slot />
      <Footer />
    </>
  );
});
