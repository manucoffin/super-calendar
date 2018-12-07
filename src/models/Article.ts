import { User } from '@/models/User';
import { Comment } from '@/models/Comment';

export interface Article {
  id: string;
  title: string;
  content: string;
  author: User;
  created_at: string;
  comments: Comment[];
}
