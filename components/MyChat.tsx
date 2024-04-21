import { useClient } from "@/hooks/useClient";
import { HomeState } from "@/types/types";
import {
  Channel,
  Chat,
  LoadingIndicator,
  MessageInput,
  MessageList,
  Window,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import ServerList from "./ServerList/ServerList";
import ChannelList from "./ChannelList/ChannelList";
import DateSeperator from "./MessageList/DateSeperator";
import ChannelHeader from "./MessageList/ChannelHeader";
import Message from "./MessageList/Message";
import { customReactionOptions } from "@/utils/reactionOptions";
import MessageComposer from "./MessageList/MessageComposer";
import { useVideoClient } from "@/hooks/useVideoClient";
import { StreamVideo } from "@stream-io/video-react-sdk";
import { useDiscordContext } from "@/context/DiscordContext";
import MyCall from "./MyCall";

const MyChat = ({ apiKey, user, token }: HomeState) => {
  const chatClient = useClient({ apiKey, user, tokenOrProvider: token });
  const videoClient = useVideoClient({ apiKey, user, tokenOrProvider: token });
  const { callId } = useDiscordContext();

  if (!chatClient) {
    return <LoadingIndicator />;
  }

  if (!videoClient) {
    return <LoadingIndicator />;
  }

  return (
    <StreamVideo client={videoClient}>
      <Chat client={chatClient} theme="str-chat__theme-dark">
        <section className="h-screen w-screen grid grid-cols-[5rem,auto,1fr]">
          <ServerList />
          <ChannelList />
          {callId && <MyCall callId={callId} />}
          {!callId && (
            <Channel
              HeaderComponent={ChannelHeader}
              Message={Message}
              DateSeparator={DateSeperator}
              reactionOptions={customReactionOptions}
              Input={MessageComposer}
            >
              <Window>
                <MessageList />
                <MessageInput />
              </Window>
            </Channel>
          )}
        </section>
      </Chat>
    </StreamVideo>
  );
};

export default MyChat;
