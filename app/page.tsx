import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { 
  Bookmark, 
  TrendingUp, 
  Star, 
  Calendar, 
  Flame,
  Code,
  MessageSquare,
  Users,
  Video,
  Book,
  Brain,
  Terminal,
  Server,
  Database,
  Layout,
  Mobile,
  Cloud,
  Shield,
  Share2,
  ThumbsUp
} from 'lucide-react';
import { store } from '@/lib/store';

export default function Home() {
  const recentPosts = [
    {
      id: 1,
      title: "Understanding React Server Components: A Deep Dive",
      author: "Jessica Chen",
      avatar: "/avatars/jessica.jpg",
      date: "Mar 25, 2024",
      content: "React Server Components represent a paradigm shift in how we build React applications. In this comprehensive guide, we'll explore the architecture, benefits, and practical implementations...",
      category: "React",
      readTime: 8,
      likes: 342,
      comments: 56
    },
    {
      id: 2,
      title: "Microservices vs Monoliths: Making the Right Choice",
      author: "David Kumar",
      avatar: "/avatars/david.jpg",
      date: "Mar 24, 2024",
      content: "The debate between microservices and monolithic architectures continues to evolve. Let's analyze the trade-offs, consider specific use cases, and develop a framework for making this crucial decision...",
      category: "Architecture",
      readTime: 12,
      likes: 289,
      comments: 43
    },
    {
      id: 3,
      title: "Building Scalable Systems with Rust",
      author: "Maria Rodriguez",
      avatar: "/avatars/maria.jpg",
      date: "Mar 24, 2024",
      content: "Rust's unique ownership model and zero-cost abstractions make it an excellent choice for building high-performance systems. We'll explore real-world examples and best practices...",
      category: "Rust",
      readTime: 15,
      likes: 567,
      comments: 89
    },
    {
      id: 4,
      title: "Machine Learning Ops: From Theory to Production",
      author: "Alex Thompson",
      avatar: "/avatars/alex.jpg",
      date: "Mar 23, 2024",
      content: "Deploying machine learning models to production requires more than just good algorithms. Learn about the MLOps practices that ensure reliable and scalable AI systems...",
      category: "MLOps",
      readTime: 10,
      likes: 423,
      comments: 67
    }
  ];

  const learningPaths = [
    {
      title: 'Full-Stack Development',
      icon: <Code className="h-6 w-6" />,
      modules: 12,
      students: '2.5k',
      description: 'Master modern web development from frontend to backend',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
      duration: '3 months'
    },
    {
      title: 'Cloud Architecture',
      icon: <Cloud className="h-6 w-6" />,
      modules: 8,
      students: '1.8k',
      description: 'Design and implement scalable cloud solutions',
      technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
      duration: '2 months'
    },
    {
      title: 'AI & Machine Learning',
      icon: <Brain className="h-6 w-6" />,
      modules: 15,
      students: '3.2k',
      description: 'From fundamentals to advanced ML implementations',
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'scikit-learn'],
      duration: '4 months'
    }
  ];

  const upcomingEvents = [
    {
      title: 'Modern Frontend Architecture',
      type: 'Workshop',
      date: 'Tomorrow, 6 PM GMT',
      speaker: 'Sarah Wilson',
      company: 'Netflix',
      attendees: 128,
      duration: '2 hours',
      level: 'Intermediate'
    },
    {
      title: 'Building with Web Assembly',
      type: 'Tech Talk',
      date: 'Sat, 2 PM GMT',
      speaker: 'James Liu',
      company: 'Mozilla',
      attendees: 256,
      duration: '1 hour',
      level: 'Advanced'
    },
    {
      title: 'DevOps Best Practices',
      type: 'Panel Discussion',
      date: 'Next Tuesday, 7 PM GMT',
      speaker: 'Multiple Speakers',
      company: 'Various',
      attendees: 342,
      duration: '1.5 hours',
      level: 'All Levels'
    }
  ];

  const trendingTopics = [
    {
      name: 'Rust',
      posts: '2.3k',
      weeklyGrowth: '↑ 45%',
      trending: true
    },
    {
      name: 'Web3',
      posts: '1.8k',
      weeklyGrowth: '↑ 32%',
      trending: true
    },
    {
      name: 'AI',
      posts: '3.4k',
      weeklyGrowth: '↑ 67%',
      trending: true
    },
    {
      name: 'TypeScript',
      posts: '2.1k',
      weeklyGrowth: '↑ 28%',
      trending: true
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
          Where Tech Minds Connect
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Join our vibrant community of 50,000+ developers. Share knowledge, learn from experts, and accelerate your tech career.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600">
            Join Community
          </Button>
          <Button variant="outline" size="lg">
            Explore Content
          </Button>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="mb-16">
        <Card className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200 dark:divide-gray-700 text-center">
            <div className="px-4">
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">50K+</p>
              <p className="text-gray-600 dark:text-gray-300">Active Developers</p>
            </div>
            <div className="px-4">
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">10K+</p>
              <p className="text-gray-600 dark:text-gray-300">Technical Articles</p>
            </div>
            <div className="px-4">
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">5K+</p>
              <p className="text-gray-600 dark:text-gray-300">Questions Solved</p>
            </div>
            <div className="px-4">
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">100+</p>
              <p className="text-gray-600 dark:text-gray-300">Monthly Events</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Featured Section */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold">Featured Story</h2>
              <Button variant="secondary" size="sm">
                <Star className="h-4 w-4 mr-1" />
                Featured
              </Button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-white" />
                <div>
                  <p className="font-medium">Sarah Connor</p>
                  <p className="text-sm opacity-90">Principal Engineer at SpaceX</p>
                </div>
              </div>
              <h3 className="text-2xl font-bold">The Evolution of Distributed Systems</h3>
              <p className="opacity-90 text-lg">
                From monoliths to microservices to serverless - explore how distributed systems have evolved and what the future holds for cloud-native applications...
              </p>
              <div className="flex items-center gap-4 pt-4">
                <Button variant="secondary">Read Article</Button>
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-5 w-5" />
                  <span>1.2k</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>234</span>
                </div>
              </div>
            </div>
          </Card>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-500" />
                Trending Topics
              </h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {trendingTopics.map((topic) => (
                <Card key={topic.name} className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{topic.name}</h3>
                    {topic.trending && (
                      <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                        Trending
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{topic.posts} posts</p>
                  <p className="text-sm text-green-600 mt-1">{topic.weeklyGrowth} this week</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Popular Learning Paths</h2>
            <p className="text-gray-600 dark:text-gray-300">Structured courses to master modern technologies</p>
          </div>
          <Button variant="outline">View All Paths</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {learningPaths.map((path) => (
            <Card key={path.title} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  {path.icon}
                </div>
                <div>
                  <h3 className="font-bold">{path.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{path.duration}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{path.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {path.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {path.students} Students
                  </span>
                </div>
                <Button variant="outline" size="sm">Start Learning</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-8">
        <main className="col-span-12 lg:col-span-8">
          {/* Content Categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: <Book />, label: 'Articles', count: '10K+' },
              { icon: <MessageSquare />, label: 'Discussions', count: '5K+' },
              { icon: <Video />, label: 'Tutorials', count: '2K+' },
              { icon: <Users />, label: 'Communities', count: '500+' }
            ].map((category) => (
              <Card 
                key={category.label} 
                className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    {category.icon}
                  </div>
                  <span className="font-medium">{category.label}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{category.count}</span>
                </div>
              </Card>
            ))}
          </div>

          {/* Article Tabs */}
          <div className="flex gap-4 mb-8 border-b">
            <Button variant="ghost" className="font-medium">
              <Star className="h-4 w-4 mr-2" />
              For You
            </Button>
            <Button variant="ghost" className="font-medium">
              <Calendar className="h-4 w-4 mr-2" />
              Latest
            </Button>
          </div>

          {/* Articles */}
          <div className="space-y-8">
            {recentPosts.map((post) => (
              <article key={post.id} className="border-b pb-8">
                <div className="flex items-center gap-2 mb-3">
                  <Avatar className="h-6 w-6" />
                  <span className="text-sm">{post.author}</span>
                  <span className="text-sm text-gray-500">·</span>
                  <span className="text-sm text-gray-500">{post.date}</span>
                </div>
                <Link href={`/post/${post.id}`} className="group">
                  <h2 className="text-xl font-bold mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-300">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                    {post.content}
                  </p>
                </Link>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="secondary" size="sm">
                      {post.category}
                    </Button>
                    <span className="text-sm text-gray-500">{post.readTime} min read</span>
                  </div>
                  <Bookmark className="h-5 w-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
                </div>
              </article>
            ))}
          </div>
        </main>

        {/* Sidebar */}
        <aside className="hidden lg:block lg:col-span-4">
          <div className="sticky top-20 space-y-8">
            {/* Trending */}
            <Card className="p-6">
              <h2 className="flex items-center gap-2 font-bold mb-4">
                <TrendingUp className="h-5 w-5" />
                Trending on DevConn
              </h2>
              <div className="space-y-4">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="flex gap-4">
                    <span className="text-2xl font-bold text-gray-200">
                      0{index + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5" />
                        <span className="text-sm">Trending Author</span>
                      </div>
                      <h3 className="font-bold mt-1">
                        Trending Article Title {index + 1}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Topics */}
            <Card className="p-6">
              <h2 className="font-bold mb-4">Discover more of what matters to you</h2>
              <div className="flex flex-wrap gap-2">
                {['Programming', 'Data Science', 'Web Development', 'AI', 'DevOps', 'Mobile'].map((topic) => (
                  <Button key={topic} variant="outline" size="sm">
                    {topic}
                  </Button>
                ))}
              </div>
            </Card>

            {/* Newsletter */}
            <Card className="p-6">
              <h2 className="font-bold mb-2">Stay up to date</h2>
              <p className="text-sm text-gray-600 mb-4">Get the latest tech news delivered to your inbox</p>
              <div className="space-y-2">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full p-2 border rounded-md" 
                />
                <Button className="w-full">Subscribe</Button>
              </div>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
}