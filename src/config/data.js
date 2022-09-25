// Import resources
import Mailjet from "node-mailjet";
import moment from "moment";
import { FiUsers } from "react-icons/fi";
import { AiOutlineEdit, AiOutlineShoppingCart } from "react-icons/ai";

// Import custom files
import tw from "../styles/twStyles";
import logo from "../assets/logo.png";
import avatar from "../assets/avatar-default.png";
import fb from "../assets/images/icon-facebook.svg";
import ig from "../assets/images/icon-instagram.svg";
import yt from "../assets/images/icon-youtube.svg";
import twitter from "../assets/images/icon-twitter.svg";
import call from "../assets/images/icon-call.png";
import email from "../assets/images/icon-email.png";
import location from "../assets/images/icon-location.png";
import hero from "../assets/images/hero.svg";
import iconPlaceholder from "../assets/images/icon-placeholder.png";
import mockup1 from "../assets/images/mockup-1.png";
import mockup2 from "../assets/images/mockup-2.png";
import androidBadge from "../assets/images/badge-android.png";
import iosBadge from "../assets/images/badge-ios.png";

// VARIABLES
// PRODUCTION ENV
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
export const currSymbol = { ngn: "₦", btc: "₿", usd: "$", gh: "GH₵", gb: "£" };

// INTL NUMBER FORMAT
export const intl = new Intl.NumberFormat();

// FILE EXTENSIONS
export const fileExtensions = ["jpg", "jpeg", "gif", "png"];

// OTP DEFAULT TIMER
export const otpDefaultTimer = 59;

// ADMIN DETAILS
export const adminName = "Maxwell";
export const adminEmail = "admin@fittoflyuk.com";

// APP IMAGES
export const appImages = {
  general: "https://placehold.co/600x400.png",
  logo,
  avatar,
  fb,
  ig,
  yt,
  twitter,
  call,
  email,
  location,
  hero,
  iconPlaceholder,
  mockup1,
  mockup2,
  androidBadge,
  iosBadge,
};

// APP REGEX
export const appRegex = {
  numDecimal: /^\d*(\.\d+)?$/,
  fiveDecimals: /^\d*(\.\d{1,5})?$/, ///(\.\d{1,5})?$/; ///^\d*(\.\d+{1,5})?$/
  digitsOnly: /^[0-9]+$/,
  cannotStartWithZero: /^(?:[1-9]\d*|0)$/,
  url: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
  url2: /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/,
};

// API ROUTES
export const apiRoutes = {
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
  general: "Internal error. Please contact support.",
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
  cartAdd: "Added to cart",
  cartRemove: "Removed from cart",
  logoutSucc: "Logout successful",
  linkSentSucc: "We sent your verification link. Check your inbox or spam.",
};

// NO AUTH ROUTE
export const noAuthRoute = [
  "/",
  "/login",
  "/register",
  "/password-recovery",
  "/faqs",
  "/blog",
  "/blog/[slug]",
  "/contact",
  "/privacy",
  "/terms",
  "/404",
  "/auth-actions",
  "/test-page",
];

// PRIVATE ROUTE ARR
export const privateRouteArr = [
  "/login",
  "/register",
  "/password-recovery",
  "/auth-actions",
];

// NAV LINKS
export const navLinks = [
  { id: "123", title: "Home", link: "/" },
  { id: "456", title: "About", link: "/#homeAbout" },
  {
    id: "789",
    title: "Services",
    isDropdown: true,
    options: [
      {
        title: "Dropdown Sample",
        link: "/blog",
        linkSlug: "/blog/[slug]",
      },
    ],
  },
  { id: "1011", title: "FAQs", link: "/faqs" },
  { id: "1213", title: "Blog", link: "/blog", isBlog: true },
];

// SOCIAL LINKS
export const socialLinks = [
  { id: "123", title: "Facebook", image: appImages?.fb, slug: "facebook" },
  { id: "456", title: "Instagram", image: appImages?.ig, slug: "instagram" },
  { id: "789", title: "YouTube", image: appImages?.yt, slug: "youTube" },
  { id: "1011", title: "Twitter", image: appImages?.twitter, slug: "twitter" },
];

