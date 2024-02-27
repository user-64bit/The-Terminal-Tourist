import Link from "next/link";

export default function Navbar() {
	return (
		<>
			<div className='border sticky top-0 z-50 bg-[#212529]'>
				<Link href={"/"}>
					<h1 className='text-center text-2xl py-5'>
						<span className="text-red-500">T</span>he
						<span className="text-red-500">T</span>erminal
						<span className="text-red-500">T</span>ourist</h1>
				</Link>
			</div>
		</>
	)
}
