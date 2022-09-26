// Import resources
import { atom, selector, selectorFamily } from "recoil";

// Import custom files
import { otpDefaultTimer } from "../config/data";

// ATOMS
// APP SETTINGS ATOM
export const appSettingsAtom = atom({
  key: "appSettingsAtom",
  default: null,
});

// APP LIBRARY ATOM
export const appLibraryAtom = atom({
  key: "allAppLibraryAtom",
  default: null,
});

/**********************
  ALL 
**********************/
// ALL USERS ATOM
export const allUsersAtom = atom({
  key: "allUsersAtom",
  default: [],
});

// ALL BLOG ATOM
export const allBlogAtom = atom({
  key: "allBlogAtom",
  default: [],
});
export const activeBlogAtom = atom({
  key: "activeBlogAtom",
  default: [],
});

// ALL BLOG CATEGORIES ATOM
export const allBlogCatAtom = atom({
  key: "allBlogCatAtom",
  default: [],
});

// ALL FAQS ATOM
export const allFaqsAtom = atom({
  key: "allFaqsAtom",
  default: [],
});
export const activeFaqsAtom = atom({
  key: "activeFaqsAtom",
  default: [],
});

/**********************
  USER
**********************/
// USER ATOM
export const userAtom = atom({
  key: "userAtom",
  default: null,
});

// USER BLOG ATOM
export const userBlogAtom = atom({
  key: "userBlogAtom",
  default: [],
});
export const userActiveBlogAtom = atom({
  key: "userActiveBlogAtom",
  default: [],
});

// USER BLOG CATEGORIES ATOM
export const userBlogCatAtom = atom({
  key: "userBlogCatAtom",
  default: [],
});

/**********************
  OTHERS
**********************/
// TOGGLE CMS MENU ATOM
export const toggleCmsMenuAtom = atom({
  key: "toggleCmsMenuAtom",
  default: false,
});

// OTP TIMER ATOM
export const otpTimerAtom = atom({
  key: "otpTimerAtom",
  default: otpDefaultTimer,
});

// PREVIOUS ROUTE ATOM
export const prevRouteAtom = atom({
  key: "prevRouteAtom",
  default: null,
});
