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
                        {posts?.map(e =>
                            <li key={e.slug} className='text-sky-200' title={e?.tooltip}>
                                <span className='mx-2 text-slate-400'>{e.date}</span>
                                <span className="hover:underline"><Link href={e.slug}>{e.title}</Link></span>
                            </li>
                        )}
                    </ol>
                </div>
            </div>
        </>
    )
}
