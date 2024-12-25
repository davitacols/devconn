export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
}

export const posts: Post[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js',
    excerpt: 'Learn how to build modern web applications with Next.js',
    content: 'Next.js is a powerful React framework that makes it easy to build server-side rendered and statically generated web applications. In this post, we'll explore the basics of setting up a Next.js project and creating your first pages.',
    author: 'Jane Doe',
    date: '2023-05-15',
  },
  {
    id: '2',
    title: 'The Future of AI in Web Development',
    excerpt: 'Exploring the potential impact of AI on the web development industry',
    content: 'Artificial Intelligence is rapidly changing various industries, and web development is no exception. From AI-powered design tools to intelligent code completion, we'll dive into how AI is shaping the future of web development.',
    author: 'John Smith',
    date: '2023-05-20',
  },
  {
    id: '3',
    title: 'Mastering CSS Grid Layout',
    excerpt: 'A comprehensive guide to using CSS Grid for modern layouts',
    content: 'CSS Grid Layout is a powerful tool that allows web developers to create complex, responsive layouts with ease. In this comprehensive guide, we'll cover everything from basic grid concepts to advanced layout techniques.',
    author: 'Emily Johnson',
    date: '2023-05-25',
  },
];

