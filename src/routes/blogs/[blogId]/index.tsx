import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import {
  RenderContent,
  getBuilderSearchParams,
  getContent,
} from "@builder.io/sdk-qwik";
export const BUILDER_MODEL = "blogs-details";

export const useBuilderContent = routeLoader$(async ({ url, error }) => {
  const isPreviewing = url.searchParams.has("builder.preview");

  const builderContent = await getContent({
    model: BUILDER_MODEL,
    apiKey: import.meta.env.PUBLIC_BUILDER_API_KEY,
    options: getBuilderSearchParams(url.searchParams),
    userAttributes: {
      urlPath: url.pathname,
    },
  });

  // If there's no content, throw a 404.
  // You can use your own 404 component here
  // if (!builderContent && !isPreviewing) {
  //   throw error(404, "Page not found");
  // }
  // return content fetched from Builder, which is JSON
  return builderContent;
});

export default component$(() => {
  const content = useBuilderContent().value;
  // console.log(content);

  return (
    <>
      <div class="h-[500px] flex flex-col justify-center items-center">
        <h1 class="text-3xl font-semibold text-center">
          "{content?.data.affirmation}"
        </h1>
        <p class="text-slate-300 text-sm">
          <i>-{content?.data.title}</i>
        </p>
      </div>

      <RenderContent
        model={BUILDER_MODEL}
        content={content}
        apiKey={import.meta.env.PUBLIC_BUILDER_API_KEY}
      />
    </>
  );
});
