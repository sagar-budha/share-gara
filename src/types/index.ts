
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  isPro: boolean;
}

export interface File {
  id: string;
  userId: string;
  name: string;
  size: number;
  type: string;
  url: string;
  createdAt: Date;
  expiresAt?: Date | null;
  shareId?: string | null;
  shared: boolean;
}

export type SortOption = 'name' | 'date' | 'size';
export type ViewOption = 'grid' | 'list';
export type Plan = 'free' | 'pro';

export const FILE_SIZE_LIMIT = {
  FREE: 200 * 1024 * 1024, // 200MB
  PRO: 10 * 1024 * 1024 * 1024 // 10GB
};
