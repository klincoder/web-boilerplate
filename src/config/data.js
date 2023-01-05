// Import resources
import Mailjet from "node-mailjet";
import { BsFolder2Open } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { FaGithub, FaYoutube, FaTiktok } from "react-icons/fa";
import {
  AiOutlineShoppingCart,
  AiOutlineFileSearch,
  AiOutlineEdit,
  AiOutlineTag,
  AiOutlineMail,
} from "react-icons/ai";

// Import custom files
import twStyles from "../styles/twStyles";
import logo from "../assets/logo.png";
import avatar from "../assets/avatar-default.png";

// VARIABLES
// IS PROD ENV
export const isProdEnv = process.env.NODE_ENV === "production";

// BASE URL
export const baseUrl = isProdEnv
  ? process.env.NEXT_PUBLIC_BASEURL_PROD
  : process.env.NEXT_PUBLIC_BASEURL_DEV;

// MAILJET CONN
export const mailjetEmail = Mailjet.apiConnect(
  process.env.NEXT_PUBLIC_MAILJET_API_KEY,
  process.env.NEXT_PUBLIC_MAILJET_SECRET_KEY
);

// CURRENCY SYMBOL
export const currSymbol = { ngn: "₦", btc: "₿", usd: "$", gh: "₵", gb: "£" };

// INTL NUMBER FORMAT
export const intl = new Intl.NumberFormat();

// FILE EXTENSIONS
export const fileExtensions = ["jpg", "jpeg", "gif", "png"];

// OTP DEFAULT TIMER
export const otpDefaultTimer = 59;

// ACTION SETTINGS
export const actionSettings = {
  url: `${baseUrl}/login`,
  // iOS: {
  //   bundleId: "com.example.klincoder",
  // },
  // android: {
  //   packageName: "com.example.klincoder",
  //   installApp: true,
  //   minimumVersion: "12",
  // },
  //handleCodeInApp: false,
  //dynamicLinkDomain: 'custom.page.link'
};

// APP IMAGES
export const appImages = {
  general: "https://placehold.co/600x400.png",
  logo,
  avatar,
};

// APP REGEX
export const appRegex = {
  numDecimal: /^\d*(\.\d+)?$/,
  fiveDecimals: /^\d*(\.\d{1,5})?$/,
  digitsOnly: /^[0-9]+$/,
  cannotStartWithZero: /^(?:[1-9]\d*|0)$/,
  url: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
};

// API ROUTES
export const apiRoutes = {
  otpEmail: { api: "mailjet-email", tempID: 4468134 },
  verifyEmail: { api: "mailjet-email", tempID: 4469644 },
  passRecovery: { api: "mailjet-email", tempID: 4470092 },
  profileChange: { api: "mailjet-email", tempID: 4471756 },
  welcome: { api: "mailjet-email", tempID: 4471793 },
  login: { api: "mailjet-email", tempID: 4471814 },
  newUser: { api: "mailjet-email", tempID: 4471824 },
  contactForm: { api: "mailjet-email", tempID: 1 }, // Empty
  newsletter: { api: "mailjet-email", tempID: 1 },
  tranx: { api: "mailjet-email", tempID: 1 },
  order: { api: "mailjet-email", tempID: 1 },
};

// ALERT MSG
export const alertMsg = {
  generalSucc: "Action successful 👍", // Success
  linkSentSucc: "We sent your verification link. Check your inbox or spam 👍",
  otpSentSucc: "We sent your OTP code. Check your inbox or spam 👍",
  loginSucc: "Login successful 👍",
  registerSucc: "Account created. Login 👍",
  passRecoverySucc: "Password recovery successful 👍",
  passResetSucc: "Password reset successful. Login 👍",
  logoutSucc: "Logout successful 👍",
  verifyEmailSucc: "Email address verified 👍",
  userExistSucc: "User already exist 👍",
  paymentSucc: "Payment successful 👍",
  generalErr: "internal error. Please contact support 😔", // Error
  isRequiredAll: "All fields are required 😔",
  inValidCred: "Invalid credentials 😔",
  otpSentErr: "Failed to send OTP. Try again 😔",
  otpVerifyErr: "Invalid code 😔",
  authActionErr: "Authentication failed 😔",
  userExistErr: "User not found 😔",
  paymentErr: "Payment failed 😔",
};

// NAV LINKS
export const navLinks = [
  { id: "123", title: "Home", link: "/" },
  { id: "456", title: "About", link: "/#homeAbout" },
  { id: "789", title: "FAQs", link: "/#homeFaqs" },
  { id: "1011", title: "Contact", link: "/#homeContact" },
];

// SOCIAL LINKS
export const socialLinks = [
  {
    id: "123",
    title: "Github",
    icon: <FaGithub size={24} className="text-white" />,
  },
  {
    id: "456",
    title: "YouTube",
    icon: <FaYoutube size={24} className="text-white" />,
  },
  {
    id: "789",
    title: "TikTok",
    icon: <FaTiktok size={24} className="text-white" />,
  },
];

// STATUS LIST
export const statusList = ["Active", "Inactive"];

// FAQS CATEGORY LIST
export const faqsCategoryList = ["General", "Covid", "Clinic", "Hometest"];

// COPYRIGHT LINKS
export const copyrightLinks = [
  { id: "123", title: "Privacy", link: "/privacy" },
  { id: "456", title: "Terms", link: "/terms" },
  // { id: "789", title: "Contact", link: "/contact" },
  // { id: "1011", title: "Blog", link: "/blog", isBlog: true },
];

/************************
  CMS DATA
*************************/
// CMS LINKS
export const cmsLinks = [
  // {
  //   // USER
  //   title: "My Orders",
  //   role: "user",
  //   leftIcon: <AiOutlineShoppingCart className={twStyles?.cmsNavIconLeft} />,
  //   status: "active",
  //   linksArr: ["/cms/my-orders", "/cms/my-orders/create"],
  // },
  {
    // ADMIN
    title: "Library",
    role: "admin",
    link: "/cms/all-library",
    leftIcon: <BsFolder2Open className={twStyles?.cmsNavIconLeft} />,
    status: "active",
    linksArr: ["/cms/all-library"],
  },
  {
    title: "Pages",
    role: "admin",
    link: "/cms/all-pages",
    leftIcon: <AiOutlineFileSearch className={twStyles?.cmsNavIconLeft} />,
    status: "active",
    linksArr: ["/cms/all-pages", "/cms/all-pages/create"],
  },
  {
    title: "Blog",
    role: "admin",
    link: "/cms/all-blog",
    leftIcon: <AiOutlineEdit className={twStyles?.cmsNavIconLeft} />,
    status: "active",
    linksArr: ["/cms/all-blog", "/cms/all-blog/create"],
  },
  {
    title: "Users",
    role: "admin",
    link: "/cms/all-users",
    leftIcon: <FiUsers className={twStyles?.cmsNavIconLeft} />,
    status: "active",
    isDropdown: true,
    options: [
      { title: "All Users", link: "/cms/all-users" },
      { title: "Newsletter", link: "/cms/all-users/newsletter" },
    ],
    linksArr: [
      "/cms/all-users",
      "/cms/all-users/view",
      "/cms/all-users/create",
      "/cms/all-users/newsletter",
    ],
  },
];

// USER CMS LINKS
export const userCmsLinks = cmsLinks?.filter((i) => i?.role === "user");

// ADMIN CMS LINKS
export const adminCmsLinks = cmsLinks?.filter((i) => i?.role === "admin");
