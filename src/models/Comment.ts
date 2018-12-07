import { User } from '@/models/User';

export interface Comment {
  id: string;
  content: string;
  author: User;
  created_at: string;
}
