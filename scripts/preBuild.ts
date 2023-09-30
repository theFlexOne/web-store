import fs from 'fs';
import path from 'path';

const IMAGE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];

type Config = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

function createConfig() {
  const config = addHeroImages();
  console.log('config', config);

  fs.rmSync(path.join('src', 'config.json'), { force: true });
  fs.writeFileSync(
    path.join('src', 'config.json'),
    JSON.stringify(config, null, 2)
  );
}

function addHeroImages(config: Config = {}): Config {
  const heroesDirPath = path.join('public', 'images', 'heroes');
  const heroesDir = fs.readdirSync(heroesDirPath).filter((file) => {
    const fileExtension = file.split('.').pop();
    return IMAGE_TYPES.includes(fileExtension || '');
  });

  config.heroImages = [...heroesDir];
  return config;
}

createConfig();
