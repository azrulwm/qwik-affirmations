import {
  component$,
  useContext,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { MyContext } from "./layout";

export default component$(() => {
  const displayIndex = useSignal(0);
  const data = useContext(MyContext);

  useVisibleTask$(({ cleanup }) => {
    const interval = setInterval(() => {
      if (displayIndex.value < data.affirmations.length - 1) {
        displayIndex.value++;
      } else {
        displayIndex.value = 0;
      }
    }, 5000);

    cleanup(() => clearInterval(interval));
  });

  return (
    <>
      {data.affirmations.length > 0 ? (
        <>
          <h1> {data.affirmations[displayIndex.value][0]}</h1>
          <p>
            <i>{data.affirmations[displayIndex.value][1]}</i>
          </p>
        </>
      ) : (
        <>
          <p>Welcome to Affirmations!</p>
          <p
            onClick$={() => {
              data.openModal = true;
            }}
          >
            Add an affirmation
          </p>
        </>
      )}
    </>
  );
});

export const head: DocumentHead = {
  title: "Affirmations",
  meta: [
    {
      name: "description",
      content:
        "This is a feel good app  that reminds you of all the positive things people have to say about you",
    },
  ],
};
