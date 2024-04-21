import { useChannelStateContext } from "stream-chat-react";

const ChannelHeader = () => {
  const { channel } = useChannelStateContext();
  const { name } = channel?.data || {};
  return (
    <div className="flex items-center space-x-3 p-3 border-b">
      <span className="text-3xl text-gray-200">#</span>
      <span className="font-bold lowercase">{name}</span>
    </div>
  );
};

export default ChannelHeader;
