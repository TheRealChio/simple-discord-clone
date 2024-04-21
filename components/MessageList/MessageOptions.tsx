import { Dispatch, SetStateAction } from "react";
import ArrowUturnLeft from "../icons/ArrowUturnLeft";
import EmojiIcon from "../icons/EmojiIcon";
import ThreadIcon from "../icons/ThreadIcon";

const MessageOptions = ({
  showEmojiReaction,
}: {
  showEmojiReaction: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="absolute flex border-2 border-discord-gray-500 items-center -top-4 right-2 rounded-xl bg-discord-gray-500">
      <button
        onClick={() => showEmojiReaction((currentValue) => !currentValue)}
        className="p-2 rounded-xl transition-colors duration-200 ease-in-out hover:text-yellow-400 hover:bg-discord-gray-300"
      >
        <EmojiIcon className="size-4" />
      </button>

      <button className="p-2 rounded-xl transition-colors duration-200 ease-in-out hover:text-green-400 hover:bg-discord-gray-300">
        <ArrowUturnLeft className="size-4" />
      </button>

      <button className="p-2 rounded-xl transition-colors duration-200 ease-in-out hover:text-purple-400 hover:bg-discord-gray-300">
        <ThreadIcon className="size-4" />
      </button>
    </div>
  );
};

export default MessageOptions;
