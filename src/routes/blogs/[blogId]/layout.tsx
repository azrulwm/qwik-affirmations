import { Slot, component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <Link href="/blogs">Back to blogs</Link>
      <header class="bg-pink-300">Blog details header</header>
      <Slot />
      <footer class="bg-pink-300">Blog details footer</footer>
    </>
  );
});
