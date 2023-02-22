// Import resources
import { atom, selector, selectorFamily } from "recoil";

// Import resources
import { otpDefaultTimer } from "../config/data";

/********** 
  ALL 
***********/
// ALL USERS ATOM
export const allUsersAtom = atom({
  key: "allUsersAtom",
  default: [],
});

// ALL LIBRARY ATOM
export const allLibraryAtom = atom({
  key: "allLibraryAtom",
  default: [],
});

// ALL BLOG ATOM
export const allBlogAtom = atom({
  key: "allBlogAtom",
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
// APP SETTINGS ATOM
export const appSettingsAtom = atom({
  key: "appSettingsAtom",
  default: [],
});

// TOGGLE MENU ATOM
export const toggleMenuAtom = atom({
  key: "toggleMenuAtom",
  default: false,
});
