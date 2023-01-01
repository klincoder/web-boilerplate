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
  url: `${baseUrl}`,
  iOS: {
    bundleId: "com.example.klincoder",
  },
  android: {
    packageName: "com.example.klincoder",
    installApp: true,
    minimumVersion: "12",
  },
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
  verifyEmail: "mailjet-verify-email",
  resetEmail: "mailjet-reset-email",
  otp: "mailjet-otp",
  welcome: "mailjet-welcome",
  login: "mailjet-login",
  passChange: "mailjet-pass-change",
  profileChange: "mailjet-profile-change",
  newUser: "mailjet-new-user",
  broadcast: "mailjet-broadcast",
  contactForm: "mailjet-contact-form",
  adminTranx: "mailjet-admin-tranx",
  userTranx: "mailjet-user-tranx",
  newTranx: "mailjet-new-tranx",
  newOrder: "mailjet-new-order",
};

// ALERT MSG
export const alertMsg = {
  generalSucc: "Action successful",
  generalErr: "internal error. Please contact support.",
  loginSucc: "Login successful",
  loginErr: "Invalid credentials",
  registerSucc: "Account created",
  otpSendSucc: "We sent your OTP code. Check your inbox or spam.",
  otpSendErr: "Failed to send OTP. Try again.",
  otpVerifyErr: "Invalid code",
  emailExistSucc: "Email address already exist",
  emailExistErr: "Invalid email address",
  usernameExistSucc: "Username already exist",
  usernameExistErr: "Invalid username",
  isRequiredAll: "All fields are required",
  passRecoverySucc: "Password recovery successful",
  passRecoveryErr: "Failed to recover password",
  logoutSucc: "Logout successful",
  linkSentSucc: "We sent your confirmation link. Check your inbox or spam.",
  verifyEmailSucc: "Your email address was verified.",
  authErr: "Authentication failed. Please contact support.",
};

// NAV LINKS
export const navLinks = [
  { id: "123", title: "Home", link: "/" },
  { id: "456", title: "FAQs", link: "/faqs" },
  { id: "789", title: "Contact", link: "/contact" },
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
  { id: "789", title: "Contact", link: "/contact" },
  // { id: "1011", title: "Blog", link: "/blog", isBlog: true },
];

/************************
  CMS DATA
*************************/
// CMS LINKS
export const cmsLinks = [
  {
    // USER
    id: "u123",
    role: "user",
    title: "My Orders",
    leftIcon: <AiOutlineShoppingCart className={twStyles?.cmsNavIconLeft} />,
    status: "active",
  },
  {
    // ADMIN
    id: "a123",
    role: "admin",
    title: "Library",
    link: "/cms/all-library",
    leftIcon: <BsFolder2Open className={twStyles?.cmsNavIconLeft} />,
    status: "active",
    linksArr: ["/cms/all-library"],
  },
  {
    id: "a456",
    role: "admin",
    title: "Pages",
    leftIcon: <AiOutlineFileSearch className={twStyles?.cmsNavIconLeft} />,
    status: "active",
    isDropdown: true,
    options: [
      { title: "Homepage", link: "/cms/all-homepage" },
      { title: "FAQs", link: "/cms/all-faqs" },
      { title: "Contact Us", link: "/cms/all-contact" },
      { title: "Privacy", link: "/cms/all-privacy" },
      { title: "Terms", link: "/cms/all-terms" },
    ],
    linksArr: [
      "/cms/all-homepage",
      "/cms/all-faqs",
      "/cms/all-faqs-create",
      "/cms/all-contact",
      "/cms/all-privacy",
      "/cms/all-terms",
    ],
  },
  {
    id: "a789",
    role: "admin",
    title: "Users",
    link: "/cms/all-users",
    leftIcon: <FiUsers className={twStyles?.cmsNavIconLeft} />,
    linksArr: ["/cms/all-users", "/cms/all-users-view"],
    status: "active",
  },
  {
    id: "a1011",
    role: "admin",
    title: "Blog",
    link: "/cms/all-blog",
    leftIcon: <AiOutlineEdit className={twStyles?.cmsNavIconLeft} />,
    status: "active",
    linksArr: ["/cms/all-blog", "/cms/all-blog-create"],
  },
  {
    id: "a1213",
    role: "admin",
    title: "Coupons",
    link: "/cms/all-coupons",
    leftIcon: <AiOutlineTag className={twStyles?.cmsNavIconLeft} />,
    status: "active",
    linksArr: ["/cms/all-coupons"],
  },
  {
    id: "a1415",
    role: "admin",
    title: "Newsletter",
    link: "/cms/all-newsletter",
    leftIcon: <AiOutlineMail className={twStyles?.cmsNavIconLeft} />,
    status: "active",
    linksArr: ["/cms/all-newsletter"],
  },
];

// USER CMS LINKS
export const userCmsLinks = cmsLinks?.filter((i) => i?.role === "user");

// ADMIN CMS LINKS
export const adminCmsLinks = cmsLinks?.filter((i) => i?.role === "admin");
