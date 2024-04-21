"use client";

import Link from "next/link";
import CloseIcon from "../icons/CloseIcon";
import { useSearchParams, useRouter } from "next/navigation";
import { useRef, useEffect, useState, useCallback, use } from "react";
import { CreateServerFormState, UserObject } from "@/types/types";
import { useChatContext } from "stream-chat-react";
import UserRow from "../UserRow";
import cn from "classnames";
import { useDiscordContext } from "@/context/DiscordContext";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";

const CreateServerForm = () => {
  const router = useRouter();
  const params = useSearchParams();
  const showForm = params.get("createServer");
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Data
  const { createServer } = useDiscordContext();
  const { client } = useChatContext();
  const videoClient = useStreamVideoClient();
  const initialState: CreateServerFormState = {
    serverName: "",
    serverImage: "",
    users: [],
  };

  const [formData, setFormData] = useState<CreateServerFormState>(initialState);
  const [users, setUsers] = useState<UserObject[]>([]);

  const buttonDisabled = (): boolean => {
    return (
      !formData.serverName ||
      !formData.serverImage ||
      formData.users.length === 0
    );
  };

  const userChanged = (user: UserObject, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        users: [...formData.users, user],
      });
    } else {
      setFormData({
        ...formData,
        users: formData.users.filter((thisUser) => thisUser.id !== user.id),
      });
    }
  };

  const createClicked = () => {
    if (!videoClient) {
      return;
    }

    createServer(
      client,
      videoClient,
      formData.serverName,
      formData.serverImage,
      formData.users.map((user) => user.id)
    );
    setFormData(initialState);
    router.replace("/");
  };

  const loadUsers = useCallback(async () => {
    const response = await client.queryUsers({});
    const users: UserObject[] = response.users
      .filter((user) => user.role !== "admin")
      .map((user) => {
        return {
          id: user.id,
          name: user.name ?? user.id,
          image: user.image as string,
          online: user.online,
          lastOnline: user.last_active,
        };
      });

    if (users) setUsers(users);
  }, [client]);

  useEffect(() => {
    if (showForm && dialogRef.current) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [showForm]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return (
    <dialog
      ref={dialogRef}
      className="absolute z-10 bg-discord-gray-400 space-y-2 rounded-xl w-[clamp(30rem,30%,50rem)]"
    >
      <div className="w-full flex items-center justify-between py-8 px-6">
        <h2 className="text-3xl font-semibold text-gray-200">
          Create new server
        </h2>
        <Link href="/">
          <CloseIcon className="w-10 h-10 text-gray-200" />
        </Link>
      </div>

      <form method="dialog" action="" className="flex flex-col space-y-2 px-6">
        <label
          htmlFor="serverName"
          className="uppercase text-sm font-bold text-gray-200"
        >
          Server Name
        </label>
        <div className="flex items-center bg-discord-gray-300 rounded-lg">
          <span className="text-2xl p-2 text-gray-200">#</span>
          <input
            required
            type="text"
            id="serverName"
            name="serverName"
            value={formData.serverName}
            onChange={(e) => {
              setFormData({ ...formData, serverName: e.target.value });
            }}
            className="w-full p-2 bg-transparent outline-none text-gray-200"
          />
        </div>

        <label
          htmlFor="serverImage"
          className="uppercase text-sm font-bold text-gray-200"
        >
          Image URL
        </label>
        <div className="flex items-center bg-discord-gray-300 rounded-lg">
          <span className="text-2xl p-2 text-gray-200">#</span>
          <input
            required
            type="text"
            id="serverImage"
            name="serverImage"
            value={formData.serverImage}
            onChange={(e) => {
              setFormData({ ...formData, serverImage: e.target.value });
            }}
            className="w-full p-2 bg-transparent outline-none text-gray-200"
          />
        </div>

        <div className="max-h-64 overflow-y-auto">
          <h2 className="mb-2 uppercase text-sm font-bold text-gray-200">
            Add Users
          </h2>
          {users.map((user) => (
            <UserRow key={user.id} user={user} userChanged={userChanged} />
          ))}
        </div>
      </form>
      <div className="flex space-x-6 items-center justify-end p-6 bg-discord-gray-400">
        <Link href={"/"} className="font-semibold text-gray-200">
          Cancel
        </Link>
        <button
          type="submit"
          disabled={buttonDisabled()}
          onClick={createClicked}
          className={cn(
            "bg-discord-main rounded-xl py-2 px-4 text-gray-200 font-bold uppercase",
            {
              "opacity-70 cursor-not-allowed": buttonDisabled(),
            }
          )}
        >
          Create Server
        </button>
      </div>
    </dialog>
  );
};

export default CreateServerForm;
