"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { store, Article } from '@/lib/store'

export default function DashboardPage() {
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    // In a real app, we would fetch the user's articles from an API
    // For this example, we'll just use all articles
    setArticles(store.getArticles())
  }, [])

  const totalViews = articles.reduce((sum, article) => sum + (article.views || 0), 0)
  const totalLikes = articles.reduce((sum, article) => sum + article.likes, 0)
  const totalComments = articles.reduce((sum, article) => sum + (store.getComments(article.id).length || 0), 0)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Author Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalViews}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Likes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalLikes}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalComments}</p>
          </CardContent>
        </Card>
      </div>
      <h2 className="text-2xl font-bold mt-12 mb-4">Your Articles</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Card key={article.id}>
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">Views: {article.views || 0}</p>
              <p className="text-muted-foreground mb-2">Likes: {article.likes}</p>
              <p className="text-muted-foreground">Comments: {store.getComments(article.id).length || 0}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

