import { Button, Container, Title, Text } from '@mantine/core';
import Link from 'next/link';


export function DashboardHero() {
  return (
    <div className="w-full -mt-10">
      <img src="/hero.png" alt="Hero" className="w-full h-full object-cover" />
      <div className='flex flex-col content-center justify-center items-center mt-5'>
      <Link href="/athlete/browse" >
        <Button variant="filled" color="orange" size="xl" radius="md">Browse Slots</Button>
      </Link>

      </div>
      
      

    </div>
  );
}
