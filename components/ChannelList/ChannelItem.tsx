import {
  ChannelPreviewUIComponentProps,
  useChatContext,
} from "stream-chat-react";
import cn from "classnames";

const ChannelItem = (props: ChannelPreviewUIComponentProps) => {
  const { channel } = props;
  const { setActiveChannel } = useChatContext();

  return (
    <div
      className={cn("flex w-full items-center px-2", {
        "relative before:content-[''] before:block before:absolute before:h-2 before:w-3 before:-left-4 before:bg-gray-700 before:rounded-xl":
          channel.countUnread() > 0,
      })}
    >
      <button
        onClick={() => setActiveChannel(channel)}
        className="w-full flex items-center px-2 hover:bg-discord-gray-500 rounded-md"
      >
        <span className="italic text-xl mr-3 text-gray-200">#</span>
        <span className="text-sm">
          {channel.data?.name || "Channel Preview"}
        </span>
      </button>
    </div>
  );
};

export default ChannelItem;
