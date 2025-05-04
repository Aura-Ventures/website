// const BASE_URL = 'http://192.168.50.228:9416';
const BASE_URL = 'https://lets-pray-qa.zeabur.app';

export const decodeShare = async (ticket: string) => {
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
