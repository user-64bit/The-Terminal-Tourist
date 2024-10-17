import Link from "next/link";

export default function Navbar() {
	return (
		<>
			<div className='border border-[#212529] sticky top-0 z-[99999] bg-black flex justify-between items-center'>
				<div className="flex-grow"></div>
				<div className="flex justify-center flex-grow">
					<Link href={"/"}>
						<h1 className='text-center text-2xl py-5'>
							<span className="text-red-500">T</span>he
							<span className="text-red-500">T</span>erminal
							<span className="text-red-500">T</span>ourist
						</h1>
					</Link>
				</div>
				<div className="flex-grow flex justify-end">
					<a href="https://github.com/user-64bit/The-Terminal-Tourist" target="_blank">
						<img
							src="/github-logo.png"
							className="w-12 pr-3"
							alt="github"
						/>
					</a>
				</div>
			</div>
		</>
	)
}
