"use client";

import { DiscordServer, DiscordState } from "@/types/types";
import { MemberRequest, StreamVideoClient } from "@stream-io/video-react-sdk";
import { createContext, useCallback, useContext, useState } from "react";
import { Channel, ChannelFilters, StreamChat } from "stream-chat";
import { DefaultStreamChatGenerics } from "stream-chat-react";
import { v4 as uuid } from "uuid";

const initialValie: DiscordState = {
  server: undefined,
  callId: undefined,
  channelsByCategory: new Map(),
  changeServer: () => {},
  createServer: () => {},
  createChannel: () => {},
  createCall: async () => {},
  setCall: () => {},
};

const DiscordContext = createContext<DiscordState>(initialValie);

export const DiscordContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [myState, setMyState] = useState<DiscordState>(initialValie);

  const createCall = useCallback(
    async (
      client: StreamVideoClient,
      server: DiscordServer,
      channelName: string,
      userIds: string[]
    ) => {
      const callId = uuid();
      const audioCall = client.call("default", callId);
      const audioChannelMembers: MemberRequest[] = userIds.map((userId) => {
        return { user_id: userId };
      });

      try {
        const createdAudioCall = await audioCall.create({
          data: {
            custom: {
              serverId: server?.id,
              serverName: server?.name,
              callName: channelName,
            },
            members: audioChannelMembers,
          },
        });
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  const changeServer = useCallback(
    async (server: DiscordServer | undefined, client: StreamChat) => {
      let filters: ChannelFilters = {
        type: "messaging",
        members: { $in: [client.userID as string] },
      };

      if (!server) {
        filters.member_count = 2;
      }

      const channels = await client.queryChannels(filters);
      const channelsByCategory = new Map<
        string,
        Array<Channel<DefaultStreamChatGenerics>>
      >();

      if (server) {
        const categories = new Set(
          channels
            .filter((channel) => {
              // @ts-ignore
              return channel.data?.data?.server === server.name;
            })
            .map((channel) => {
              // @ts-ignore
              return channel.data?.data?.category;
            })
        );

        for (const category of Array.from(categories)) {
          channelsByCategory.set(
            category,
            channels.filter((channel) => {
              return (
                // @ts-ignore
                channel.data?.data?.server === server.name &&
                // @ts-ignore
                channel.data?.data?.category === category
              );
            })
          );
        }
      } else {
        channelsByCategory.set("Direct Messages", channels);
      }

      setMyState((myState) => {
        return { ...myState, server, channelsByCategory };
      });
    },
    []
  );

  const createServer = useCallback(
    async (
      client: StreamChat,
      videoClient: StreamVideoClient,
      name: string,
      imageUrl: string,
      userIds: string[]
    ) => {
      const serverId = uuid();
      const messagingChannel = client.channel("messaging", uuid(), {
        name: "Welcome",
        members: userIds,
        data: {
          image: imageUrl,
          serverId: serverId,
          server: name,
          category: "Text Channels",
        },
      });

      try {
        const response = await messagingChannel.create();
        const server: DiscordServer = {
          id: serverId,
          name,
          image: imageUrl,
        };

        await createCall(videoClient, server, "General Voice Channel", userIds);
      } catch (error) {
        console.error(error);
      }
    },
    [createCall]
  );

  const createChannel = useCallback(
    async (
      client: StreamChat,
      name: string,
      category: string,
      userIds: string[]
    ) => {
      if (client.userID) {
        const channel = client.channel("messaging", uuid(), {
          name,
          members: userIds,
          data: {
            image: myState.server?.image,
            serverId: myState.server?.id,
            server: myState.server?.name,
            category,
          },
        });

        try {
          const response = await channel.create();
        } catch (error) {
          console.error(error);
        }
      }
    },
    [myState.server]
  );

  const setCall = useCallback((callId: string | undefined) => {
    setMyState((myState) => {
      return { ...myState, callId };
    });
  }, []);

  const store: DiscordState = {
    server: myState.server,
    callId: myState.callId,
    channelsByCategory: myState.channelsByCategory,
    changeServer,
    createServer,
    createChannel,
    createCall,
    setCall,
  };

  return (
    <DiscordContext.Provider value={store}>{children}</DiscordContext.Provider>
  );
};

export const useDiscordContext = () => useContext(DiscordContext);
