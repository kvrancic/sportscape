import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client'; 
import { Textarea, Select, Button, Loader } from '@mantine/core';

const BuyRequestForm = ({ slot }) => {
  const supabase = createClient();
  const [sport, setSport] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [existingRequest, setExistingRequest] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserAndRequest = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData.user) {
        console.error('Error fetching user:', userError);
        return;
      }

      setUser(userData.user);

      const { data: existingRequestData, error: requestError } = await supabase
        .from('offer')
        .select('*')
        .eq('slot_id', slot.slot_id)
        .eq('athlete_id', userData.user.id)
        .single();

      if (requestError && requestError.details !== 'Results contain 0 rows') {
        console.log('Error fetching existing request:', requestError);
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
      .from('offer')
      .insert([
        {
          vendor_id: slot.vendor_id,
          athlete_id: user.id,
          slot_id: slot.slot_id,
          sport,
          message,
          status: 'pending',
        },
      ]);

    if (error) {
      console.error('Error creating offer:', error);
    } else {
      setSubmissionStatus('success');
    }
    setLoading(false);
  };

  const getStatusStyles = () => {
    if (existingRequest) {
      if (existingRequest.status === 'pending') {
        return {
          color: 'orange-500',
          shadow: 'shadow-yellow-500',
          heading: 'Request Pending',
          description: 'Your request is currently pending. Please wait for the response.'
        };
      } else if (existingRequest.status === 'rejected') {
        return {
          color: 'red-500',
          shadow: 'shadow-red-500',
          heading: 'Request rejected',
          description: 'Your request was rejected. Don\'t lose hope! Search for other facilities and try again.'
        };
      }
    } else if (submissionStatus === 'success') {
      return {
        color: 'green-500',
        shadow: 'shadow-green-500',
        heading: 'Request Sent',
        description: 'Your request was successfully sent! You will be notified once it is reviewed.'
      };
    }
    return {
      color: 'orange-500',
      shadow: 'shadow-orange-500',
      heading: 'JOIN THE GAME!',
      description: 'Make your request to join this exciting slot and enjoy your favorite sport.'
    };
  };

  const { color, shadow, heading, description } = getStatusStyles();

  const renderFormContent = () => {
    if (existingRequest && existingRequest.status === 'pending') {
      return (
        <div className="text-center">
          <img src="/pending.svg" alt="Pending" className="mx-auto" height={250} width={250} />
          <p className="text-gray-700 font-bold mt-4">{description}</p>
        </div>
      );
    } else if (existingRequest && existingRequest.status === 'rejected') {
      return (
        <div className="text-center">
          <img src="/fail.svg" alt="Rejected" className="mx-auto" height={250} width={250} />
          <p className="text-gray-700 font-bold mt-4">{description}</p>
        </div>
      );
    } else if (submissionStatus === 'success') {
      return (
        <div className="text-center">
          <img src="/success.svg" alt="Success" className="mx-auto" height={250} width={250} />
          <p className="text-gray-700 font-bold mt-4">{description}</p>
        </div>
      );
    } else {
      return (
        <>
          <Select
            label="Select a sport"
            placeholder="Choose a sport"
            value={sport}
            onChange={setSport}
            data={availableSports.map(sport => ({ value: sport, label: sport.charAt(0).toUpperCase() + sport.slice(1) }))}
            required
          />
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
            <Button type="submit" color="orange" className={`bg-${color} hover:bg-${color}`}>
              {loading ? <Loader color="white" size="sm" /> : 'Send Request'}
            </Button>
          </div>
        </>
      );
    }
  };

  const availableSports = ['basketball', 'football', 'volleyball'].filter(sport => slot[`${sport}_available`]);

  return (
    <div className={`bg-white shadow-xl ${shadow} rounded-lg p-6`}>
      <div className="text-center mb-6">
        <h2 className={`text-6xl text-${color} font-black`}>{heading}</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {renderFormContent()}
      </form>
    </div>
  );
};

export default BuyRequestForm;
