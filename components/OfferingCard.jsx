'use client'

import React, { useEffect, useState } from 'react';
import { Card, Image, Text, Button, Group, Badge, Modal, useMantineTheme } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import RequestAccordion from './RequestAccordion';
import { createClient } from '@/utils/supabase/client';

function OfferingCard({ offering, onDelete, userId }) {
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const supabase = createClient();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const { data, error } = await supabase
        .from('offer')
        .select('offer_id, vendor_id, athlete_id, slot_id, is_available, sport')
        .eq('slot_id', offering.slot_id)
        .order('created_at', { ascending: false });
      if (!error) {
        setRequests(data);
      }
    };
    fetchRequests();
  }, [supabase, offering.slot_id]);

  const absoluteImageUrl = (url) => {
    return url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${url}`;
  }; 

  const getSportEmojis = () => {
    let emojis = '';
    if (offering.basketball_available) emojis += '🏀 ';
    if (offering.volleyball_available) emojis += '🏐 ';
    if (offering.football_available) emojis += '⚽ ';
    return emojis.trim();
  };

  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  };

  return (
    <>
      <Card shadow="sm" padding="md" radius="md" withBorder>
        <Card.Section onClick={open}>
          <Image
            src={absoluteImageUrl(offering.slot_photo) || 'https://via.placeholder.com/600x400.png?text=No+Image'}
            h={180}
            w={300}
            alt={offering.name}
          />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text size="lg" fw={700}>{offering.name}</Text>
          <button
            className="absolute top-2 right-2 bg-white text-red-500 rounded-full p-2 focus:outline-none bg-opacity-70 hover:bg-opacity-100 hover:translate-y-0.5 transition-transform duration-150 ease-in-out" 
            onClick={(e) => {
              e.stopPropagation();
              onDelete(offering.slot_id);
            }}
        >
            <IconTrash size={18} />
          </button>
        </Group>

        <Text size="sm" c="dimmed">
          <p> {offering.address}, {offering.postcode} </p>
          Time: {formatTime(offering.start_time)} - {formatTime(offering.end_time)}
        </Text>


        <Text size="sm" mt="xs">Sport: {getSportEmojis()}</Text>

        <Group mt="xs">
          <Badge color={offering.is_available ? 'green' : 'gray'}>{offering.is_available ? 'Available' : 'Not Available'}</Badge>
        </Group>

        <Modal opened={opened} onClose={close} title="Offering Details" size="lg" centered>
          <div style={{ textAlign: 'center', marginBottom: theme.spacing.md }}>
            <Image
              src={absoluteImageUrl(offering.slot_photo) || 'https://via.placeholder.com/600x400.png?text=No+Image'}
              height={200}
              alt={offering.name}
              withPlaceholder
            />
          </div>
          <div style={{ marginBottom: theme.spacing.md }}>
            <Text fw={700} size="lg">{offering.name}</Text>
          </div>
          <Text size="sm" c="dimmed">
            <p> {offering.address}, {offering.postcode} </p>
            Time: {formatTime(offering.start_time)} - {formatTime(offering.end_time)}
        </Text>
          <div style={{ marginBottom: theme.spacing.md }}>
            <Text size="md">{offering.description}</Text>
          </div>
          <div style={{ marginBottom: theme.spacing.md }}>
            <Text size="sm">Sport: {getSportEmojis()}</Text>
            <Badge color={offering.is_available ? 'green' : 'gray'}>{offering.is_available ? 'Available' : 'Not Available'}</Badge>
          </div>
          {offering.is_available && (
            <div style={{ marginTop: theme.spacing.lg }}>
              <RequestAccordion
                title="Requests"
                viewAllLink={`/requests/${offering.offering_id}`}
                requests={requests}
              />
            </div>
          )}
        </Modal>
      </Card>
    </>
  );
}

export default OfferingCard;
