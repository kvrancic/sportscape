'use client';

import { useEffect, useState } from 'react';
import { Grid, Container, Text, Card, Group, Button, Drawer, Burger, Stack, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { createClient } from '@/utils/supabase/client';
import Avatar from '@/components/Avatar';
import Link from 'next/link';
import { IconPlus, IconEdit, IconLogout } from '@tabler/icons-react';
import { StatsRing } from './StatsRing';
import NewOfferButton from './NewOfferButton';
import RequestAccordion from '@/components/RequestAccordion';
import CardGallery from './CardGallery';

export function VendorGrid() {
  const supabase = createClient();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState([]);
  const [requests, setRequests] = useState([]);
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

  useEffect(() => {
    const fetchStats = async () => {
      if (user) {
        const [{ count: availableCount }, { count: unavailableCount }, { count: requestsCount }] = await Promise.all([
          supabase
            .from('offering')
            .select('*', { count: 'exact' })
            .eq('vendor_id', user.id)
            .eq('is_available', true),
          supabase
            .from('offering')
            .select('*', { count: 'exact' })
            .eq('vendor_id', user.id)
            .eq('is_available', false),
          supabase
            .from('offer')
            .select('*', { count: 'exact' })
            .eq('vendor_id', user.id)
        ]);

        console.log('Data received: ' + availableCount + ' ' + unavailableCount + ' ' + requestsCount);

        setStatsData([
          { label: 'Available Offerings', stats: availableCount, progress: (availableCount / (availableCount + unavailableCount)) * 100 || 0, color: 'teal', icon: 'up' },
          { label: 'Unavailable Offerings', stats: unavailableCount, progress: (unavailableCount / (availableCount + unavailableCount)) * 100 || 0, color: 'red', icon: 'down' },
          { label: 'Received Requests', stats: requestsCount, progress: 100, color: 'blue', icon: 'down' },
        ]);
      }
    };

    fetchStats();
  }, [user, supabase]);

  useEffect(() => {
    const fetchRequests = async () => {
      const { data, error } = await supabase
        .from('offer')
        .select('offer_id, vendor_id, athlete_id, offering_id, is_available, sport')
        .eq('vendor_id', user.id)
        .order('created_at', { ascending: false })
        .limit(3);
      if (!error) {
        setRequests(data);
      }
    };

    if (user) {
      fetchRequests();
    }
  }, [user, supabase]);

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
      <Grid gutter="xs" className='xl:px-20'>
        <Grid.Col span={{ base: 12, xs: 4 }}>
          <Card shadow="lg" p="lg" className="bg-white rounded-lg shadow-lg p-6 transition duration-300 hover:shadow-xl transform hover:-translate-y-1">
            <div className="flex flex-col items-center space-y-4">
              <Avatar uid={user.id} url={`https://duelkbjyxfgctjrijjoe.supabase.co/storage/v1/object/public/avatars/${user.picture_url}`} size={150} editingAllowed={false} />
              <div className="w-full bg-orange-500 p-4 rounded-b-lg">
                <h1 className="text-2xl font-bold text-white text-center">{user.name}</h1>
              </div>
            </div>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, xs: 8 }} className="">
          <div className='hidden lg:flex mt-[180px] justify-end gap-12 px-20'>
            {/* <Link href="/vendor/create-offering" passHref className='flex gap-1 text-orange-500 text-md font-bold text-justify items-end hover:text-blue-500 hover:scale-105'>
              <IconPlus />
              Create New Offering
            </Link>
            <Link href="/edit-profile" passHref className='flex gap-1 text-orange-500 text-md font-bold text-justify items-end hover:text-blue-500 hover:scale-105'>
              <IconEdit />
              Edit Profile
            </Link> */}
            <Button
              onClick={handleSignOut}
              className="bg-orange-500 hover:bg-blue-600 transition-transform transform hover:scale-105"
            >
              <IconLogout />
              Sign Out
            </Button>
          </div>
        </Grid.Col>

        <Grid.Col span={{ base: 12, xs: 9 }}>
          <StatsRing data={statsData} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 3 }}>
          <NewOfferButton />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 7 }}>
          <Card shadow="md" p="lg" className="bg-white rounded-lg shadow-lg p-4 transition duration-300 hover:shadow-xl transform hover:-translate-y-1 h-[470px]">
            <CardGallery userId={user.id} />
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 5 }}>
          <Card shadow="lg" p="lg" className="bg-white rounded-lg shadow-lg round-4 p-6 transition duration-300 hover:shadow-xl transform hover:-translate-y-1 h-[470px]">
            <ScrollArea h={400}>
            <Group position="apart" mb="md" >
              <Text size="xl" fw={700}>REQUESTS</Text>
              <Link href="/vendor/requests" passHref>
                <Button variant="outline" color="orange">View All</Button>
              </Link>
            </Group>
              <RequestAccordion title="REQUESTS" requests={requests} viewAllLink="/vendor/requests" />
            </ScrollArea>
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
