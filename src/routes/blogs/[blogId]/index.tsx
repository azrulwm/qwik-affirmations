import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
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
  const params = useLocation().params;
  const content = useBuilderContent();

  return (
    <>
      <div class="bg-red-500 h-[500px]">
        This is Blog details for {params.blogId}
      </div>

      <RenderContent
        model={BUILDER_MODEL}
        content={content.value}
        apiKey={import.meta.env.PUBLIC_BUILDER_API_KEY}
      />
    </>
  );
});
