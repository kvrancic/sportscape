'use client'

// /components/slot/JoinRequestForm.js
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Textarea, Button, Loader } from '@mantine/core';

const JoinRequestForm = ({ slot }) => {
  const supabase = createClient();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [user, setUser] = useState(null);
  const [existingRequest, setExistingRequest] = useState(null);

  useEffect(() => {
    const fetchUserAndRequest = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData.user) {
        console.error('Error fetching user:', userError);
        return;
      }

      setUser(userData.user);

      const { data: existingRequestData, error: requestError } = await supabase
        .from('slot_request')
        .select('*')
        .eq('slot_id', slot.slot_id)
        .eq('athlete_id', userData.user.id)
        .single();

      if (requestError && requestError.details !== 'Results contain 0 rows') {
        console.error('Error fetching existing request:', requestError);
      } else {
        setExistingRequest(existingRequestData);
      }
    };

    fetchUserAndRequest();
  }, [slot.slot_id, supabase]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!user) {
      console.error('User is not authenticated');
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('slot_request')
      .insert([
        {
          slot_id: slot.slot_id,
          athlete_id: user.id,
          status: 'pending',
          message,
        },
      ]);

    if (error) {
      console.error('Error creating slot request:', error);
    } else {
      setSubmissionStatus('success');
    }
    setLoading(false);
  };

  const renderFormContent = () => {
    if (existingRequest) {
      if (existingRequest.status === 'pending') {
        return (
          <div className="text-center">
            <img src="/pending.svg" alt="Pending" className="mx-auto" height={200} width={200}/>
            <p className="font-bold mt-4">Your request is currently pending. Please wait for the response.</p>
          </div>
        );
      } else if (existingRequest.status === 'rejected') {
        return (
          <div className="text-center">
            <img src="/fail.svg" alt="rejected" className="mx-auto" height={200} width={200} />
            <p className="font-bold mt-4">Your request was rejected. Don&apos;t lose hope! Search for other slots and try again.</p>
          </div>
        );
      }
    } else if (submissionStatus === 'success' || existingRequest?.status == 'accepted') {
      return (
        <div className="text-center">
          <img src="/success.svg" alt="Success" className="mx-auto" height={200} width={200}/>
          <p className="font-bold mt-4">Your request was successfully sent! You will be notified once it is reviewed.</p>
        </div>
      );
    } else {
      return (
        <>
          <Textarea
            label="Your Message"
            placeholder="Write a message..."
            value={message}
            onChange={(e) => setMessage(e.currentTarget.value)}
            required
            autosize
            minRows={4}
            className="font-mono"
          />
          <div className="text-center">
            <Button type="submit" color="orange" className="bg-orange-500 hover:bg-orange-600">
              {loading ? <Loader color="white" size="sm" /> : 'Send Request'}
            </Button>
          </div>
        </>
      );
    }
  };

  return (
    <div className="bg-white shadow-xl shadow-orange-500 rounded-lg p-6">
      <div className="text-center mb-6">
        <h2 className="text-6xl text-orange-500 font-black">JOIN THE SLOT!</h2>
        <p className="text-gray-700">Make your request to join this exciting slot and become part of the team.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {renderFormContent()}
      </form>
    </div>
  );
};

export default JoinRequestForm;
