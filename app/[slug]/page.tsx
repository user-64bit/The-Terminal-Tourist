import fs from "fs/promises";
import { MDXRemote } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import "./markdown.css";
import rehypePrettyCode from "rehype-pretty-code";
import path from "path";
import Loader from "@/components/Loader";
import { Suspense } from "react";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";

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
      <PageTransition>
        <article className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center text-sm text-[var(--link)] hover-underline-animation mb-6"
            >
              ← Back to all posts
            </Link>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 text-glow">{data.title}</h1>
            
            <div className="flex items-center text-gray-400 text-sm mb-4">
              {data.author && (
                <span className="flex items-center mr-4">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  {data.author}
                </span>
              )}
              
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                {formattedDate}
              </span>
            </div>
            
            {data.tags && data.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {data.tags.map((tag: string) => (
                  <span 
                    key={tag} 
                    className="text-xs px-2 py-1 rounded bg-[var(--code-bg)] text-[var(--secondary-highlight)]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            
            <div className="border-b border-[var(--border-color)] mb-8"></div>
          </div>
          
          <div className="slide-up markdown">
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
          
          <div className="mt-12 pt-6 border-t border-[var(--border-color)]">
            <Link 
              href="/"
              className="inline-flex items-center text-sm text-[var(--link)] hover-glow px-4 py-2 rounded-md bg-[var(--code-bg)]"
            >
              ← Back to all posts
            </Link>
          </div>
        </article>
      </PageTransition>
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
