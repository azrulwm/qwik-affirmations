import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import {
  RenderContent,
  getAllContent,
  getBuilderSearchParams,
  getContent,
} from "@builder.io/sdk-qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

export const BUILDER_MODEL = "announcement-bar";

export const useBlogsContent = routeLoader$(async ({ url, error }) => {
  const isPreviewing = url.searchParams.has("builder.preview");

  const builderContent = await getAllContent({
    model: "blogs-details",
    apiKey: import.meta.env.PUBLIC_BUILDER_API_KEY,
    options: getBuilderSearchParams(url.searchParams),
  });

  // If there's no content, throw a 404.
  // You can use your own 404 component here
  if (!builderContent && !isPreviewing) {
    throw error(404, "Page not found");
  }
  // return content fetched from Builder, which is JSON
  return builderContent;
});

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
  if (!builderContent && !isPreviewing) {
    throw error(404, "Page not found");
  }
  // return content fetched from Builder, which is JSON
  return builderContent;
});

export default component$(() => {
  const content = useBuilderContent();
  const blogsContent = useBlogsContent().value;

  return (
    <div class="max-w-xl ">
      <p>Blogs</p>
      {blogsContent.results.map((blog, index) => {
        const affirmation = blog.data.affirmation;
        const author = blog.data.title;
        const url = blog.data.url;

        return (
          <Link href={url} key={index}>
            <div class="cursor-pointer mt-8">
              Affirmation : {affirmation}, author: {author}
              <br />
            </div>
          </Link>
        );
      })}

      <RenderContent
        model={BUILDER_MODEL}
        content={content.value}
        apiKey={import.meta.env.PUBLIC_BUILDER_API_KEY}
      />
    </div>
  );
});
