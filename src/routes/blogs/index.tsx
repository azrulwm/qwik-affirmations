import { component$, useContext } from "@builder.io/qwik";
import { MyContext } from "../layout";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  const blogsData = useContext(MyContext).affirmations;

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
    </>
  );
});
