// const BASE_URL = 'http://10.1.16.94:9416';

const DEPLOY_ENV = import.meta.env.PUBLIC_DEPLOY_ENV || 'prod';

const BASE_URL = DEPLOY_ENV === 'prod' ? 'https://api.auraofhope.com' : 'https://lets-pray-qa.zeabur.app';

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
    const response = await fetch(`${BASE_URL}/public/ticket`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
