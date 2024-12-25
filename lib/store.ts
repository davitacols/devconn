import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
  likes: number;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: Date;
}

class Store {
  private users: User[] = [];
  private posts: Post[] = [];
  private comments: Comment[] = [];

  constructor(initialData?: { users?: User[]; posts?: Post[]; comments?: Comment[] }) {
    if (initialData) {
      this.users = initialData.users || [];
      this.posts = initialData.posts || [];
      this.comments = initialData.comments || [];
    }
  }

  addUser(name: string, email: string, password: string): User {
    if (this.users.some(user => user.email === email)) {
      throw new Error(`User with email ${email} already exists.`);
    }

    const user: User = { id: uuidv4(), name, email, password };
    this.users.push(user);
    return user;
  }

  getUser(email: string): User | null {
    return this.users.find(user => user.email === email) || null;
  }

  getUserById(id: string): User | null {
    return this.users.find(user => user.id === id) || null;
  }

  addPost(title: string, content: string, authorId: string): Post {
    const author = this.getUserById(authorId);
    if (!author) {
      throw new Error(`Author with ID ${authorId} not found.`);
    }

    const post: Post = { id: uuidv4(), title, content, authorId, createdAt: new Date(), likes: 0 };
    this.posts.push(post);
    return post;
  }

  getPosts(): Post[] {
    return this.posts;
  }

  getPost(id: string): Post | null {
    return this.posts.find(post => post.id === id) || null;
  }

  updatePost(id: string, title: string, content: string): Post | null {
    const post = this.posts.find(p => p.id === id);
    if (!post) {
      throw new Error(`Post with ID ${id} not found.`);
    }

    post.title = title;
    post.content = content;
    return post;
  }

  addComment(postId: string, userId: string, content: string): Comment {
    const post = this.getPost(postId);
    if (!post) {
      throw new Error(`Post with ID ${postId} not found.`);
    }

    const user = this.getUserById(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found.`);
    }

    const comment: Comment = { id: uuidv4(), postId, userId, content, createdAt: new Date() };
    this.comments.push(comment);
    return comment;
  }

  getComments(postId: string): Comment[] {
    const post = this.getPost(postId);
    if (!post) {
      throw new Error(`Post with ID ${postId} not found.`);
    }

    return this.comments.filter(comment => comment.postId === postId);
  }

  likePost(id: string): void {
    const post = this.getPost(id);
    if (!post) {
      throw new Error(`Post with ID ${id} not found.`);
    }

    post.likes += 1;
  }
}

export const store = new Store();

// Add some initial data
store.addUser('John Doe', 'john@example.com', 'password123');
store.addUser('Jane Smith', 'jane@example.com', 'password456');

const johnId = store.getUser('john@example.com')?.id!;
const janeId = store.getUser('jane@example.com')?.id!;

store.addPost('Getting Started with Next.js', 'Next.js is a powerful React framework...', johnId);
store.addPost('The Future of AI in Web Development', 'AI is revolutionizing the way we build web applications...', janeId);
