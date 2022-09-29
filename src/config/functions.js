// Import resources
import moment from "moment";
import axios from "axios";
import htmlParser from "html-react-parser";

// Import custom files
import { fileExtensions, currSymbol, baseUrl } from "./data";
import {
  fireStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "./firebase";

// VARIABLES
const randomCode4 = Math.floor(1000 + Math.random() * 9000);
const randomCode6 = Math.floor(Math.random() * 999999 + 1);
const randomCode10 = Math.floor(1000 + Math.random() * 9000000000);

// FUNCTIONS
// HANDLE SEND EMAIL
export const handleSendEmail = async (
  role,
  toName,
  toEmail,
  msg,
  api,
  fromEmail
) => {
  // If empty args, return
  if (!role || !toName || !toEmail || !msg || !api) return;
  // Return and await response
  return await axios({
    method: "POST",
    url: `${baseUrl}/api/${api}`,
    data: {
      role: role,
      toName: toName,
      toEmail: toEmail,
      msg: msg,
      fromName: "Klincoder",
      fromEmail: fromEmail || "noreply@bulkahia.com",
      footerName: "Klincoder Team",
    },
  }).then((apiRes) => {
    // Define resData
    const resData = apiRes?.data;
    //console.log("Debug handleUserEmail: ", resData);
    return resData;
  });
}; // close fxn

// HANDLE UPPERCASE FIRST
export const handleUppercaseFirst = (stringInput) => {
  // If empty args, return
  if (!stringInput || typeof stringInput != "string") return;
  return stringInput.charAt(0).toUpperCase() + stringInput.slice(1);
}; // close fxn

// HANDLE SLICE STRING
export const handleSliceString = (strInput, sliceFrom, sliceTo) => {
  // If empty args, return
  if (!strInput || !sliceTo) return;
  // Define variables
  let result;
  if (strInput?.length > sliceTo) {
    result = strInput?.slice(sliceFrom, sliceTo) + "...";
  } else {
    result = strInput;
  } // close if
  return result;
}; // close fxn

// HANDLE GENERATE USERNAME FROM EMAIL ADDRESS
export const handleGenUsername = (email) => {
  // If empty args, return
  if (!email || typeof email !== "string") return null;
  return email?.split("@")[0];
}; // close fxn

// HANDLE STATUS COLOR
export const handleStatusColor = (status) => {
  // If empty args, return
  if (!status) return;
  // Define variables
  let color;
  // Switch status
  switch (status) {
    case "active":
      color = "bg-success";
      break;
    case "success":
      color = "bg-success";
      break;
    case "approved":
      color = "bg-success";
      break;
    case "paid":
      color = "bg-success";
      break;
    case "pending":
      color = "bg-warning";
      break;
    case "processing":
      color = "bg-warning";
      break;
    case "completed":
      color = "bg-dark";
      break;
    default:
      color = "bg-danger";
      break;
  } // close switch
  return color;
}; // close fxn

// HANDLE REMOVE OBJ PROP - SINGLE
export const handleRemoveObjProp = (
  propKey,
  { [propKey]: propValue, ...rest }
) => rest;

// HANDLE REMOVE OBJ PROP - BULK
export const handleRemoveObjPropBulk = (obj, ...keys) =>
  keys?.length
    ? handleRemoveObjPropBulk(handleRemoveObjProp(keys?.pop(), obj), ...keys)
    : obj;

// HANDLE IS EMPTY FORM
export const handleIsEmptyForm = (obj, propsToRemove) => {
  // If empty args, return
  if (typeof obj !== "object" || !propsToRemove) return;
  // Define variables
  let isEmpty, test;
  const newObj = handleRemoveObjPropBulk(obj, ...propsToRemove);
  const objVal = Object.values(newObj);
  isEmpty = objVal.includes("");
  return isEmpty;
}; // close fxn

// HANDLE GENERATE OTP CODE
export const handleGenOtpCode = () => {
  return randomCode6?.toString();
}; // close fxn

// HANDLE TITLE CASE
export const handleTitleCase = (strVal) => {
  // If !strVal return
  if (!strVal) return;
  // Convert strVal to lowercase and split each word
  const finalStrVal = strVal?.trim()?.toLowerCase()?.split(" ");
  // Loop finalStrVal and capitalize each word
  for (var i = 0; i < finalStrVal?.length; i++) {
    finalStrVal[i] =
      finalStrVal[i].charAt(0).toUpperCase() + finalStrVal[i].slice(1);
  } // close loop
  return finalStrVal?.join(" ");
}; // close fxn

// HANDLE SPLIT BY CHARACTER
export const handleSplitByChar = (stringInput, splitChar) => {
  // If !stringInput
  if (!stringInput || !splitChar) return;
  // Define result
  const result = stringInput?.split(splitChar);
  const first = result[0];
  const last = result[1];
  return { first, last };
}; // close fxn

// HANDLE GENERATE OBJECT ARRAY
export const handleGenObjArr = (x) => {
  // If empty args, return
  if (!x) return;
  let obj = {};
  return [...Array(x).keys()].map(() => obj);
}; // close fxn

// HANDLE NUMBER TO STRING
export function handleNumToString(num) {
  // If empty args, return
  if (!num || typeof num !== "number") return;
  // Define variables
  let index, si, result;
  num = num?.toString()?.replace(/[^0-9.]/g, "");
  si = [
    { v: 1e3, s: "K" },
    { v: 1e6, s: "M" },
    { v: 1e9, s: "B" },
    { v: 1e12, s: "T" },
    { v: 1e15, s: "P" },
    { v: 1e18, s: "E" },
  ];
  // If num < 1000
  if (num < 1000) {
    return num;
  } // close if
  // Loop
  for (index = si.length - 1; index > 0; index--) {
    if (num >= si[index].v) {
      break;
    } // close if
  } // close for
  // Define result
  result =
    (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") +
    si[index].s;
  // Return
  return result;
} // close fxn

// HANDLE PAGINATE ARRAY
export const handlePaginateArr = (items, currentPage, perPageItems) => {
  // If !items return
  if (!items || typeof items !== "object") return;
  // Define variables
  let page = currentPage || 1;
  let perPage = perPageItems || 12;
  let offset = (page - 1) * perPage;
  const paginatedItems = items?.slice(offset).slice(0, perPageItems);
  const totalPages = Math.ceil(items?.length / perPage);
  return {
    page: page,
    perPage: perPage,
    prevPage: page - 1 ? page - 1 : null,
    nextPage: totalPages > page ? page + 1 : null,
    totalItems: items.length,
    totalPages: totalPages,
    data: paginatedItems,
  };
}; // close fxn

// HANDLE GENERATE EMPTY ARRAY
export const handleGenEmptyArr = (x) => {
  // If !items return
  if (!x) return;
  let arr = "";
  return [...Array(x).keys()].map(() => arr);
}; // close fxn

// HANDLE GENERATE TRANX REFERENCE
export const handleGenTranxRef = (prefix) => {
  // Define variables
  prefix = prefix || "GS";
  const result =
    prefix + Math.random().toString(36).toUpperCase().slice(2, 3) + randomCode6;
  // Result
  return result;
}; // close fxn

// HANDLE GENERATE RANDOM CHARACTERS
export const handleGenRandomChar = () => {
  // Define variables
  const result = Math.random()?.toString(36)?.slice(2, 8);
  return result;
}; // close fxn

// HANDLE TRANX EMAIL MSG
export const handleTranxEmailMsg = (
  username,
  type,
  amt,
  fee,
  ref,
  category,
  date
) => {
  // If empty args, return
  if (!username || !type || !amt || !ref || !category || !date) return null;
  // Define variables
  type = type?.toUpperCase();
  return {
    username: username,
    type: type,
    amt: currSymbol?.ngn + intl.format(amt),
    fee: currSymbol?.ngn + intl.format(fee),
    ref: ref,
    desc: category,
    date: date,
  }; // close return
}; // close fxn

// HANDLE FILES TO ACCEPT
export const handleFilesToAccept = (fileArr) => {
  // If emptty args, return
  if (!fileArr) return;
  return fileArr?.map((e) => "." + e)?.join(", ");
}; // close fxn

// HANDLE FILE VALIDATION
export const handleFileValidation = (fileInput, prefix) => {
  // If empty args, return null
  if (!fileInput || !prefix) return null;
  // Define variables
  let isValid, msg;
  const fileName = fileInput?.name;
  const fileSize = fileInput?.size;
  const fileType = fileInput?.type?.split("/").pop();
  const fileTypeIsValid = handleStringInArr(fileExtensions, fileType);
  const newFileName = prefix + "-" + randomCode4 + "." + fileType;
  // Validations
  if (!fileName) {
    isValid = false;
    msg = "No file selected";
  } else if (fileSize > 3200000) {
    isValid = false;
    msg = "File too big"; // Max 3mb
  } else if (fileTypeIsValid === false) {
    isValid = false;
    msg = "Invalid file format";
  } else {
    isValid = true;
    msg = "Valid file";
  } // close if fileName
  // Return
  return { isValid, msg, newFileName };
}; // close fxn

// HANDLE GET USER INFO
export const handleGetUserInfo = (objArr, userID) => {
  // If empty args, return
  if (!objArr || !userID) return;
  const result = objArr?.filter((item) => item?.id === userID)?.[0];
  return result;
}; // close fxn

// HANDLE FORMAT DATE
export const handleFormatDate = (dateVal, formatType) => {
  // If empty args, return
  if (!dateVal) return;
  // Define variables
  let result;
  // Switch formatType
  switch (formatType) {
    case 1:
      result = moment.utc(dateVal).format("MMM D, YYYY");
      break;
    case 2:
      result = moment.utc(dateVal).format("MMM D, YYYY h:mm A");
      break;
    case 3:
      result = moment.utc(dateVal).format("YYYY-MM-DD");
      break;
    default:
      result = moment.utc(dateVal).format();
      break;
  } // close switch
  // Retuurn
  return result;
}; // close fxn

// HANDLE REMOVE OBJ ARR DUPLICATES BY ID
export const handleObjArrDuplicatesById = (objArr) => {
  // If empty args, return
  if (typeof objArr !== "object") return;
  // Remove duplicates by id
  const result = [...new Map(objArr?.map((v) => [v.id, v])).values()];
  return result;
}; // close fxn

// HANDLE REMOVE OBJ ARR DUPLICATES BY NAME
export const handleObjArrDuplicatesByName = (objArr) => {
  // If empty args, return
  if (typeof objArr !== "object") return;
  // Remove duplicates by id
  const result = [...new Map(objArr?.map((v) => [v.name, v])).values()];
  // Return
  return result;
}; // close fxn

// HANDLE VERIFY CMS PAGE ACCESS
export const handleVerifyCmsPageAccess = (cmsLinks, pageAccess, currPath) => {
  // If empty args, return
  if (!cmsLinks || !currPath) return;
  // Define variables
  let isValid, roleLinks, linksArr;
  //console.log("Debug: ", { cmsLinks, pageAccess, currPath });
  // Switch pageAccess
  switch (pageAccess) {
    case "user":
      roleLinks = cmsLinks?.filter((item) => item?.role === pageAccess);
      linksArr = roleLinks?.flatMap((item) => item?.linksArr);
      isValid = linksArr?.includes(currPath);
      break;
    case "admin":
      roleLinks = cmsLinks?.filter((item) => item?.role === pageAccess);
      linksArr = roleLinks?.flatMap((item) => item?.linksArr);
      isValid = linksArr?.includes(currPath);
      break;
    default:
      isValid = true;
      break;
  } // close switch
  // Return
  return isValid;
}; // close fxn

// HANDLE GET INFO BY ID
export const handleGetInfoById = (objArr, rowID) => {
  // If empty args, return
  if (!objArr || !rowID) return;
  const result = objArr?.find((item) => item?.id === rowID);
  return result;
}; // close fxn

// HANDLE GENERATE SLUG
export const handleGenSlug = (val) => {
  // If empty args, return
  if (!val) return "";
  // Define variables
  val = val?.trim()?.toLowerCase()?.replace(/ /g, "-");
  // Remove special characters
  //const removeSpecialChar = val?.replace(/[^a-zA-Z0-9 ]/g, "");
  //const result = removeSpecialChar?.replace(/ /g, "-");
  return val;
}; // close fxn

// HANDLE UPLOAD FILE
export const handleUploadFile = async (fileInput, username, folder) => {
  // If empty args, return null
  if (!fileInput || !username) return null;
  // Define file validations
  folder = folder || "general";
  const fileInfo = handleFileValidation(fileInput, username);
  const fileName = fileInfo?.newFileName;
  // Create storage ref
  const storageRef = ref(fireStorage, `/${folder}/${fileName}`);
  const uploadTask = await uploadBytesResumable(storageRef, fileInput);
  const url = await getDownloadURL(uploadTask.ref);
  //console.log("Debug fxnUploadUrl: ", url);
  return url;
}; // close fxn

// HANDLE GET ALL COUNTRIES
export const handleGetAllCountries = async () => {
  // Return and await response
  return await axios({
    method: "GET",
    url: "https://restcountries.com/v3.1/all",
  }).then((apiRes) => {
    // Define resData
    const resData = apiRes.data;
    let countryNameArr = [];
    resData?.map((item) => {
      countryNameArr.push(item.name.common);
    });
    return countryNameArr?.sort();
  });
}; // close fxn

// HANDLE GENERATE INVOICE NUMBER
export const handleGenInvoiceNo = () => {
  // Defien variables
  const invCode = "#INV" + randomCode6;
  return invCode;
}; // close fxn

// HANDLE PICKER MAX DATE
export const handlePickerMaxDate = (months) => {
  // If empty args, return
  if (!months) return;
  // Define variables
  const today = new Date();
  const maxDate = new Date(today.setMonth(today.getMonth() + months));
  return maxDate;
}; // close fxn

// HANDLE SELECT OPTIONS BY LOCATION
export const handleSelectOptByLoc = (objArr) => {
  // If empty args, return
  if (!objArr) return;
  const result = objArr?.map((item) => {
    return item?.location;
  });
  return result;
}; // close fxn

// HANDLE GENERATE ARRAY BY TITLE
export const handleGenArrByTitle = (objArr) => {
  // If empty args, return
  if (!objArr) return;
  return objArr?.map((item) => item?.title);
}; // close fxn

// HANDLE HTML PARSER
export const handleHtmlParser = (val) => {
  // If empty args, return
  if (!val) return;
  return htmlParser(val);
}; // close fxn

// HANDLE PRODUCT BOUGHT NAMES
export const handleProdBoughtNames = (prodBoughtArr) => {
  // If empty args, return
  if (!prodBoughtArr) return;
  const result = prodBoughtArr?.map((item) => item?.prodName)?.join(", ");
  return result;
}; // close fxn

// HANDLE IS VALID URL
export const handleIsValidUrl = (str) => {
  // If empty args, return
  if (!str) return false;
  // Define regex pattern
  const pattern = RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$", // fragment locator
    "i"
  );
  // Return
  return pattern.test(str);
}; // close fxn

// HANDLE CATEGORY EXIST
export const handleCategoryExist = (objArr, str) => {
  // If empty args, return
  if (!objArr || !str) return;
  // Filter objArr
  const filterObjArr = objArr?.filter((item) => item?.category === str);
  const isValid = filterObjArr?.length > 0;
  const data = filterObjArr[0];
  return { isValid, data };
}; // close fxn

// HANDLE SLUG EXIST
export const handleSlugExist = (objArr, str) => {
  // If empty args, return
  if (!objArr || !str) return;
  // Filter objArr
  const filterObjArr = objArr?.filter((item) => item?.slug === str);
  const isValid = filterObjArr?.length > 0;
  const data = filterObjArr[0];
  return { isValid, data };
}; // close fxn

// HANDLE SELECT OPTIONS BY TITLE
export const handleSelectOptByTitle = (objArr) => {
  // If empty args, return
  if (!objArr) return;
  const result = objArr?.map((item) => {
    return item?.title;
  });
  return result;
}; // close fxn
