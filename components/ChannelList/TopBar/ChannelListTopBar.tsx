import { useState } from "react";
import cn from "classnames";
import CloseIcon from "@/components/icons/CloseIcon";
import ChevronIcon from "@/components/icons/ChevronIcon";
import { menuItems } from "@/utils/menuItems";
import ChannelListMenuRow from "./ChannelListMenuRow";

const ChannelListTopBar = ({ serverName }: { serverName: string }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="w-full relative">
      <button
        onClick={() => setMenuOpen((currentValue) => !currentValue)}
        className={cn(
          "flex w-full items-center justify-between p-4 border-b-2 border-gray-200 hover:bg-discord-gray-500",
          {
            "bg-discord-gray-300": menuOpen,
          }
        )}
      >
        <h2 className="text-lg font-bold text-white">{serverName}</h2>
        {menuOpen && <CloseIcon />}
        {!menuOpen && <ChevronIcon />}
      </button>

      {menuOpen && (
        <div className="absolute w-full p-2 z-10">
          <div className="w-full bg-discord-gray-300 p-2 shadow-lg rounded-md">
            <h2>Menu</h2>
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setMenuOpen(false)}
                className="w-full"
              >
                <ChannelListMenuRow {...item} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChannelListTopBar;
