// components/RandomImage.js
import Image from 'next/image';

const imageLinks = [
  "https://duelkbjyxfgctjrijjoe.supabase.co/storage/v1/object/public/public-storage/random/jannes-glas-0NaQQsLWLkA-unsplash.jpg?t=2024-06-08T19%3A43%3A32.081Z",
  "https://duelkbjyxfgctjrijjoe.supabase.co/storage/v1/object/public/public-storage/random/kenny-eliason-6mRaiW6DDCM-unsplash.jpg?t=2024-06-08T19%3A43%3A38.863Z",
  "https://duelkbjyxfgctjrijjoe.supabase.co/storage/v1/object/public/public-storage/random/kevin-turcios-qxCGBwR-L8A-unsplash.jpg?t=2024-06-08T19%3A43%3A47.267Z",
  "https://duelkbjyxfgctjrijjoe.supabase.co/storage/v1/object/public/public-storage/random/leah-hetteberg-IoJFOvbqF3c-unsplash.jpg?t=2024-06-08T19%3A43%3A59.503Z",
  "https://duelkbjyxfgctjrijjoe.supabase.co/storage/v1/object/public/public-storage/random/leah-hetteberg-Q-Qd44h6DZU-unsplash.jpg?t=2024-06-08T19%3A44%3A07.959Z",
  "https://duelkbjyxfgctjrijjoe.supabase.co/storage/v1/object/public/public-storage/random/pexels-img_1979-stevonka-379280-2116469.jpg?t=2024-06-08T19%3A44%3A17.580Z",
  "https://duelkbjyxfgctjrijjoe.supabase.co/storage/v1/object/public/public-storage/random/pexels-olly-3755440.jpg?t=2024-06-08T19%3A44%3A24.399Z",
  "https://duelkbjyxfgctjrijjoe.supabase.co/storage/v1/object/public/public-storage/random/vince-fleming-aZVpxRydiJk-unsplash.jpg?t=2024-06-08T19%3A41%3A34.275Z"
];

function getRandomImage() {
  const randomIndex = Math.floor(Math.random() * imageLinks.length);
  return imageLinks[randomIndex];
}

const RandomImage = () => {
  const randomImage = getRandomImage();

  return (
    <div className="relative w-full h-full">
      <Image src={randomImage} alt="Background" layout="fill" objectFit="cover" />
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-4">
        <div className="text-4xl md:text-6xl font-bold text-white">WELCOME TO</div>
        <div className="text-6xl md:text-8xl font-extrabold mt-2 text-orange-500">SPORTSCAPE</div>
      </div>
    </div>
  );
};

export default RandomImage;
