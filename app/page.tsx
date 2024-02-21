import { promises as fs } from "fs";
import matter from "gray-matter";
import Link from "next/link";

type Post = {
  slug: string; title?: string; date?: string; spoiler?: string;
}

export async function getPosts() {
  const entries = await fs.readdir("./public/", { withFileTypes: true });

  const dirs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  const fileContents = await Promise.all(
    dirs.map((dir) => fs.readFile("./public/" + dir + "/index.md", "utf8"))
  );

  const posts: Array<Post> = dirs.map((slug, i) => {
    const fileContent = fileContents[i];
    const { data } = matter(fileContent);
    return { slug, ...data };
  });
  posts.sort((a, b) => {
    return Date.parse(a.date || "") < Date.parse(b.date || "") ? 1 : -1;
  })
  return posts;
}


export function Navbar() {
  return (
    <>
      <div className='border sticky top-0'>
        <h1 className='text-center text-2xl'>Lorem Ipsum</h1>
        <ul className='flex justify-center py-2'>
          <li className='me-2'><Link href={"/"}>Home</Link></li>
          <li className='me-2'><Link href={"/projects"}>Projects</Link></li>
          <li className='me-2'><Link href={"/blog"}>Blog</Link></li>
          <li className=''><Link href={"/about"}>About</Link></li>
        </ul>
      </div>
    </>
  )
}
export default async function Home() {
  const posts = await getPosts();
  let recentPosts: Post[] = posts;
  if (posts.length >= 3) {
    recentPosts = posts.slice(0, 3);
  }

  return (
    <>
      <div className="mx-auto w-4/6 text-center ">
        <div className='overflow-y-scroll no-scrollbar'>
          <div className='py-4'>
            <h2 className='text-2xl py-2'>Hi I'm Arth Prajapati</h2>
            <p className='w-3/4 mx-auto'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
              at dignissimos et molestias illum totam. Molestias voluptate sapiente
              tempore totam. Tempora, ipsum temporibus nostrum officiis hic est
              impedit explicabo deserunt et porro numquam, laborum eum quas magnam
              eligendi placeat natus voluptatem iste vel reprehenderit quia.</p>
          </div>

          <div className='most-recent-post py-4'>
            {recentPosts.map((post) => (
              <h1 key={post.slug}>{post.title}</h1>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}