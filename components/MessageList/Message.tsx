import Image from "next/image";
import { useState } from "react";
import {
  ReactionSelector,
  ReactionsList,
  useMessageContext,
} from "stream-chat-react";
import MessageOptions from "./MessageOptions";

const Message = () => {
  const { message } = useMessageContext();

  const [showOptions, setShowOptions] = useState(false);
  const [showReactions, setShowReactions] = useState(false);

  const formatwDate = (date: Date | string): string => {
    if (typeof date === "string") {
      return date;
    }
    return `${date.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    })}`;
  };

  return (
    <div
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
      className="flex relative space-x-2 p-2 rounded-md transition-colors ease-in-out duration-200 hover:bg-discord-gray-400"
    >
      <Image
        src={message.user?.image || "https://getstream.io/random_png/"}
        alt="User avatar"
        width={40}
        height={40}
        className="rounded-full aspect-square object-cover size-10"
      />

      <div>
        {showOptions && <MessageOptions showEmojiReaction={setShowReactions} />}
        {showReactions && (
          <div className="absolute right-60 -bottom-10">
            <ReactionSelector />
          </div>
        )}

        <div className="space-x-2">
          <span className="font-semibold text-sm text-gray-200">
            {message.user?.name}
          </span>
          {message.updated_at && (
            <span className="text-xs text-gray-300">
              {formatwDate(message.updated_at)}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-200">{message.text}</p>
        <ReactionsList />
      </div>
    </div>
  );
};

export default Message;
