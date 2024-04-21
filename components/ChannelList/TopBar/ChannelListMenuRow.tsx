import { ListRowElement } from "@/types/types";
import cn from "classnames";

const ChannelListMenuRow = ({
  name,
  icon,
  bottomBorder = true,
  purple = false,
  red = false,
  reverseOrder = false,
  className = "",
}: ListRowElement) => {
  return (
    <>
      <p
        className={cn(
          "flex justify-between items-center p-2 cursor-pointer text-white rounded-md hover:bg-discord-gray-400 hover:text-white transition-colors ease-in-out duration-200",
          { "flex-row-reverse": reverseOrder },
          { "text-discord-main hover:!bg-discord-main": purple },
          { "text-red-500 hover:!bg-red-500": red },
          className
        )}
      >
        <span className="text-sm font-medium">{name}</span>
        {icon}
      </p>
      {bottomBorder && <div className="my-1 mx-2 h-px bg-gray-300" />}
    </>
  );
};

export default ChannelListMenuRow;
