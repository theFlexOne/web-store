import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { heroImages } from '../../config.json';

const HERO_IMAGES_DIR = 'images/heroes/';

function Hero({ image: imageUrl }: { image?: string }) {
  const [image, setImage] = useState<string | undefined>(imageUrl);
  const heroRef = useRef<HTMLImageElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (image) return;
    function getRandomImage() {
      const randomIndex = Math.floor(Math.random() * heroImages.length);
      const randomImage = heroImages[randomIndex];
      const imagePath = `${HERO_IMAGES_DIR}${randomImage}`;
      return imagePath;
    }
    setImage(getRandomImage());
    setInterval(() => {
      const randomImage = getRandomImage();
      setImage(randomImage);
    }, 20000);
  }, [image]);
  useEffect(() => {
    if (heroRef.current) {
      heroRef.current.style.filter = 'brightness(0.5)';
    }
  }, [heroRef]);

  return (
    <section
      className={`relative aspect-[2.745/1] bg-contain bg-center after:absolute after:inset-0 after:bg-black after:opacity-50 after:z-10`}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
      }}
    >
      <div className="absolute z-20 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-white items-center flex flex-col">
        <h2 className="text-4xl font-medium mt-10">Reel in the Adventure</h2>
        <p className="font-normal">Gear That Makes Every Cast Count</p>
        <button
          onClick={() => navigate('/shop')}
          className="mt-10 px-6 py-3 border-2 w-fit rounded ring-amber-500 hover:glow-sm bg-transparent transition-all duration-200 ease-in-out"
        >
          SHOP NOW!
        </button>
      </div>
      {/* <div className="absolute inset-0 -z-10 bg-black" /> */}
    </section>
  );
}

export default Hero;
