'use client'


import { useEffect, useState } from 'react';
import {createClient} from '@/utils/supabase/client';
import SlotBasicInfo from '@/components/slot/SlotBasicInfo';
import BuyRequestForm from '@/components/slot/BuyRequestForm';
import OwnedSlot from '@/components/slot/OwnedSlot';
import ToJoinSlot from '@/components/slot/ToJoinSlot';
import JoinedSlot from '@/components/slot/JoinedSlot';
import BoughtSlotInfo from '@/components/slot/BoughtSlotInfo';
import Chat from '@/components/slot/Chat';
import Reviews from '@/components/slot/Reviews';
import EditSlot from '@/components/slot/EditSlot';
import JoinRequestForm from '@/components/slot/JoinRequestForm';
import { Loader } from '@mantine/core';

const SlotDetails = ({params}) => {
  const supabase = createClient();
  const slot_id = params.slot_id;
  console.log(slot_id);
  const [slot, setSlot] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [slotRequests, setSlotRequests] = useState([]);

  useEffect(() => {
    const fetchSlotDetails = async () => {
      const { data: slotData, error: slotError } = await supabase
        .from('slot')
        .select('*')
        .eq('slot_id', slot_id)
        .single();
      if (slotError) {
        console.error(slotError);
      } else {
        setSlot(slotData);
      }
    };

    const fetchCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      console.log(user);
      setCurrentUser(user);
    };

    const fetchSlotRequests = async () => {
      const { data: requestsData, error: requestsError } = await supabase
        .from('slot_request')
        .select('*')
        .eq('slot_id', slot_id);
      if (requestsError) {
        console.error(requestsError);
      } else {
        setSlotRequests(requestsData);
      }
    };

    if (slot_id) {
      fetchSlotDetails();
      fetchCurrentUser();
      fetchSlotRequests();
    }
  }, [slot_id]);

  if (!slot || !currentUser) {
    return (<div className="flex items-center justify-center h-screen">
              <Loader color="orange" size="xl" type="bars" />
            </div>  )

  }

  const isOwner = slot.owner_id === currentUser.id;
  const userHasRequested = slotRequests.some(request => request.user_id === currentUser.id);

  return (
    <div className="container mx-auto p-4 mb-20">
      <SlotBasicInfo slot={slot} />
      {slot.is_available ? (
        <BuyRequestForm slot={slot}/>
      ) : isOwner ? (
        <OwnedSlot slot={slot}>
          <BoughtSlotInfo slot={slot} addReview={false} />
          <Chat slot_id={slot.slot_id} />
          <EditSlot slot={slot} />
        </OwnedSlot>
      ) : !userHasRequested ? (
        <ToJoinSlot slot={slot}>
          <JoinRequestForm slot={slot} />
          <BoughtSlotInfo slot={slot} addReview={false} />
        </ToJoinSlot>
      ) : (
        <JoinedSlot slot={slot}>
          <Chat slot_id={slot.slot_id} />
          <BoughtSlotInfo slot={slot} addReview={true} />
        </JoinedSlot>
      )}
    </div>
  );
};

export default SlotDetails;
