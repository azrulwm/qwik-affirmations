import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

export default component$(() => {
  const params = useLocation().params;
  return (
    <>
      <div class="bg-red-500 h-screen">
        This is Blog details for {params.blogId}
      </div>
    </>
  );
});
