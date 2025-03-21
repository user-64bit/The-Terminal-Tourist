import Link from "next/link";
import { getPosts } from "@/components/helper";
import PageTransition from "@/components/PageTransition";
import AnimatedBlogCard from "@/components/AnimatedBlogCard";

export default async function Home() {
    const posts = await getPosts();
    
    return (
        <PageTransition>
            <div className="flex flex-col items-center mb-10">
                <div className="w-full max-w-3xl">
                    <h1 className="text-3xl mb-8 text-center text-glow terminal-text border-b-2 border-[var(--highlight)] pb-2 inline-block">
                        Latest Posts
                    </h1>
                    
                    <div className="mt-6 grid gap-6 w-full">
                        {posts?.length ? (
                            posts.map((post, index) => (
                                <AnimatedBlogCard 
                                    key={post.slug}
                                    post={post}
                                    index={index}
                                />
                            ))
                        ) : (
                            <div className="text-center py-10 text-gray-400">
                                <p className="mb-2">No posts found</p>
                                <p className="text-sm">Check back soon for new content!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
