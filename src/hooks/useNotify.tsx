import { useContext } from "react";
import { notificationContext } from "../components/Notification";

export function useNotify() {
  const { data, setter } = useContext(notificationContext);
  function show(notification: string,type: "success" | "error" | "pending") {
    setter((x) => [{ show: true, notification, id: Date.now(),type:type },...x]);
  }
  return { show, setter, data };
}
