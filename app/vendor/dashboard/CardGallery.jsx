import React, { useState, useEffect } from 'react';
import { Container, Group, Button, Text } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import OfferingCard from '@/components/OfferingCard';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

function OfferingsGallery({ userId, cardLimit = 3 }) {
  const supabase = createClient();
  const [offerings, setOfferings] = useState([]);
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    if (!userId) {
      console.error('userId is undefined');
      return;
    }

    async function fetchOfferings() {
      const { data, error } = await supabase
        .from('slot')
        .select('*')
        .eq('vendor_id', userId)
        .order('created_at', { ascending: false })
        ;

      if (error) {
        console.error('Error fetching offerings:', error);
      } else {
        setOfferings(data);
      }
    }
    fetchOfferings();
  }, [userId]);

  const deleteOffering = async (id) => {
    const { error } = await supabase.from('slot').delete().eq('slot_id', id);
    if (error) {
      console.error('Error deleting offering:', error);
    } else {
      setOfferings(offerings.filter((offering) => offering.slot_id !== id));
    }
  };

  const handlePrev = () => {
    setVisibleIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = () => {
    setVisibleIndex((prev) => (prev < offerings.length - cardLimit ? prev + 1 : offerings.length - cardLimit));
  };

  return (
    <>
      <div className="flex gap-3 items-center">
        <h2 className='text-xl font-bold p-1'>RECENT SLOTS</h2>
        <Link href="/vendor/myslots" passHref>
          <Button variant="outline" color="orange">View All</Button>
        </Link>
        <Text size="sm" c="dimmed">
            Click on the card to view details.
        </Text>
      </div>
      <div className="justify-center mt-5">
        <div className='flex gap-5 flex-col xl:flex-row justify-center'>
          {offerings.slice(visibleIndex, visibleIndex + cardLimit).map((offering) => (
            <OfferingCard key={offering.slot_id} offering={offering} onDelete={deleteOffering} />
          ))}
        </div>
      </div>
      {/* <Group position="center" mt="md">
        <Button variant="outline" onClick={handlePrev} disabled={visibleIndex === 0}>
          <IconChevronLeft size={18} />
        </Button>
        <Button variant="outline" onClick={handleNext} disabled={visibleIndex >= offerings.length - cardLimit}>
          <IconChevronRight size={18} />
        </Button>
      </Group> */}
    </>
  );
}

export default OfferingsGallery;
