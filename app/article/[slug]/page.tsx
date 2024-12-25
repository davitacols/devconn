import { notFound } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ThumbsUp, MessageSquare, Share2 } from 'lucide-react'

const article = {
  slug: 'the-future-of-ai-in-software-development',
  title: 'The Future of AI in Software Development',
  content: `
    <p>Artificial Intelligence (AI) is rapidly transforming various industries, and software development is no exception. As we move towards more intelligent and autonomous systems, AI is poised to revolutionize the way we design, build, and maintain software.</p>
    
    <h2>AI-Assisted Coding</h2>
    <p>One of the most immediate impacts of AI in software development is in the realm of coding assistance. AI-powered tools can analyze vast amounts of code and provide intelligent suggestions, auto-completions, and even generate entire code blocks based on natural language descriptions.</p>
    
    <h2>Automated Testing and Bug Detection</h2>
    <p>AI algorithms can significantly enhance the testing process by automatically generating test cases, predicting potential bugs, and even fixing simple issues without human intervention. This not only speeds up the development cycle but also improves the overall quality of the software.</p>
    
    <h2>Intelligent Project Management</h2>
    <p>AI can analyze project data, developer productivity, and code quality to provide insights for better project management. It can predict potential bottlenecks, optimize resource allocation, and even suggest the most efficient ways to structure teams and workflows.</p>
    
    <h2>Conclusion</h2>
    <p>As AI continues to evolve, its role in software development will only grow more significant. While it's unlikely to replace human developers entirely, AI will become an indispensable tool that enhances productivity, quality, and innovation in the software development process.</p>
  `,
  author: {
    name: 'Jane Doe',
    image: '/placeholder.svg?height=40&width=40'
  },
  date: '2023-06-01',
  readTime: '5 min read',
  tags: ['AI', 'Software Development', 'Future Tech']
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  if (params.slug !== article.slug) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-8 mb-8">
        <h1 className="text-4xl font-bold mb-6">{article.title}</h1>
        <div className="flex items-center space-x-4 mb-6">
          <Avatar>
            <AvatarImage src={article.author.image} alt={article.author.name} />
            <AvatarFallback>{article.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{article.author.name}</div>
            <div className="text-sm text-muted-foreground">
              {article.date} · {article.readTime}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
        <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
        <div className="flex justify-between items-center mt-8 pt-4 border-t">
          <div className="flex space-x-4">
            <Button variant="outline" size="sm">
              <ThumbsUp className="mr-2 h-4 w-4" />
              Like
            </Button>
            <Button variant="outline" size="sm">
              <MessageSquare className="mr-2 h-4 w-4" />
              Comment
            </Button>
          </div>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </Card>
    </div>
  )
}

