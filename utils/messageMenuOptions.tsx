import AppsIcon from "@/components/icons/AppsIcon";
import FolderPlusIcon from "@/components/icons/FolderPlusIcon";
import ThreadIcon from "@/components/icons/ThreadIcon";
import { ListRowElement } from "@/types/types";

export const messageMenuOptions: ListRowElement[] = [
  {
    name: "Upload File",
    icon: <FolderPlusIcon />,
    bottomBorder: false,
    reverseOrder: true,
  },
  {
    name: "Create Thread",
    icon: <ThreadIcon />,
    bottomBorder: false,
    reverseOrder: true,
  },
  {
    name: "Use Apps",
    icon: <AppsIcon />,
    bottomBorder: false,
    reverseOrder: true,
  },
];
