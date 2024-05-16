import { useEffect } from 'react';

import type { Channel, Event } from 'stream-chat';

import { useChatContext } from '../../../../contexts/chatContext/ChatContext';

import type { DefaultStreamChatGenerics } from '../../../../types/types';
import { moveChannelUp } from '../../utils';

type Parameters<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> =
  {
    lockChannelOrder: boolean;
    setChannels: React.Dispatch<React.SetStateAction<Channel<StreamChatGenerics>[] | null>>;
    onNewMessage?: (
      lockChannelOrder: boolean,
      setChannels: React.Dispatch<React.SetStateAction<Channel<StreamChatGenerics>[] | null>>,
      event: Event<StreamChatGenerics>,
    ) => void;
  };

export const useNewMessage = <
  StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics,
>({
  lockChannelOrder,
  onNewMessage,
  setChannels,
}: Parameters<StreamChatGenerics>) => {
  const { client } = useChatContext<StreamChatGenerics>();

  useEffect(() => {
    const handleEvent = (event: Event<StreamChatGenerics>) => {
      if (typeof onNewMessage === 'function') {
        onNewMessage(lockChannelOrder, setChannels, event);
      } else {
        setChannels((channels) => {
          if (!channels) return channels;
          const channelInList = channels.filter((channel) => channel.cid === event.cid).length > 0;

          if (!channelInList && event.channel_type && event.channel_id) {
            // If channel doesn't exist in existing list, check in activeChannels as well.
            // It may happen that channel was hidden using channel.hide(). In that case
            // We remove it from `channels` state, but its still being watched and exists in client.activeChannels.
            const channel = client.channel(event.channel_type, event.channel_id);
            return [channel, ...channels];
          }

          if (!lockChannelOrder && event.cid)
            return moveChannelUp<StreamChatGenerics>({
              channels,
              cid: event.cid,
            });

          return [...channels];
        });
      }
    };

    const listener = client?.on('message.new', handleEvent);
    return () => listener?.unsubscribe();
  }, []);
};
