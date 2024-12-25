"use client"

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { store, Article } from '@/lib/store'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [searchResults, setSearchResults] = useState<Article[]>([])
  const [searchQuery, setSearchQuery] = useState(query)

  useEffect(() => {
    setSearchResults(store.searchArticles(query))
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchResults(store.searchArticles(searchQuery))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Search Articles</h1>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <Input
            type="search"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit">Search</Button>
        </div>
      </form>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {searchResults.map((article) => (
          <Card key={article.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{article.content.substring(0, 100)}...</p>
            </CardContent>
            <CardFooter className="flex justify-between mt-auto">
              <div className="text-sm text-muted-foreground">
                {new Date(article.createdAt).toLocaleDateString()}
              </div>
              <Link href={`/article/${article.id}`}>
                <Button variant="ghost">Read More</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      {searchResults.length === 0 && (
        <p className="text-center text-muted-foreground">No results found.</p>
      )}
    </div>
  )
}

