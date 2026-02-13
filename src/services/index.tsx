// API Configuration from environment variables
const API_BASE_URL = import.meta.env.PUBLIC_API_BASE_URL || 'https://api.auraofhope.com';
const APP_VERSION = import.meta.env.PUBLIC_APP_VERSION; // 设置为 "2.8.0" 访问 stage 环境

export interface User {
  id?: number;
  fullName?: string;
  avatarUrl?: string;
  steaks?: number;
}

export interface DevotionalComment {
  id: number;
  createdAt: string;
  content: string;
  userName: string;
  userAvatar: string;
  likes: number;
  liked?: boolean;
  user: User;
  parentId?: number;
  devotionalId?: number;
  repliesCount?: number;
}

/** decodeShare 返回的数据结构，评论从 data.comments 获取 */
export interface DecodeShareData {
  data?: {
    id?: number;
    closing?: string;
    comments?: DevotionalComment[];
    [key: string]: unknown;
  };
  shareUser?: { avatarUrl?: string; fullName?: string };
  [key: string]: unknown;
}

export const decodeShare = async (ticket: string): Promise<DecodeShareData | null> => {
  if (!ticket) return null;
  try {
    const response = await fetch(`${API_BASE_URL}/public/ticket`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(APP_VERSION && { 'X-App-Version': APP_VERSION }),
      },
      body: JSON.stringify({ ticket }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
