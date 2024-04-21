import { ListRowElement } from "@/types/types";
import BoostIcon from "@/components/icons/BoostIcon";
import PersonAddIcon from "@/components/icons/PersonAddIcon";
import GearIcon from "@/components/icons/GearIcon";
import PlusCircleIcon from "@/components/icons/PlusCircleIcon";
import FolderPlusIcon from "@/components/icons/FolderPlusIcon";
import FaceSmileIcon from "@/components/icons/FaceSmileIcon";
import BellIcon from "@/components/icons/BellIcon";
import ShieldIcon from "@/components/icons/ShieldIcon";
import PenIcon from "@/components/icons/PenIcon";
import SpeakerMutedIcon from "@/components/icons/SpeakerMutedIcon";
import LeaveServerIcon from "@/components/icons/LeaveServerIcon";

export const menuItems: ListRowElement[] = [
  { name: "Server Boost", icon: <BoostIcon />, bottomBorder: true },
  {
    name: "Invite People",
    icon: <PersonAddIcon />,
    bottomBorder: false,
    purple: true,
  },
  { name: "Server Settings", icon: <GearIcon />, bottomBorder: false },
  { name: "Create Channel", icon: <PlusCircleIcon />, bottomBorder: false },
  { name: "Create Category", icon: <FolderPlusIcon />, bottomBorder: false },
  { name: "App Directory", icon: <FaceSmileIcon />, bottomBorder: true },
  { name: "Notification Settings", icon: <BellIcon />, bottomBorder: false },
  { name: "Privacy Settings", icon: <ShieldIcon />, bottomBorder: true },
  { name: "Edit Server Profile", icon: <PenIcon />, bottomBorder: false },
  {
    name: "Hide Muted Channels",
    icon: <SpeakerMutedIcon />,
    bottomBorder: true,
  },
  {
    name: "Leave Server",
    icon: <LeaveServerIcon />,
    bottomBorder: false,
    red: true,
  },
];
