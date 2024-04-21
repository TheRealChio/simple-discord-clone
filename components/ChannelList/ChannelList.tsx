import { useDiscordContext } from "@/context/DiscordContext";
import ChannelListTopBar from "./TopBar/ChannelListTopBar";
import CategoryItem from "./CategoryItem";
import ChannelListBottomBar from "./BottomBar/ChannelListBottomBar";
import CreateChannelForm from "./CreateChannelForm/CrateChannelForm";
import CallList from "./CallList";

const ChannelList = () => {
  const { server, channelsByCategory } = useDiscordContext();
  return (
    <div className="w-72 h-full flex flex-col items-start bg-discord-gray-400">
      <ChannelListTopBar serverName={server?.name || "Direct Messages"} />

      <div className="w-full">
        {Array.from(channelsByCategory.keys()).map((category, index) => (
          <CategoryItem
            key={`${category}-${index}`}
            category={category}
            channels={channelsByCategory.get(category) || []}
            serverName={server?.name || "Direct Messages"}
          />
        ))}
      </div>
      <CallList />
      <CreateChannelForm />
      <ChannelListBottomBar />
    </div>
  );
};

export default ChannelList;
