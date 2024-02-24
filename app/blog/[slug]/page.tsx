import { promises as fs } from "fs";
import { MDXRemote } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import "./markdown.css";
import rehypePrettyCode from "rehype-pretty-code";
import overnight from "overnight/themes/Overnight-Slumber.json";
import path from "path";

export default async function Page({ params }: { params: { slug: string } }) {
    const abs_path = path.resolve("public")
    const filename = `${abs_path}/${params.slug}/index.md`;
    const file = await fs.readFile(filename, "utf-8")
    const { content, data } = matter(file);

    return (
        <article className="px-10">
            <h1 className="text-center py-4 text-3xl underline text-red-500">{data.title}</h1>
            <div className="">
                <div className="markdown">
                    <MDXRemote source={content} options={{
                        mdxOptions:{
                            remarkPlugins: [],
                            // @ts-ignore
                            rehypePlugins: [[rehypePrettyCode, {theme:overnight}]],
                        }
                    }}/>
                </div>
            </div>
        </article>
    )
}