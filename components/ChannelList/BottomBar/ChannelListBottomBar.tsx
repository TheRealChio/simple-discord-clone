import { useClerk } from "@clerk/nextjs";
import { useState } from "react";
import { useChatContext } from "stream-chat-react";
import cn from "classnames";
import Image from "next/image";
import SpeakerIcon from "@/components/icons/SpeakerIcon";
import GearIcon from "@/components/icons/GearIcon";
import ChannelListMenuRow from "../TopBar/ChannelListMenuRow";
import LeaveServerIcon from "@/components/icons/LeaveServerIcon";
import MicIcon from "@/components/icons/MicIcon";

const ChannelListBottomBar = () => {
  const { client } = useChatContext();

  const [micActive, setMicActive] = useState(true);
  const [audioActive, setAudioActive] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const { signOut } = useClerk();
  return (
    <div className="mt-auto p-2 bg-discord-gray-500 w-full flex items-center relative">
      <button
        onClick={() => setMenuOpen((currentValue) => !currentValue)}
        className="flex flex-1 items-center space-x-2 p-1 pr-2 mr-3 rounded-md hover:bg-discord-gray-300"
      >
        {client.user?.image && (
          <div
            className={cn("relative size-8", {
              "after:content-[''] after:block after:absolute after:h-4 after:w-4 after:bg-green-600 after:bottom-0 after:right-0 after:rounded-full after:border-2 after:border-discord-gray-500":
                client.user?.online,
            })}
          >
            <Image
              src={client.user?.image}
              alt="User image"
              width={36}
              height={36}
              className="rounded-full"
            />
          </div>
        )}
        <p className="flex flex-col items-start space-y-1">
          <span className="block max-w-24 text-gray-200 text-sm font-medium -mb-1.5 tracking-tight text-ellipsis overflow-x-clip">
            {client.user?.name}
          </span>
          <span className="text-sm text-gray-200 inline-block">
            {client.user?.online ? "Online" : "Offline"}
          </span>
        </p>
      </button>

      <button
        onClick={() => setMicActive((currentValue) => !currentValue)}
        className={cn(
          "w-8 h-8 p-1 flex items-center justify-center relative rounded-lg hover:bg-discord-gray-300 transition-all duration-100 ease-in-out",
          {
            "text-red-400 after:block after:content-[''] after:absolute after:h-full after:w-0.5 after:bg-red-400 after:rotate-45 after:rounded-xl after:m-2":
              !micActive,
          }
        )}
      >
        <MicIcon className="size-5" />
      </button>

      <button
        onClick={() => setAudioActive((currentValue) => !currentValue)}
        className={cn(
          "w-8 h-8 p-1 flex items-center justify-center relative rounded-lg hover:bg-discord-gray-300 transition-all duration-100 ease-in-out",
          {
            "text-red-400 after:block after:content-[''] after:absolute after:h-full after:w-0.5 after:bg-red-400 after:rotate-45 after:rounded-xl after:m-2":
              !audioActive,
          }
        )}
      >
        <SpeakerIcon className="size-5" />
      </button>

      <button
        className={cn(
          "w-8 h-8 p-1 flex items-center justify-center relative rounded-lg hover:bg-discord-gray-300 transition-all duration-100 ease-in-out"
        )}
      >
        <GearIcon className="size-5" />
      </button>

      {menuOpen && (
        <button
          onClick={() => signOut()}
          className={cn(
            "w-8 h-8 p-1 flex items-center justify-center absolute -top-10 left-2 rounded-lg hover:bg-discord-gray-300 transition-all duration-100 ease-in-out bg-red-500"
          )}
        >
          <LeaveServerIcon className="size-5" />
        </button>
      )}
    </div>
  );
};

export default ChannelListBottomBar;
