import {
  component$,
  createContextId,
  Slot,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import Modal from "~/components/modal";

export const MyContext = createContextId<AffirmationState>("qwik-affirmations");

interface AffirmationState {
  affirmations: string[];
  openModal: boolean;
}

export default component$(() => {
  const state = useStore({
    affirmations: [],
    openModal: false,
  });

  useContextProvider(MyContext, state);

  useVisibleTask$(() => {
    if (localStorage.getItem("qwik-affirmations")) {
      state.affirmations = JSON.parse(
        localStorage.getItem("qwik-affirmations")
      ).affirmations;
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
          <div class="flex gap-10">
            <Link href="/">Home</Link>
            <Link href="/blogs">Blogs</Link>
            <Link href="/about-affirmations">About</Link>
          </div>
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
