'use client';

import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { useState, useEffect } from 'react';
import { Space } from '@mantine/core';
import { useRouter } from 'next/navigation';
import {
  ConversationHeader,
  Avatar,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  MessageSeparator,
} from '@chatscope/chat-ui-kit-react';
import ChatStyles from './ChatStyles';
import { createClient } from '@/utils/supabase/client';

const Chat = ({ slot_id }) => {
  const supabase = createClient();
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndMessages = async () => {
      // Fetch user
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      // Fetch user profile
      const { data: profile, error: profileError } = await supabase
        .from('profile')
        .select('picture_url')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
      } else {
        setAvatarUrl(profile.picture_url);
      }

      // Fetch initial messages
      const { data: messages, error: messagesError } = await supabase
        .from('chat_message')
        .select(`
          message_id,
          message_text,
          timestamp,
          sender_id,
          profile:profile(id, name, picture_url)
        `)
        .eq('slot_id', slot_id)
        .order('timestamp', { ascending: true });

      if (messagesError) {
        console.error('Error fetching messages:', messagesError);
      } else {
        setMessages(messages);
      }
    };

    fetchUserAndMessages();

    // Subscribe to real-time updates
    const channel = supabase.channel('custom-filter-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'chat_message', filter: `slot_id=eq.${slot_id}` },
        async (payload) => {
          console.log('Change received!', payload);
          const newMessage = payload.new;

          // Fetch the sender's profile information
          const { data: profile, error: profileError } = await supabase
            .from('profile')
            .select('id, name, picture_url')
            .eq('id', newMessage.sender_id)
            .single();

          if (profileError) {
            console.error('Error fetching profile for new message:', profileError);
          } else {
            newMessage.profile = profile;
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          }
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [slot_id, supabase]);

  const handleSendMessage = async (text) => {
    const { error } = await supabase.from('chat_message').insert([
      { slot_id, sender_id: user.id, message_text: text },
    ]);

    if (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleAvatarClick = (userId) => {
    router.push(`/athlete/profile/${userId}`);
  };

  return (
    <>
      <ChatStyles />
      <ChatContainer
        style={{
          height: '500px',
          boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.1)',
        }}
      >
        <Space size="xl" />
        <MessageList className="pt-10">
          {messages.map((msg) => (
            <Message
              key={msg.message_id}
              model={{
                direction: msg.sender_id === user.id ? 'outgoing' : 'incoming',
                message: msg.message_text,
                position: 'single',
                sender: msg.profile?.name || 'Unknown',
                sentTime: new Date(msg.timestamp).toLocaleTimeString(),
              }}
              className={msg.sender_id === user.id ? 'light-grey' : 'orange-500'}
            >
              <Avatar
                name={msg.profile?.name || 'Unknown'}
                src={msg.profile?.picture_url || 'https://via.placeholder.com/150'}
                onClick={() => handleAvatarClick(msg.profile?.id)}
                style={{ cursor: 'pointer' }}
              />
              <Message.Header sender={msg.profile?.name || 'Unknown'} />
            </Message>
          ))}
        </MessageList>
        <MessageInput placeholder="Type message here" onSend={handleSendMessage} />
      </ChatContainer>
    </>
  );
};

export default Chat;
