// Import resources
import { atom, selector, selectorFamily } from "recoil";

// Import resources
import { otpDefaultTimer } from "../config/data";

// ATOMS
/********** 
  ALL 
***********/
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

// ALL BLOG CATEGORIES ATOM
export const allBlogCategoriesAtom = atom({
  key: "allBlogCategoriesAtom",
  default: [],
});

// ALL FAQS ATOM
export const allFaqsAtom = atom({
  key: "allFaqsAtom",
  default: [],
});

// ALL CONTACT FORM ATOM
export const allContactFormAtom = atom({
  key: "allContactFormAtom",
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

/**********************
  OTHERS
**********************/
// GENERAL SETTINGS ATOM
export const generalSettingsAtom = atom({
  key: "generalSettingsAtom",
  default: null,
});

// APP SETTINGS ATOM
export const appSettingsAtom = atom({
  key: "appSettingsAtom",
  default: null,
});

// APP LIBRARY ATOM
export const appLibraryAtom = atom({
  key: "allAppLibraryAtom",
  default: [],
});

// ACTIVE BLOG ATOM
export const activeBlogAtom = atom({
  key: "activeBlogAtom",
  default: [],
});

// ACTIVE FAQS ATOM
export const activeFaqsAtom = atom({
  key: "activeFaqsAtom",
  default: [],
});

// USER ACTIVE BLOG ATOM
export const userActiveBlogAtom = atom({
  key: "userActiveBlogAtom",
  default: [],
});

// TOGGLE MENU ATOM
export const toggleMenuAtom = atom({
  key: "toggleMenuAtom",
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
