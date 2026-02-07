export interface AuthorBio {
	name: string
	title: string
	bio: string
	image?: string
}

export interface BlogArticle {
	slug: string
	title: string
	summary: string
	content: string
	category: string
	date?: string
	similarSlugs?: string[]
	readingTime?: number
	author?: AuthorBio
	image?: string
}
