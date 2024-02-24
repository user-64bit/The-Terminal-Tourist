import Link from "next/link";
import { getPosts, Post } from "./components/helper";

export default async function Home() {
	const posts = await getPosts();
	let recentPosts: Post[] = posts;
	if (posts.length >= 3) {
		recentPosts = posts.slice(0, 3);
	}

	return (
		<>
			<div className="mx-auto max-w-5xl text-center">
				<div className='overflow-y-scroll no-scrollbar'>
					<div className='py-4'>
						<h2 className='text-2xl py-2'>Hi I'm Arth Prajapati</h2>
						<p className='w-3/4 mx-auto'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
							at dignissimos et molestias illum totam. Molestias voluptate sapiente
							tempore totam. Tempora, ipsum temporibus nostrum officiis hic est
							impedit explicabo deserunt et porro numquam, laborum eum quas magnam
							eligendi placeat natus voluptatem iste vel reprehenderit quia.</p>
					</div>

					<div className='py-4'>
						{recentPosts.map((e) => (
							<p key={e.slug} className='text-sky-200'>
								<span className='me-2 text-slate-400'>{e.date}</span>
								<Link href={"blog/" + e.slug}>{e.title}</Link>
							</p>
						))}
					</div>
				</div>
			</div>
		</>
	)
}