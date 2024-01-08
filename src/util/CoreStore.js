import { proxy } from "valtio";

export const authInfoStore = proxy({
  jwtToken: "",
  authenticated: false,
  role: "",
  sessionId: "",
  username: "no_user",
  sessionStartTime: Date.now(),
});

export const visibilityStore = proxy({
  sideBarVisible: true,
  sideBarOpen: true,
  openChangePasswordDialog: false,
});

export const contentStore = proxy({
  contentData: null,
  contentHeader: "",
  contentOpen: false,
});
