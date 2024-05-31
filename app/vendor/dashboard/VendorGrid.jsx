'use client'

import { useEffect, useState } from 'react';
import { Grid, Container, Text, Card, Group, Button, Drawer, Burger, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { createClient } from '@/utils/supabase/client';
import Avatar from '@/components/Avatar';
import Link from 'next/link';
import { IconPlus, IconEdit, IconLogout } from '@tabler/icons-react';

export function VendorGrid() {
  const supabase = createClient();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [opened, { toggle, close }] = useDisclosure(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile, error } = await supabase
          .from('profile')
          .select('id, picture_url, name')
          .eq('id', user.id)
          .single();
        if (error) {
          console.error(error);
        } else {
          setUser(profile);
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, [supabase]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <div className="flex items-center justify-center h-screen">No user found</div>;
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <div className='w-full p-10 mt-10'>
      <Grid gutter="xs">
        <Grid.Col span={{ base: 12, xs: 4 }}>
        <Card shadow="lg" p="lg" className="bg-white rounded-lg shadow-lg p-6 transition duration-300 hover:shadow-xl transform hover:-translate-y-1">
          <div className="flex flex-col items-center space-y-4">
            <Avatar uid={user.id} url={`https://duelkbjyxfgctjrijjoe.supabase.co/storage/v1/object/public/avatars/${user.picture_url}`} size={150} editingAllowed={false} />
            <div className="w-full bg-orange-600 p-4 rounded-b-lg">
              <h1 className="text-2xl font-bold text-white text-center">{user.name}</h1>
            </div>
          </div>
        </Card>

        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 8 }} className="">
            <div  className='hidden lg:flex mt-[180px]  justify-end gap-12 px-20' >
              <Link href="/vendor/create-offering" passHref className='flex gap-1 text-orange-500 text-md font-bold text-justify items-end hover:text-blue-500 hover:scale-105'>
                <IconPlus />
                Create New Offering
              </Link>
              <Link href="/edit-profile" passHref className='flex gap-1 text-orange-500 text-md font-bold text-justify items-end hover:text-blue-500 hover:scale-105'>
                <IconEdit />
                Edit Profile
              </Link>
              <Button
                onClick={handleSignOut}
                className="bg-orange-500 hover:bg-blue-600 transition-transform transform hover:scale-105"
              >
                <IconLogout />
                Sign Out
              </Button>
            </div>
        </Grid.Col>


        <Grid.Col span={{ base: 12, xs: 8 }}>
          <Card shadow="md" p="lg" className="bg-white rounded-lg shadow-lg p-4 transition duration-300 hover:shadow-xl">
            <Text>Other content</Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}>
          <Card shadow="md" p="lg" className="bg-white rounded-lg shadow-lg p-4 transition duration-300 hover:shadow-xl">
            <Text>Other content</Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 3 }}>
          <Card shadow="md" p="lg" className="bg-white rounded-lg shadow-lg p-4 transition duration-300 hover:shadow-xl">
            <Text>Other content</Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 3 }}>
          <Card shadow="md" p="lg" className="bg-white rounded-lg shadow-lg p-4 transition duration-300 hover:shadow-xl">
            <Text>Other content</Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6 }}>
          <Card shadow="md" p="lg" className="bg-white rounded-lg shadow-lg p-4 transition duration-300 hover:shadow-xl">
            <Text>Other content</Text>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Mobile Menu */}
      <div className="block lg:hidden fixed top-4 left-4">
        <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" />
      </div>
      <Drawer
        opened={opened}
        onClose={close}
        title="Menu"
        padding="xl"
        size="xl"
        className="lg:hidden"
      >
        <Stack spacing="sm">
          <Link href="/create-offering" passHref className='text-left'>
            <Button
              component="a"
              leftIcon={<IconPlus />}
              className="bg-orange-500 hover:bg-blue-600 transition-transform transform hover:scale-105"
            >
              Create New Offering
            </Button>
          </Link>
          <Link href="/edit-profile" passHref>
            <Button
              component="a"
              leftIcon={<IconEdit />}
              className="bg-orange-500 hover:bg-blue-600 transition-transform transform hover:scale-105"
            >
              Edit Profile
            </Button>
          </Link>
          <Button
            onClick={handleSignOut}
            leftIcon={<IconLogout />}
            className="bg-orange-500 hover:bg-blue-600 transition-transform transform hover:scale-105"
          >
            Sign Out
          </Button>
        </Stack>
      </Drawer>
    </div>
  );
}
