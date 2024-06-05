import Link from 'next/link';
import { IconArrowRight } from '@tabler/icons-react';

const PostNewOfferButton = () => {
  return (
    <Link href="/vendor/create-offering" className="group relative inline-block w-full" passHref>
        <div className="border-2 rounded-md border-orange-500 text-orange-500 font-bold text-3xl py-8 px-6 w-full flex items-center justify-between group transition-transform transform group-hover:scale-105 group-hover:bg-orange-100">
            Post New Offer
            <div className="flex items-center transition-transform transform group-hover:translate-x-4">
            <IconArrowRight size={32}  className='bg-color-orange-500'/>
            </div>
        </div>
    </Link>
  );
};

export default PostNewOfferButton;
