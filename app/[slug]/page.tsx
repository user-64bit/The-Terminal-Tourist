import fs from "fs/promises";
import { MDXRemote } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import "./markdown.css";
import rehypePrettyCode from "rehype-pretty-code";
import path from "path";
import Loader from "@/components/Loader";
import { Suspense } from "react";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
};

export default async function BlogPage({ params }: { params: { slug: string } }) {
  const useless = params.slug?.split(".")[1]
  if ([".ico", ".png", ".jpg", "gif"].includes(useless)) {
    return null;
  }

  const abs_path = path.resolve("content");
  const filename = `${abs_path}/${params.slug}/index.md`;

  const file = await fs.readFile(filename, "utf-8");
  const { content, data } = matter(file);

  const formattedDate = formatDate(data.date);

  return (
    <Suspense fallback={<Loader />}>
      <div className="ms-14 me-10">
        <h1 className="pt-4 pb-2 text-3xl text-white font-bold">{data.title}</h1>
        <p className="opacity-45">
          <span>{data.author} / </span>
          <span>{formattedDate}</span>
        </p>
        <hr className="pb-10" />
        <div className="">
          <div className="markdown">
            <MDXRemote
              source={content}
              options={{
                mdxOptions: {
                  remarkPlugins: [],
                  // @ts-ignore
                  rehypePlugins: [[rehypePrettyCode, {
                    theme: 'one-dark-pro'
                  }]],
                }
              }}
            />
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export async function generateStaticParams() {
  const abs_path = path.resolve("content")
  const entries = await fs.readdir(abs_path, { withFileTypes: true });
  const dirs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  return dirs.map((dir) => ({ slug: dir }));
}
