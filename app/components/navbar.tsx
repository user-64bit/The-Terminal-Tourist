'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 10);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Animation variants
	const logoVariants = {
		initial: { opacity: 0, y: -10 },
		animate: { 
			opacity: 1, 
			y: 0,
			transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }
		},
		hover: { 
			scale: 1.05,
			transition: { duration: 0.3 }
		}
	};

	const letterVariants = {
		initial: { opacity: 0 },
		animate: (i: number) => ({
			opacity: 1,
			transition: {
				delay: 0.5 + (i * 0.1),
				duration: 0.5
			}
		})
	};

	// Logo letters with individual animations
	const logoLetters = [
		{ letter: "T", accent: true, index: 0 },
		{ letter: "h", accent: false, index: 1 },
		{ letter: "e", accent: false, index: 2 },
		{ letter: " ", accent: false, index: 3 },
		{ letter: "T", accent: true, index: 4 },
		{ letter: "e", accent: false, index: 5 },
		{ letter: "r", accent: false, index: 6 },
		{ letter: "m", accent: false, index: 7 },
		{ letter: "i", accent: false, index: 8 },
		{ letter: "n", accent: false, index: 9 },
		{ letter: "a", accent: false, index: 10 },
		{ letter: "l", accent: false, index: 11 },
		{ letter: " ", accent: false, index: 12 },
		{ letter: "T", accent: true, index: 13 },
		{ letter: "o", accent: false, index: 14 },
		{ letter: "u", accent: false, index: 15 },
		{ letter: "r", accent: false, index: 16 },
		{ letter: "i", accent: false, index: 17 },
		{ letter: "s", accent: false, index: 18 },
		{ letter: "t", accent: false, index: 19 },
	];

	return (
		<>
			<motion.div 
				className={`border border-[var(--border-color)] sticky top-0 z-[99999] backdrop-blur-md transition-all duration-300 ${scrolled ? 'bg-opacity-90 shadow-md' : 'bg-opacity-70'} bg-[var(--navbar-bg)] flex justify-between items-center rounded-b-md`}
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
			>
				<div className="flex-grow"></div>
				<div className="flex justify-center flex-grow">
					<Link href={"/"}>
						<motion.h1 
							className='text-center text-2xl py-5 terminal-text'
							variants={logoVariants}
							initial="initial"
							animate="animate"
							whileHover="hover"
						>
							{logoLetters.map((item) => (
								<motion.span
									key={item.index}
									custom={item.index}
									variants={letterVariants}
									initial="initial"
									animate="animate"
									className={item.accent ? "text-[var(--highlight)] text-glow" : ""}
								>
									{item.letter}
								</motion.span>
							))}
						</motion.h1>
					</Link>
				</div>
				<div className="flex-grow flex justify-end">
					<motion.a 
						href="https://github.com/user-64bit/The-Terminal-Tourist" 
						target="_blank" 
						rel="noopener noreferrer"
						className="mr-4 transition-all duration-300"
						whileHover={{ scale: 1.1, rotate: 5 }}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.8 }}
					>
						<img
							src="/github-logo.png"
							className="w-10 opacity-70 hover:opacity-100"
							alt="GitHub Repository"
							title="View Source on GitHub"
						/>
					</motion.a>
				</div>
			</motion.div>
		</>
	)
}
