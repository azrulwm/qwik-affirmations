import { component$, useContext } from "@builder.io/qwik";
import { MyContext } from "../layout";
import { Link } from "@builder.io/qwik-city";
import {
  RenderContent,
  getBuilderSearchParams,
  getContent,
} from "@builder.io/sdk-qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

export const BUILDER_MODEL = "announcement-bar";

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
  const blogsData = useContext(MyContext).affirmations;
  const content = useBuilderContent();

  return (
    <>
      <p>Blogs</p>
      {blogsData.map((blog, index) => {
        const affirmation = blog[0];
        const author = blog[1];
        return (
          <Link href={author} key={index}>
            <div class="bg-red-300 cursor-pointer">
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
    </>
  );
});
