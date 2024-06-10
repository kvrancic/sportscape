'use client';

import { useEffect, useState } from 'react';
import { Accordion, Center, Group, Text, Image, Loader, Button } from '@mantine/core';
import { IconCheck, IconX, IconInfoCircle } from '@tabler/icons-react';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

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
            <p className="font-medium">{request.profile.name}</p> requested to join the slot
          </div>
        </Group>
      </Accordion.Control>
      {status === 'accepted' && (
        <IconCheck size={24} color="green" />
      )}
      {status === 'declined' && (
        <IconX size={24} color="red" />
      )}
    </Center>
  );
}

const JoinRequests = ({ slot_id }) => {
  const [joinRequests, setJoinRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      const { data: slot_requests, error } = await supabase
        .from('slot_request')
        .select('*')
        .eq('slot_id', slot_id)
        .eq('status', 'pending');

      if (error) {
        console.error('Error fetching join requests:', error);
      } else {
        const detailedRequestsData = await Promise.all(
          slot_requests.map(async (request) => {
            const { data: profile, error: profileError } = await supabase
              .from('profile')
              .select('name, picture_url')
              .eq('id', request.athlete_id)
              .single();

            if (profileError) console.error(profileError);

            return {
              ...request,
              profile,
            };
          })
        );
        setJoinRequests(detailedRequestsData);
      }
      setLoading(false);
    };

    fetchRequests();
  }, [slot_id]);

  const handleAccept = async (slot_id, athlete_id) => {
    const { data, error } = await supabase
      .from('slot_request')
      .update({ status: 'accepted' })
      .eq('slot_id', slot_id)
      .eq('athlete_id', athlete_id);

    if (error) {
      console.error('Error accepting request:', error);
    } else {
      await supabase
        .from('slot_member')
        .insert([{ slot_id, athlete_id, is_owner: false }]);
      setJoinRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.slot_id === slot_id && request.athlete_id === athlete_id
            ? { ...request, status: 'accepted' }
            : request
        )
      );
    }
  };

  const handleDecline = async (slot_id, athlete_id) => {
    const { data, error } = await supabase
      .from('slot_request')
      .update({ status: 'declined' })
      .eq('slot_id', slot_id)
      .eq('athlete_id', athlete_id);

    if (error) {
      console.error('Error declining request:', error);
    } else {
      setJoinRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.slot_id === slot_id && request.athlete_id === athlete_id
            ? { ...request, status: 'declined' }
            : request
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

  const items = joinRequests.map((request) => (
    <Accordion.Item key={request.athlete_id} value={request.athlete_id}>
      <div
        className={`p-4 rounded-lg ${
          request.status === 'accepted'
            ? 'border-2 border-green-500'
            : request.status === 'declined'
            ? 'border-2 border-red-500'
            : ''
        }`}
      >
        <AccordionControl request={request} status={request.status} />
        <Accordion.Panel>
          <Text><strong>Message:</strong> {request.message}</Text>
          {request.status === 'pending' && (
            <Group position="right" mt="md">
              <Button color="green" onClick={() => handleAccept(request.slot_id, request.athlete_id)}>Accept</Button>
              <Button color="red" onClick={() => handleDecline(request.slot_id, request.athlete_id)}>Reject</Button>
            </Group>
          )}
        </Accordion.Panel>
      </div>
    </Accordion.Item>
  ));

  return (
    <div>
      {joinRequests.length === 0 ? (
        <Center style={{ color: 'gray', textAlign: 'center', flexDirection: 'column', marginTop: '120px' }}>
          <IconInfoCircle size={64} />
          <Text>No join requests available</Text>
        </Center>
      ) : (
        <Accordion variant="separated">
          {items}
        </Accordion>
      )}
    </div>
  );
};

export default JoinRequests;
