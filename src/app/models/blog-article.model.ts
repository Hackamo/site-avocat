export interface BlogArticle {
	slug: string
	title: string
	summary: string
	content: string
	category: string
	date?: string
	similarSlugs?: string[]
}
