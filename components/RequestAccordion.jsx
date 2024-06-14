// /components/RequestAccordion.js
import { useEffect, useState } from 'react';
import { Accordion, ActionIcon, Center, Group, Text, Image, Loader, Button } from '@mantine/core';
import { IconCheck, IconX, IconInfoCircle } from '@tabler/icons-react';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

function getSportIcon(sport) {
  switch (sport) {
    case 'basketball':
      return '🏀';
    case 'football':
      return '⚽';
    case 'volleyball':
      return '🏐';
    default:
      return '';
  }
}

function AccordionControl({ request, status }) {
  return (
    <Center style={{ width: '100%', justifyContent: 'space-between' }}>
      <Accordion.Control>
        <Group>
          <img
            src={request.profile.picture_url || 'https://via.placeholder.com/40'}
            alt={`${request.profile.name}'s picture`}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col 2xl:flex-row gap-1">
            <p className="font-medium">{request.profile.name}</p> sent an offer for <p className="font-bold">{request.slot.name}</p>
          </div>
        </Group>
      </Accordion.Control>
      {status === 'accepted' && (
        <IconCheck size={24} color="green" />
      )}
      {status === 'rejected' && (
        <IconX size={24} color="red" />
      )}
    </Center>
  );
}

function RequestAccordion({ title, requests, viewAllLink, limit = 0 }) {
  const [detailedRequests, setDetailedRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      const detailedRequestsData = await Promise.all(
        requests.map(async (request) => {
          const { data: profile, error: profileError } = await supabase
            .from('profile')
            .select('name, picture_url')
            .eq('id', request.athlete_id)
            .single();

          const { data: slot, error: slotError } = await supabase
            .from('slot')
            .select('name')
            .eq('slot_id', request.slot_id)
            .single();

          if (profileError) console.error(profileError);
          if (slotError) console.error(slotError);

          return {
            ...request,
            profile,
            slot,
          };
        })
      );

      setDetailedRequests(detailedRequestsData);
      setLoading(false);
    };

    fetchDetails();
  }, [requests]);

  const handleAccept = async (offer_id) => {
    const { data, error } = await supabase
      .from('offer')
      .update({ status: 'accepted' })
      .eq('offer_id', offer_id);

    if (error) {
      console.error('Error accepting offer:', error);
    } else {
      setDetailedRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.offer_id === offer_id ? { ...request, status: 'accepted' } : request
        )
      );
    }
  };

  const handleDecline = async (offer_id) => {
    const { data, error } = await supabase
      .from('offer')
      .update({ status: 'rejected' })
      .eq('offer_id', offer_id);

    if (error) {
      console.error('Error declining offer:', error);
    } else {
      setDetailedRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.offer_id === offer_id ? { ...request, status: 'rejected' } : request
        )
      );
    }
  };

  if (loading) {
    return (
      <Center style={{ color: 'gray', textAlign: 'center', flexDirection: 'column', marginTop: '120px' }}>
        <Loader color="orange" size="xl" />
        <Text>Loading requests...</Text>
      </Center>
    );
  }

  const limitedRequests = limit > 0 ? detailedRequests.slice(0, limit) : detailedRequests;
  const items = limitedRequests.map((request) => (
    <Accordion.Item key={request.offer_id} value={request.offer_id}>
      <div
        className={`p-4 rounded-lg ${
          request.status === 'accepted'
            ? 'border-2 border-green-500'
            : request.status === 'rejected'
            ? 'border-2 border-red-500'
            : ''
        }`}
      >
        <AccordionControl request={request} status={request.status} />
        <Accordion.Panel>
          <Text><strong>Message:</strong> {request.message}</Text>
          <Text><strong>Sport:</strong> {getSportIcon(request.sport)} {request.sport}</Text>
          {request.status === 'pending' && (
            <Group position="right" mt="md">
              <Button color="green" onClick={() => handleAccept(request.offer_id)}>Accept</Button>
              <Button color="red" onClick={() => handleDecline(request.offer_id)}>Reject</Button>
            </Group>
          )}
        </Accordion.Panel>
      </div>
    </Accordion.Item>
  ));

  return (
    <div>
      {detailedRequests.length === 0 ? (
        <Center style={{ color: 'gray', textAlign: 'center', flexDirection: 'column', marginTop: '120px' }}>
          <IconInfoCircle size={64} />
          <Text>No requests available</Text>
        </Center>
      ) : (
        <Accordion variant="separated">
          {items}
        </Accordion>
      )}
    </div>
  );
}

export default RequestAccordion;
