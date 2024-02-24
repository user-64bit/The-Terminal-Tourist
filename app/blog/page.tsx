import Link from "next/link";
import { getPosts } from "@/components/helper";

export default async function Blog() {
    const posts = await getPosts();
    return (
        <>
            <div className='py-10 mb-auto'>
                <div className='flex justify-center'>
                    <ul>
                        {posts.map(e =>
                            <li key={e.slug} className='text-sky-200'>
                                <span className='mx-2 text-slate-400'>{e.date}</span>
                                <Link href={"blog/" + e.slug}>{e.title}</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </>
    )
}
