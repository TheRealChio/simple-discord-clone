import { useDiscordContext } from "@/context/DiscordContext";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useCallback, useEffect, useState } from "react";
import cn from "classnames";
import ChevronIcon from "../icons/ChevronIcon";
import Link from "next/link";
import PlusIcon from "../icons/PlusIcon";
import SpeakerIcon from "../icons/SpeakerIcon";

const CallList = () => {
  const { server, callId, setCall } = useDiscordContext();
  const client = useStreamVideoClient();

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [calls, setCalls] = useState<Call[]>([]);

  const loadAudioChannels = useCallback(async () => {
    const callsRequest = await client?.queryCalls({
      filter_conditions: {
        "custom.serverName": server?.name || "Test Server",
      },
      sort: [{ field: "created_at", direction: 1 }],
      watch: true,
    });

    if (callsRequest?.calls) {
      setCalls(callsRequest?.calls);
    }
  }, [client, server]);

  useEffect(() => {
    loadAudioChannels();
  }, [loadAudioChannels]);

  return (
    <div className="w-full my-2">
      <div className="flex items-center text-gray-400 mb-2 pr-2">
        <button
          onClick={() => setIsOpen((currentValue) => !currentValue)}
          className="flex w-full items-center justify-start px-2"
        >
          <div
            className={cn("transition-all ease-in-out duration-200", {
              "-rotate-90": !isOpen,
            })}
          >
            <ChevronIcon />
          </div>
          <h2 className="inline-block uppercase text-sm font-bold px-2">
            Voice Channels
          </h2>
        </button>
        <Link
          href={`/?createChannel=true&isVoice=true&category=Voice Channels`}
        >
          <PlusIcon />
        </Link>
      </div>
      {isOpen && (
        <div className="px-2">
          {calls.map((call) => (
            <button
              key={call.id}
              onClick={() => setCall(call.id)}
              className="w-full flex items-center my-1 px-2 py-1 hover:bg-discord-gray-500 rounded-md"
            >
              <SpeakerIcon className="size-4 text-gray-200 mr-2" />
              <span
                className={cn("text-sm", { "font-bold": call.id === callId })}
              >
                {call.state.custom.callName || "Channel Preview"}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CallList;
