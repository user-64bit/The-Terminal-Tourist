import Link from "next/link";

export default function Navbar() {
	return (
		<>
			<div className='border sticky top-0 z-50 bg-[#212529]'>
				<h1 className='text-center text-2xl'>notfalsecoder</h1>
				<ul className='flex justify-center py-2'>
					<li className='me-2'><Link href={"/"}>Home</Link></li>
					<li className='me-2'><Link href={"/projects"}>Projects</Link></li>
					<li className='me-2'><Link href={"/blog"}>Blog</Link></li>
					<li className=''><Link href={"/about"}>About</Link></li>
				</ul>
			</div>
		</>
	)
}
