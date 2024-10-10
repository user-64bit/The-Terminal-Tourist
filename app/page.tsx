import Link from "next/link";
import { getPosts } from "@/components/helper";
export default async function Home() {
    const posts = await getPosts();
    return (
        <>
            <div className='pt-20 mb-auto'>
                <h1 className="text-center text-2xl pb-5 underline">Blogs</h1>
                <div className='flex justify-center'>
                    <ol className="">
                        {posts?.map(post =>
                            <li key={post.slug} className='text-sky-200 flex' title={post?.tooltip}>
                                <p className='mx-2 text-slate-400 text-nowrap'>{post.date}</p>
                                <p className="hover:underline"><Link href={"/" + post.slug + "/"}
                                >{post.title}</Link></p>
                            </li>
                        )}
                    </ol>
                </div>
            </div>
        </>
    )
}
