import { component$, useContext, useSignal, useStore } from "@builder.io/qwik";
import { MyContext } from "~/routes/layout";

export default component$(() => {
  const state = useStore({
    affirmation: "",
  });
  const author = useSignal("");
  const data = useContext(MyContext);

  return (
    <div class="fixed top-0 left-0 w-screen h-screen bg-slate-900 p-4 flex flex-col gap-2 z-10">
      <div class=" flex justify-end">
        <i
          class="fa-solid fa-xmark cursor-pointer"
          onClick$={() => (data.openModal = false)}
        ></i>
      </div>
      <p class="text-2xl font-semibold text-center">Add an Affirmation</p>
      <input
        type="text"
        placeholder="Enter affirmation"
        onInput$={(e) => {
          if (e.target instanceof HTMLInputElement) {
            state.affirmation = e.target.value;
          }
        }}
        class="bg-transparent outline-none focus:outline-none text-sm sm:text-base p-2 rounded border border-sky-800 focus:border-sky-400 duration-200"
      />
      <input
        type="text"
        placeholder="Author"
        bind:value={author}
        class="bg-transparent outline-none focus:outline-none text-sm sm:text-base p-2 rounded border border-sky-800 focus:border-sky-400 duration-200"
      />
      <button
        class="bg-sky-400 text-sm px-4 duration-200 hover:bg-sky-600 py-2 rounded ml-auto"
        onClick$={() => {
          if (!author.value || !state.affirmation) {
            return;
          }

          data.affirmations = [
            ...data.affirmations,
            [state.affirmation, author.value],
          ];

          localStorage.setItem(
            "qwik-affirmations",
            JSON.stringify({ affirmations: data.affirmations })
          );

          state.affirmation = "";
          author.value = "";

          data.openModal = false;
        }}
      >
        Save
      </button>
      <div class="h-[1px] bg-sky-300 opacity-50"></div>
      <div class="flex flex-col gap-1">
        {data.affirmations.map((affirmation, affIndex) => {
          return (
            <div
              class="flex item-center gap-2 bg-[black] text-sm rounded p-2"
              key={affIndex}
            >
              <div class="flex flex-col flex-1">
                <p> {affirmation[0]}</p>
                <p class="text-xs text-slate-300">
                  <i> {affirmation[1]} </i>
                </p>
              </div>
              <i
                onClick$={() => {
                  data.affirmations = data.affirmations.filter(
                    (element, elementIndex) => {
                      return elementIndex !== affIndex;
                    }
                  );
                }}
                class="fa-solid fa-minus cursor-pointer hover:scale-125 duration-200"
              ></i>
            </div>
          );
        })}
      </div>
    </div>
  );
});
