'use client'


import { useEffect, useState } from 'react';
import {createClient} from '@/utils/supabase/client';
import SlotBasicInfo from './SlotBasicInfo';
import BuyRequestForm from './BuyRequestForm';
import OwnedSlot from './OwnedSlot';
import ToJoinSlot from './ToJoinSlot';
import JoinedSlot from './JoinedSlot';
import SlotHero from './SlotHero';
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
    <div className="container mx-auto px-8 šy-4 mb-20">
      <SlotHero slot={slot} />
      {slot.is_available ? (
        <>
          <SlotBasicInfo slot={slot} />
          <BuyRequestForm slot={slot}/>
        </>
        
      ) : isOwner ? (
        <OwnedSlot slot={slot}/>
          
      ) : !userHasRequested ? (
        <ToJoinSlot slot={slot}/>
      ) : (
        <JoinedSlot slot={slot}/>
      )}
    </div>
  );
};

export default SlotDetails;