// COMPANY LINKS
export const companyLinks = [
  { id: "123", title: "Home", link: "/" },
  { id: "456", title: "About", link: "/#homeAbout" },
  { id: "789", title: "Services", link: "/#homeServices" },
  { id: "1011", title: "Blog", link: "/blog", isBlog: true },
  { id: "1213", title: "FAQs", link: "/faqs" },
  { id: "1415", title: "Contact", link: "/contact" },
  { id: "1617", title: "Privacy", link: "/privacy" },
  { id: "1819", title: "Terms", link: "/terms" },
];

// APP FEATURES LIST
export const appFeaturesList = [
  {
    id: "123",
    title: "Feature 1",
    image: appImages?.iconPlaceholder,
    description: "Lorep ipsum lorep ispum lorep ispum lorep ispum lorep ispum.",
  },
  {
    id: "456",
    title: "Feature 2",
    image: appImages?.iconPlaceholder,
    description: "Lorep ipsum lorep ispum lorep ispum lorep ispum lorep ispum.",
  },
  {
    id: "789",
    title: "Feature 3",
    image: appImages?.iconPlaceholder,
    description: "Lorep ipsum lorep ispum lorep ispum lorep ispum lorep ispum.",
  },
  // {
  //   id: "1011",
  //   title: "Feature 4",
  //   image: appImages?.iconPlaceholder,
  //   description: "Lorep ipsum lorep ispum lorep ispum lorep ispum lorep ispum.",
  // },
  // {
  //   id: "1213",
  //   title: "Feature 5",
  //   image: appImages?.iconPlaceholder,
  //   description: "Lorep ipsum lorep ispum lorep ispum lorep ispum lorep ispum.",
  // },
  // {
  //   id: "1415",
  //   title: "Feature 6",
  //   image: appImages?.iconPlaceholder,
  //   description: "Lorep ipsum lorep ispum lorep ispum lorep ispum lorep ispum.",
  // },
];

// COPYRIGHT LINKS
export const copyrightLinks = [
  { id: "123", title: "Privacy", link: "/privacy" },
  { id: "456", title: "Terms", link: "/terms" },
  { id: "789", title: "Contact", link: "/contact" },
];

// STATUS LIST
export const statusList = ["Active", "Inactive"];

/************************
  CMS DATA
*************************/
// CMS LINKS
export const cmsLinks = [
  {
    // USER
    id: "user123",
    role: "user",
    title: "My Sample",
    leftIcon: <AiOutlineShoppingCart className={tw?.cmsNavIconLeft} />,
    isDropdown: true,
    options: [
      { title: "Sample Link", link: "/cms/my-sample", status: "active" },
    ],
  },
  {
    // ADMIN
    id: "admin123",
    role: "admin",
    title: "Library",
    link: "/cms/all-library",
    leftIcon: <FiUsers className={tw?.cmsNavIconLeft} />,
    status: "active",
  },
  {
    id: "admin456",
    role: "admin",
    title: "Pages",
    leftIcon: <FiUsers className={tw?.cmsNavIconLeft} />,
    isDropdown: true,
    options: [
      { title: "Home", link: "/cms/all-home", status: "active" },
      { title: "FAQS", link: "/cms/all-faqs", status: "active" },
      { title: "Contact", link: "/cms/all-contact", status: "active" },
    ],
  },
  {
    id: "admin789",
    role: "admin",
    title: "Blog",
    leftIcon: <AiOutlineEdit className={tw?.cmsNavIconLeft} />,
    isDropdown: true,
    options: [
      { title: "All Blog", link: "/cms/all-blog", status: "active" },
      { title: "Create Post", link: "/cms/all-blog-create", status: "active" },
    ],
  },
  {
    id: "admin1011",
    role: "admin",
    title: "Users",
    link: "/cms/all-users",
    leftIcon: <FiUsers className={tw?.cmsNavIconLeft} />,
    status: "active",
  },
];

// USER CMS LINKS
export const userCmsLinks = cmsLinks?.filter((item) => item?.role === "user");

// ADMIN CMS LINKS
export const adminCmsLinks = cmsLinks?.filter((item) => item?.role === "admin");

// GENERAL CMS LINKS
export const generalCmsLinks = ["/cms/settings"];

// NOTIFICATIONS LIST
export const notificationsList = [
  {
    id: "123",
    title: "New App Update",
    description: "Lorep ipsum lorep ipsum lorep ipsum lorep ipsum.",
  },
  {
    id: "456",
    title: "Upcoming event",
    description:
      "Lorep ipsum lorep ipsum lorep ipsum lorep ipsum lorep ipsum lorep ipsum lorep ipsum.",
  },
];
