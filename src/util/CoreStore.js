import { proxy } from "valtio";

export const authInfoStore = proxy({
  jwtToken: "",
  authenticated: false,
  roles: [],
  sessionId: "",
  username: "no_user",
  sessionStartTime: Date.now(),
});
