import { useState } from "react";
import { SendButton, useChatContext } from "stream-chat-react";
import PlusCircleIcon from "../icons/PlusCircleIcon";
import { messageMenuOptions } from "@/utils/messageMenuOptions";
import ChannelListMenuRow from "../ChannelList/TopBar/ChannelListMenuRow";
import PresentIcon from "../icons/PresentIcon";
import GIFIcon from "../icons/GIFIcon";
import EmojiIcon from "../icons/EmojiIcon";

const MessageComposer = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [message, setMessage] = useState("");

  const { channel } = useChatContext();
  return (
    <div className="flex mx-6 my-4 px-4 py-2 bg-discord-gray-400 items-center justify-between space-x-4 rounded-md text-gray-200 relative">
      <div className="flex gap-5">
        <button onClick={() => setMenuOpen((menuOpen) => !menuOpen)}>
          <PlusCircleIcon className="size-8" />
        </button>
        {menuOpen && (
          <div className="absolute p-2 z-10 -left-2 bottom-12">
            <div className="bg-discord-gray-400 p-2 rounded-md w-[180px] flex flex-col">
              {messageMenuOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md transition-colors ease-in-out duration-200 "
                >
                  <ChannelListMenuRow
                    {...option}
                    className="hover:!bg-discord-main"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Message #${channel?.data?.name || "general"}`}
          className="border-transparent bg-transparent outline-none text-sm font-semibold m-0 text-gray-200"
        />
      </div>
      <div className="flex gap-3">
        <PresentIcon className="hover:text-pink-300 cursor-pointer" />
        <GIFIcon className="hover:text-green-300 cursor-pointer" />
        <EmojiIcon className="hover:text-yellow-400 cursor-pointer" />
        <SendButton
          className="hover:text-blue-400"
          sendMessage={() => {
            channel?.sendMessage({ text: message });
            setMessage("");
          }}
        />
      </div>
    </div>
  );
};

export default MessageComposer;
