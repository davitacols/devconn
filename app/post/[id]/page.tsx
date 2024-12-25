import { posts } from '@/app/lib/posts'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PostPage({ params }: { params: { id: string } }) {
  const post = posts.find(p => p.id === params.id)

  if (!post) {
    notFound()
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-4xl mb-4">{post.title}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground mb-8">
          <span>{post.author}</span>
          <span className="mx-2">·</span>
          <span>{post.date}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose dark:prose-invert lg:prose-xl">
          {post.content}
        </div>
      </CardContent>
    </Card>
  )
}

import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { store } from '@/lib/store'

export default function PostPage({ params }: { params: { id: string } }) {
  const post = store.getPost(params.id)

  if (!post) {
    notFound()
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-4xl mb-4">{post.title}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground mb-8">
          <span>{store.getUserById(post.authorId)?.name || 'Unknown Author'}</span>
          <span className="mx-2">·</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose dark:prose-invert lg:prose-xl" dangerouslySetInnerHTML={{ __html: post.content }} />
      </CardContent>
    </Card>
  )
}

