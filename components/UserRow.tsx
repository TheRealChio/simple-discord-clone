import { UserObject } from "@/types/types";
import Image from "next/image";
import PersonIcon from "./icons/PersonIcon";

const UserRow = ({
  user,
  userChanged,
}: {
  user: UserObject;
  userChanged: (user: UserObject, checked: boolean) => void;
}) => {
  return (
    <div className="flex bg-discord-gray-300 px-3 py-2 rounded-lg items-center justify-start w-full space-x-4 my-2">
      <input
        id={user.id}
        type="checkbox"
        name={user.id}
        onChange={(e) => {
          userChanged(user, e.target.checked);
        }}
        className="size-4 mb-0"
      />
      <label htmlFor="users" className="w-full flex items-center space-x-6">
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name}
            width={40}
            height={40}
            className="size-10 rounded-full"
          />
        ) : (
          <PersonIcon />
        )}
        <p>
          <span className="block text-gray-200">{user.name}</span>
          {user.lastOnline && (
            <span className="text-sm text-gray-300">
              Last online: {user.lastOnline.split("T")[0]}
            </span>
          )}
        </p>
      </label>
    </div>
  );
};

export default UserRow;
