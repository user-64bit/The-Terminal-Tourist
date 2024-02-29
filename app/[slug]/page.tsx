import { promises as fs } from "fs";
import { MDXRemote } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import "./markdown.css";
import rehypePrettyCode from "rehype-pretty-code";
import path from "path";
import Loader from "@/components/Loader";
import { Suspense } from "react";

export default async function BlogPage({ params }: { params: { slug: string } }) {
    if (params.slug === "favicon.ico") {
        return;
    }
    const abs_path = path.resolve("content")
    const filename = `${abs_path}/${params.slug}/index.md`;

    const file = await fs.readFile(filename, "utf-8")
    const { content, data } = matter(file);
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let date = new Date(data.date);
    return (
        <Suspense fallback={<Loader />}>
            <article className="ms-14 me-10">
                <h1 className="pt-4 pb-2 text-3xl text-white font-bold">{data.title}</h1>
                <p className="opacity-45">
                    <span>{data.auther}/</span>
                    <span>{months[date.getMonth()] + " " + date.getDate() + "," + date.getFullYear()}</span>
                </p>
                <hr className="pb-10" />
                <div className="">
                    <div className="markdown">
                        <MDXRemote source={content} options={{
                            mdxOptions: {
                                remarkPlugins: [],
                                // @ts-ignore
                                rehypePlugins: [[rehypePrettyCode, {
                                    theme: 'one-dark-pro'
                                }]],
                            }
                        }} />
                    </div>
                </div>
            </article>
        </Suspense>
    )
}
