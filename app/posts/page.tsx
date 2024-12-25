import { PostList } from '@/components/PostList'

export default function PostsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>
      <PostList />
    </div>
  )
}

