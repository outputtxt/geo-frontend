import { proxy } from "valtio";

export const authInfoStore = proxy({
  jwtToken: "",
  authenticated: false,
  role: "",
  sessionId: "",
  username: "no_user",
  sessionStartTime: Date.now(),
});
