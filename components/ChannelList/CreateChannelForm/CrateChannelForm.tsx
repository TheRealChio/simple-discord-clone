import UserRow from "@/components/UserRow";
import CloseIcon from "@/components/icons/CloseIcon";
import { CreateChannelFormState, UserObject } from "@/types/types";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useChatContext } from "stream-chat-react";
import cn from "classnames";
import { useDiscordContext } from "@/context/DiscordContext";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import SpeakerIcon from "@/components/icons/SpeakerIcon";

const CreateChannelForm = () => {
  const params = useSearchParams();
  const showCreateChannelForm = params.get("createChannel");
  const category = params.get("category");
  const { createChannel, server, createCall } = useDiscordContext();

  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  const { client } = useChatContext();
  const videoClient = useStreamVideoClient();
  const initialState: CreateChannelFormState = {
    channelType: "text",
    channelName: "",
    category: category || "",
    users: [],
  };

  const [formData, setFormData] =
    useState<CreateChannelFormState>(initialState);
  const [users, setUsers] = useState<UserObject[]>([]);

  const buttonDisabled = (): boolean => {
    return !formData.channelName || formData.users.length === 0;
  };

  const createClicked = () => {
    switch (formData.channelType) {
      case "text":
        createChannel(
          client,
          formData.channelName,
          formData.category,
          formData.users.map((user) => user.id)
        );
      case "voice":
        if (videoClient && server) {
          createCall(
            videoClient,
            server,
            formData.channelName,
            formData.users.map((user) => user.id)
          );
        }
    }
    setFormData(initialState);
    router.replace("/");
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

  const loadUsers = useCallback(async () => {
    const response = await client.queryUsers({});
    const users: UserObject[] = response.users
      .filter((user) => user.role !== "admin")
      .map((user) => {
        return {
          id: user.id,
          name: user.name || user.id,
          image: user.image as string,
          online: user.online,
          lastOnline: user.last_active,
        };
      });

    if (users) setUsers(users);
  }, [client]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  useEffect(() => {
    if (showCreateChannelForm && dialogRef.current) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [showCreateChannelForm]);

  useEffect(() => {
    const category = params.get("category");
    const isVoice = params.get("isVoice");
    setFormData({
      channelType: isVoice ? "voice" : "text",
      channelName: "",
      category: category || "",
      users: [],
    });
  }, [setFormData, params]);

  return (
    <dialog
      ref={dialogRef}
      className="absolute z-10 bg-discord-gray-400 space-y-2 rounded-xl w-[clamp(30rem,30%,50rem)]"
    >
      <div className="w-full flex items-center justify-between py-8 px-6">
        <h2 className="text-3xl font-semibold text-gray-200">Create Channel</h2>
        <Link href="/">
          <CloseIcon className="w-10 h-10 text-gray-200" />
        </Link>
      </div>

      <form method="dialog" className="flex flex-col space-y-4 px-6">
        <div className="space-y-4">
          <h3 className="uppercase text-sm font-bold text-gray-200">
            Channel Type
          </h3>
          <div className="w-full flex space-x-4 items-center bg-discord-gray-300 p-2 rounded-lg">
            <label
              htmlFor="text"
              className="flex flex-1 items-center space-x-6"
            >
              <span className="text-2xl text-gray-200">#</span>
              <div>
                <p className="text-md text-gray-200 font-semibold">Text</p>
                <p className="text-gray-300 text-sm">
                  Send messages, images, GIFs, emoji, opinions and puns
                </p>
              </div>
            </label>
            <input
              type="radio"
              id="text"
              name="channelType"
              value="text"
              checked={formData.channelType === "text"}
              onChange={() => setFormData({ ...formData, channelType: "text" })}
            />
          </div>

          <div className="w-full flex space-x-4 items-center bg-discord-gray-300 p-2 rounded-lg">
            <label
              htmlFor="text"
              className="flex flex-1 items-center space-x-6"
            >
              <span className="text-2xl text-gray-200">
                <SpeakerIcon className="size-4" />
              </span>
              <div>
                <p className="text-md text-gray-200 font-semibold">Voice</p>
                <p className="text-gray-300 text-sm">
                  Hang out together with voice, video and screen share
                </p>
              </div>
            </label>
            <input
              type="radio"
              id="voice"
              name="channelType"
              value="voice"
              checked={formData.channelType === "voice"}
              onChange={() =>
                setFormData({ ...formData, channelType: "voice" })
              }
            />
          </div>
        </div>

        <label
          htmlFor="channelName"
          className="uppercase text-sm font-bold text-gray-200"
        >
          Channel Name
        </label>
        <div className="flex items-center bg-discord-gray-300 rounded-lg">
          <span className="text-2xl p-2 text-gray-200">#</span>
          <input
            required
            type="text"
            id="channelName"
            name="channelName"
            value={formData.channelName}
            onChange={(e) => {
              setFormData({ ...formData, channelName: e.target.value });
            }}
            className="w-full p-2 bg-transparent outline-none text-gray-200"
          />
        </div>

        <label
          htmlFor="category"
          className="uppercase text-sm font-bold text-gray-200"
        >
          Category
        </label>
        <div className="flex items-center bg-discord-gray-300 rounded-lg">
          <span className="text-2xl p-2 text-gray-200">#</span>
          <input
            required
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={(e) => {
              setFormData({ ...formData, category: e.target.value });
            }}
            className="w-full p-2 bg-transparent outline-none text-gray-200"
          />
        </div>

        <h2 className="mb-2 uppercase text-sm font-bold text-gray-200">
          Add Users
        </h2>
        <div className="max-h-64 overflow-y-auto">
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
          Create Channel
        </button>
      </div>
    </dialog>
  );
};

export default CreateChannelForm;
