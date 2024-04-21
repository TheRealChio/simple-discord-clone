import { CategoryItemProps } from "@/types/types";
import { useState } from "react";
import cn from "classnames";
import ChevronIcon from "../icons/ChevronIcon";
import Link from "next/link";
import PlusIcon from "../icons/PlusIcon";
import ChannelItem from "./ChannelItem";

const CategoryItem = ({
  category,
  channels,
  serverName,
}: CategoryItemProps) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="mb-5">
      <div className="flex items-center text-gray-400 p-2">
        <button
          onClick={() => setIsOpen((currentValue) => !currentValue)}
          className="flex w-full items-center justify-start"
        >
          <div
            className={cn("transition-all ease-in-out duration-200", {
              "-rotate-90": !isOpen,
            })}
          >
            <ChevronIcon />
          </div>
          <span className="inline-block uppercase text-sm font-bold px-2">
            {category}
          </span>
        </button>
        <Link
          href={`/?createChannel=true&serverName=${serverName}&category=${category}`}
          className="inline-block"
        >
          <PlusIcon />
        </Link>
      </div>
      {isOpen && (
        <div>
          {channels.map((channel) => (
            <ChannelItem key={channel.id} channel={channel} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryItem;
