import axios from 'axios';

export default async function generateProductImages(limit = 30) {
  const response = await axios.get('https://picsum.photos/v2/list', {
    params: {
      limit,
    },
  });

  return response.data;
}
