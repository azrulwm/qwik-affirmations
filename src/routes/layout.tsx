import {
  component$,
  createContextId,
  Slot,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { getAllContent } from "@builder.io/sdk-qwik";
import Modal from "~/components/modal";

export const BUILDER_MODEL = "navigation-link";

export const MyContext = createContextId<AffirmationState>("qwik-affirmations");

interface AffirmationState {
  affirmations: Array<[string, string]>;
  openModal: boolean;
}

export const useBuilderContent = routeLoader$(async () => {
  const builderContent = await getAllContent({
    model: BUILDER_MODEL,
    apiKey: import.meta.env.PUBLIC_BUILDER_API_KEY,
  });

  return builderContent;
});

export default component$(() => {
  const state = useStore({
    affirmations: [],
    openModal: false,
  });

  const navContent = useBuilderContent();

  useContextProvider(MyContext, state);

  useVisibleTask$(() => {
    const storedData = localStorage.getItem("qwik-affirmations");
    if (storedData) {
      state.affirmations = JSON.parse(storedData).affirmations;
    }
  });

  return (
    <>
      {state.openModal && <Modal />}
      <header>
        <div class="flex justify-between">
          <i
            onClick$={() => {
              state.openModal = !state.openModal;
            }}
            class="fa-solid fa-plus cursor-pointer"
          ></i>
          {/* <div class="flex gap-10">
            <Link href="/">Home</Link>
            <Link href="/blogs">Blogs</Link>
            <Link href="/details">Details</Link>
            <Link href="/about-affirmations">About</Link>
          </div> */}
          <nav class="flex gap-10">
            {navContent.value === null
              ? null
              : "results" in navContent.value
              ? navContent.value.results.map((link: any, index: number) => (
                  <a key={index} href={link.data.url}>
                    {link.data.label}
                  </a>
                ))
              : null}
          </nav>
        </div>
      </header>
      <main class="flex-1 flex flex-col max-w-[1200px] mx-auto w-full justify-center items-center gap-2">
        <Slot />
      </main>
      <footer class="text-center text-sm">
        © 2023 Qwik-Affirmations. All rights reserved.
      </footer>
    </>
  );
});
