import { UserObject } from "@/types/types";

export function checkIfUrl(path: string): Boolean {
  try {
    const _ = new URL(path);
    return true;
  } catch (_) {
    return false;
  }
}
