"use client";

import { DiscordServer } from "@/types/types";
import { checkIfUrl } from "@/utils/helpers";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import cn from "classnames";
import Link from "next/link";
import CreateServerForm from "./CreateServerForm";
import PlusIcon from "../icons/PlusIcon";
import { useChatContext } from "stream-chat-react";
import { Channel } from "stream-chat";
import { useDiscordContext } from "@/context/DiscordContext";

import logo from "../../assets/discord-white.svg"; // replace 'logo.svg' with your logo file name

const ServerList = () => {
  const { client } = useChatContext();
  const { server: activeServer, changeServer } = useDiscordContext();

  const [serverList, setServerList] = useState<DiscordServer[]>([]);

  const loadServerList = useCallback(async (): Promise<void> => {
    const channels = await client.queryChannels({
      type: "messaging",
      members: { $in: [client.userID as string] },
    });
    const serverSet: Set<DiscordServer> = new Set(
      channels
        .map((channel: Channel) => {
          return {
            // @ts-ignore
            id: channel.data?.data?.serverId,
            // @ts-ignore
            name: (channel.data?.data?.server as string) ?? "Unknown",
            // @ts-ignore
            image: channel.data?.data?.image,
          };
        })
        .filter((server: DiscordServer) => server.name !== "Unknown")
        .filter(
          (server: DiscordServer, index, self) =>
            index ===
            self.findIndex((serverObject) => serverObject.name == server.name)
        )
    );
    const serverArray = Array.from(serverSet.values());
    setServerList(serverArray);
  }, [client]);

  useEffect(() => {
    loadServerList();
  }, [loadServerList]);

  return (
    <div className="bg-discord-gray-500 h-full flex flex-col items-center gap-3 py-3">
      <button
        onClick={() => changeServer(undefined, client)}
        className={cn(
          "flex items-center justify-center w-full relative transition-all ease-in-out duration-200 before:transition-all before:duration-200 before:ease-in-out before:content-[''] before:h-0 before:w-0 before before:absolute before:bg-white before:rounded-[3px] before:-left-[0.4rem] hover:before:h-[1.25rem] hover:before:w-[0.5rem] hover:before:-left-[0.25rem]",
          {
            "before:h-[2rem] before:w-[0.5rem] before:left-[-0.25rem] hover:before:h-[2rem] hover:before:w-[0.5rem] hover:before:-left-[0.25rem]":
              activeServer === undefined,
          }
        )}
      >
        <div className="flex items-center justify-center w-[50px] rounded-[50%] aspect-square object-cover transition-all ease-in-out duration-200 hover:rounded-[1rem] bg-discord-gray-200 hover:bg-discord-main">
          <Image src={logo} alt="Discord Logo" width={30} height={30} />
        </div>
      </button>
      <span className="border-b my w-5"></span>
      {serverList.map((server) => (
        <button
          key={server.id}
          onClick={() => changeServer(server, client)}
          className={cn(
            "flex items-center justify-center w-full relative transition-all ease-in-out duration-200 before:transition-all before:duration-200 before:ease-in-out before:content-[''] before:h-0 before:w-0 before before:absolute before:bg-white before:rounded-[3px] before:-left-[0.4rem] hover:before:h-[1.25rem] hover:before:w-[0.5rem] hover:before:-left-[0.25rem]",
            {
              "before:h-[2rem] before:w-[0.5rem] before:left-[-0.25rem] hover:before:h-[2rem] hover:before:w-[0.5rem] hover:before:-left-[0.25rem]":
                activeServer?.id === server.id,
            }
          )}
        >
          {server.image && checkIfUrl(server.image) ? (
            <Image
              src={server.image}
              alt={server.name}
              width={50}
              height={50}
              className="rounded-[50%] aspect-square object-cover transition-all ease-in-out duration-200 hover:rounded-[1rem]"
            />
          ) : (
            <span className="bg-gray-600 w-[50px] flex items-center justify-center text-sm rounded-[50%] aspect-square object-cover transition-all ease-in-out duration-200 hover:rounded-[1rem]">
              {server.name.charAt(0)}
            </span>
          )}
        </button>
      ))}
      <Link
        href={"/?createServer=true"}
        className="flex items-center justify-center bg-discord-gray-200 rounded-[50%] w-[50px] aspect-square text-4xl font-extralight text-green-500 hover:bg-green-500 hover:text-white hover:rounded-[1rem] transition-all duration-200"
      >
        <PlusIcon />
      </Link>
      <CreateServerForm />
    </div>
  );
};

export default ServerList;
