import { useState } from 'react';

function ProductImages({ images }: { images: string[] }) {
  const [currentImage, setCurrentImage] = useState(images.at(0));

  return (
    <>
      <img
        className="w-[min(100%,_500px)] aspect-square pt-8 object-contain border border-zinc-500"
        src={currentImage}
        alt={currentImage}
      />
      <ul className="flex gap-1 justify-center">
        {images.map((image) => (
          <li
            key={image}
            className="w-20 h-20 aspect-square border border-zinc-500"
            onClick={() => setCurrentImage(image)}
          >
            <img className="w-full h-full object-contain" src={image} alt="" />
          </li>
        ))}
      </ul>
    </>
  );
}

export default ProductImages;
