import { component$, useContext, useSignal, useStore } from "@builder.io/qwik";
import { MyContext } from "~/routes/layout";

export default component$(() => {
  const state = useStore({
    affirmation: "",
  });
  const author = useSignal("");
  const data = useContext(MyContext);

  return (
    <div class="fixed top-0 left-0 w-screen h-screen bg-slate-900">
      <p>Add an Affirmation</p>
      <input
        type="text"
        placeholder="Enter affirmation"
        onInput$={(e) => {
          state.affirmation = e.target.value;
        }}
      />

      <input type="text" placeholder="Author" bind:value={author} />
      <button
        onClick$={() => {
          if (!author.value || !state.affirmation) {
            return;
          }

          data.affirmations = [
            ...data.affirmations,
            [state.affirmation, author.value],
          ];
          state.affirmation = "";
          author.value = "";

          console.log(data);

          data.openModal = false;
        }}
      >
        Save
      </button>
      <hr />
      <div class="flex flex-col gap-1">
        {data.affirmations.map((affirmation, index) => {
          return <div key={index}>{affirmation[0]}</div>;
        })}
      </div>
      {/* <div>{state.affirmation}</div>
      <div>{author.value}</div>
      <div>{data.affirmations}</div> */}
    </div>
  );
});
