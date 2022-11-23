import { SOCKET_EVENT } from "@libs/shared";

export interface NotificationModel<T> {
  action: SOCKET_EVENT | null;
  data: T
}
