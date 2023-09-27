import {
  component$,
  createContextId,
  Slot,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import Modal from "~/components/router-head/modal";

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

  return (
    <>
      {state.openModal && <Modal />}
      <header>
        <i
          onClick$={() => {
            state.openModal = !state.openModal;
          }}
          class="fa-solid fa-plus cursor-pointer"
        ></i>
      </header>
      <main class="flex-1 flex flex-col max-w-[1200px] mx-auto w-full">
        <Slot />
      </main>
      <footer>footer</footer>
    </>
  );
});
