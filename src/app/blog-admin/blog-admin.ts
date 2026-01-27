import { Component, inject, signal, effect } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { BlogDataService, ArticleMetadata } from '../services/blog-data.service'

@Component({
	selector: 'app-blog-admin',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: './blog-admin.html',
	styleUrl: './blog-admin.scss',
})
export class BlogAdmin {
	private readonly fb = inject(FormBuilder)
	private readonly blogDataService = inject(BlogDataService)

	readonly articles = signal<ArticleMetadata[]>([])
	readonly loading = signal(false)
	readonly saving = signal(false)
	readonly message = signal('')
	readonly messageType = signal<'success' | 'error'>('success')

	readonly form = this.fb.group({
		slug: ['', [Validators.required, Validators.pattern(/^[a-z0-9-]+$/)]],
		title: ['', Validators.required],
		summary: ['', Validators.required],
		category: ['Conseils Juridiques', Validators.required],
		date: ['', Validators.required],
		markdownFile: ['', Validators.required],
		similarSlugs: [''],
	})

	readonly markdownFile = signal<File | null>(null)
	readonly showForm = signal(false)

	constructor() {
		effect(() => {
			this.loadArticles()
		})
	}

	private async loadArticles() {
		this.loading.set(true)
		try {
			const metadata = await this.blogDataService.getMetadata()
			this.articles.set(metadata)
		} catch (error) {
			this.showMessage('Erreur lors du chargement des articles', 'error')
		} finally {
			this.loading.set(false)
		}
	}

	onMarkdownFileSelected(event: Event) {
		const input = event.target as HTMLInputElement
		if (input.files && input.files[0]) {
			const file = input.files[0]
			this.markdownFile.set(file)
			this.form.patchValue({
				markdownFile: file.name,
			})
		}
	}

	async onSubmit() {
		if (this.form.invalid || !this.markdownFile()) {
			this.showMessage('Veuillez remplir tous les champs obligatoires', 'error')
			return
		}

		this.saving.set(true)
		try {
			const formValue = this.form.value
			const newArticle: ArticleMetadata = {
				slug: formValue.slug!,
				title: formValue.title!,
				summary: formValue.summary!,
				category: formValue.category!,
				date: formValue.date!,
				markdownFile: formValue.markdownFile!,
				similarSlugs: formValue.similarSlugs ? formValue.similarSlugs.split(',').map((s) => s.trim()) : [],
			}

			// Upload markdown file
			await this.uploadMarkdownFile(this.markdownFile()!)

			// Update metadata
			const currentArticles = this.articles()
			const updatedArticles = [...currentArticles, newArticle]
			await this.blogDataService.updateMetadata(updatedArticles)

			this.articles.set(updatedArticles)
			this.form.reset({
				category: 'Conseils Juridiques',
			})
			this.markdownFile.set(null)
			this.showForm.set(false)

			this.showMessage('Article créé avec succès!', 'success')
		} catch (error) {
			this.showMessage("Erreur lors de la création de l'article", 'error')
		} finally {
			this.saving.set(false)
		}
	}

	private async uploadMarkdownFile(file: File) {
		const formData = new FormData()
		formData.append('file', file)

		const response = await fetch('api/upload-blog-file', {
			method: 'POST',
			body: formData,
		})

		if (!response.ok) {
			throw new Error('Failed to upload markdown file')
		}
	}

	async deleteArticle(slug: string) {
		if (!confirm('Êtes-vous sûr de vouloir supprimer cet article?')) {
			return
		}

		this.saving.set(true)
		try {
			const updatedArticles = this.articles().filter((article) => article.slug !== slug)
			await this.blogDataService.updateMetadata(updatedArticles)
			this.articles.set(updatedArticles)
			this.showMessage('Article supprimé avec succès!', 'success')
		} catch (error) {
			this.showMessage("Erreur lors de la suppression de l'article", 'error')
		} finally {
			this.saving.set(false)
		}
	}

	private showMessage(text: string, type: 'success' | 'error') {
		this.message.set(text)
		this.messageType.set(type)
		setTimeout(() => this.message.set(''), 4000)
	}

	toggleForm() {
		this.showForm.update((show) => !show)
		if (!this.showForm()) {
			this.form.reset({
				category: 'Conseils Juridiques',
			})
			this.markdownFile.set(null)
		}
	}
}
