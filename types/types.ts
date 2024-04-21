import { StreamVideoClient } from "@stream-io/video-react-sdk";
import { Channel, StreamChat, User } from "stream-chat";
import { DefaultStreamChatGenerics } from "stream-chat-react";

export type UserObject = {
  id: string;
  name: string;
  image?: string;
  online?: boolean;
  lastOnline?: string;
};

export type HomeState = {
  apiKey: string;
  user: User;
  token: string;
};

export type DiscordState = {
  server?: DiscordServer;
  callId?: string;
  channelsByCategory: Map<string, Array<Channel<DefaultStreamChatGenerics>>>;
  changeServer: (server: DiscordServer | undefined, client: StreamChat) => void;
  createServer: (
    client: StreamChat,
    videoClient: StreamVideoClient,
    name: string,
    imageUrl: string,
    userIds: string[]
  ) => void;
  createChannel: (
    client: StreamChat,
    name: string,
    category: string,
    userIds: string[]
  ) => void;
  createCall: (
    client: StreamVideoClient,
    server: DiscordServer,
    channelName: string,
    userIds: string[]
  ) => Promise<void>;
  setCall: (callId: string | undefined) => void;
};

export type DiscordServer = {
  id: string;
  name: string;
  image?: string;
};

export type CreateServerFormState = {
  serverName: string;
  serverImage: string;
  users: UserObject[];
};

export type CreateChannelFormState = {
  channelType: string;
  channelName: string;
  category: string;
  users: UserObject[];
};

export type ListRowElement = {
  name: string;
  icon: JSX.Element;
  bottomBorder?: boolean;
  purple?: boolean;
  red?: boolean;
  reverseOrder?: boolean;
  className?: string;
};

export type CategoryItemProps = {
  category: string;
  channels: Channel<DefaultStreamChatGenerics>[];
  serverName: string;
};
