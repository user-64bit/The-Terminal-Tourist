import { promises as fs } from "fs";
import matter from "gray-matter";
import path from "path";

export type Post = {
	slug: string; 
	title?: string; 
	date?: string; 
	tooltip?: string; 
	author?: string;
	description?: string;
	tags?: string[];
}

export async function getPosts() {
	const abs_path = path.resolve("content")
	const entries = await fs.readdir(abs_path, { withFileTypes: true });

	const dirs = entries
		.filter((entry) => entry.isDirectory())
		.map((entry) => entry.name);

	const fileContents = await Promise.all(
		dirs.map((dir) => fs.readFile(abs_path + "/" + dir + "/index.md", "utf8"))
	);

	const posts: Array<Post> = dirs.map((slug, i) => {
		const fileContent = fileContents[i];
		const { data } = matter(fileContent);
		return { slug, ...data };
	});
	posts.sort((a, b) => {
		return Date.parse(a.date || "") < Date.parse(b.date || "") ? 1 : -1;
	})
	return posts;
}