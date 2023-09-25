import axios from 'axios';

export default async function () {
  const owner = 'ServiceStack';
  const repo = 'images';
  const path = 'hero';
  const token = import.meta.env.VITE_GITHUB_API_ACCESS_TOKEN;

  console.log('token', token);

  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        headers: {
          Authorization: `token ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const files = response.data.filter(
      (item: { type: string }) => item.type === 'file'
    );

    if (files.length === 0) {
      console.log('Ah, no files to be found!');
      return;
    }

    const randomIndex = Math.floor(Math.random() * files.length);
    const randomFile = files[randomIndex];
    const imagePath = `https://raw.githubusercontent.com/${owner}/${repo}/master/${path}/${randomFile.name}`;

    return imagePath;
  } catch (error) {
    throw new Error("Couldn't fetch random image");
  }
}
