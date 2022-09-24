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
  // If stringInput is not a string
  if (!stringInput || typeof stringInput != "string") return;
  // Return
  return stringInput.charAt(0).toUpperCase() + stringInput.slice(1);
}; // close fxn

// HANDLE SLICE STRING
export const handleSliceString = (strInput, sliceFrom, sliceTo) => {
  // If !strInput
  if (!strInput || !sliceTo) return;
  // Define variables
  let result;
  // If strInput
  if (strInput?.length > sliceTo) {
    result = strInput?.slice(sliceFrom, sliceTo) + "...";
  } else {
    result = strInput;
  } // close if
  // Return
  return result;
}; // close fxn

// HANDLE GENERATE USERNAME FROM EMAIL ADDRESS
export const handleGenUsername = (email) => {
  // If data type is string
  if (!email || typeof email === "string") {
    return email?.split("@")[0];
  } else {
    return null;
  } // close if
}; // close fxn

// HANDLE STATUS COLOR
export const handleStatusColor = (status) => {
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
  // Return
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
  // if typeof obj !== object, return
  if (typeof obj !== "object" || !propsToRemove) return;
  // Define variables
  let isEmpty, test;
  // Define newObj - remove propsToRemove properties
  const newObj = handleRemoveObjPropBulk(obj, ...propsToRemove);
  // Define objVal - get values from obj
  const objVal = Object.values(newObj);
  // Check if any objVal is empty
  isEmpty = objVal.includes("");
  test = newObj;
  // Return
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
  // Return
  return finalStrVal?.join(" ");
}; // close fxn

// HANDLE SHOW CURRENCY SYMBOL
export const handleShowCurrSymbol = (slug) => {
  // If !slug, return
  if (!slug) return;
  // Switch slug
  switch (slug) {
    case "wallet-bal":
      return true;
    case "earnings-bal":
      return true;
    case "paid-earnings":
      return true;
    case "pending-earnings":
      return true;
    case "transactions":
      return true;
    default:
      return false;
  } // close switch
}; // close fxn

// HANDLE SPLIT BY CHARACTER
export const handleSplitByChar = (stringInput, splitChar) => {
  // If !stringInput
  if (!stringInput || !splitChar) return;
  // Define result
  const result = stringInput?.split(splitChar);
  const first = result[0];
  const last = result[1];
  // Return
  return { first, last };
}; // close fxn

// HANDLE GENERATE OBJECT ARRAY
export const handleGenObjArr = (x) => {
  // If empty args, return
  if (!x) return;
  // Define variables
  let obj = {};
  // Return
  return [...Array(x).keys()].map(() => obj);
}; // close fxn

// HANDLE NUMBER TO STRING
export function handleNumToString(num) {
  // If empty args, return
  if (!num || typeof num !== "number") return;
  // Convert num to string
  num = num?.toString()?.replace(/[^0-9.]/g, "");
  // If num < 1000
  if (num < 1000) {
    return num;
  } // close if
  // Define stringIntArr
  let si = [
    { v: 1e3, s: "K" },
    { v: 1e6, s: "M" },
    { v: 1e9, s: "B" },
    { v: 1e12, s: "T" },
    { v: 1e15, s: "P" },
    { v: 1e18, s: "E" },
  ];
  // Define index
  let index;
  // Loop
  for (index = si.length - 1; index > 0; index--) {
    if (num >= si[index].v) {
      break;
    } // close if
  } // close if
  // Define result
  const result =
    (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") +
    si[index].s;
  // Return
  return result;
} // close fxn

// HANDLE PAGINATE ARR
export const handleArrPaginator = (items, currentPage, perPageItems) => {
  // If !items return
  if (!items || typeof items !== "object") return;
  // Define variables
  let page = currentPage || 1;
  let perPage = perPageItems || 12;
  let offset = (page - 1) * perPage;
  // Define paginated items
  const paginatedItems = items?.slice(offset).slice(0, perPageItems);
  // Define total pages
  const totalPages = Math.ceil(items?.length / perPage);
  // Return
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
  tranxType,
  tranxAmt,
  tranxFee,
  tranxRef,
  tranxCategory,
  tranxDate
) => {
  // If empty args, return
  if (
    !username ||
    !tranxType ||
    !tranxAmt ||
    !tranxRef ||
    !tranxCategory ||
    !tranxDate
  )
    return null;
  // Define variables
  tranxType = tranxType?.toUpperCase();
  // Return
  return {
    username: username,
    type: tranxType,
    amt: currSymbol?.ngn + intl.format(tranxAmt),
    fee: currSymbol?.ngn + intl.format(tranxFee),
    ref: tranxRef,
    desc: tranxCategory,
    date: tranxDate,
  }; // close return
}; // close fxn

// HANDLE FIND STRING IN ARRAY
export const handleFindStringInArr = (haystack, string) => {
  // If empty args, return null
  if (!haystack || !string) return null;
  // Find string in haystack
  return haystack?.includes(string);
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
  const fileTypeIsValid = handleFindStringInArr(fileExtensions, fileType);
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
  // Return
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

// HANDLE GET USER ROUTES
// GET ROUTE ARR FROM NAV LINKS AND
// CHECK IF ROUTE ARRAY INCLUDES CURRENT ROUTE
export const handleGetUserRoutes = (navLinks, currRoute) => {
  // If empty args, return
  if (!navLinks || !currRoute) return null;
  // Define variables
  let routeArr = [];
  // Generate routeArr from navLinks
  navLinks?.map((item) => {
    //routeArr.push(item?.link);
    // If isDropdown
    if (item?.isDropdown) {
      // Loop item options
      item?.options?.map((opt) => routeArr.push(opt?.link));
    } else {
      routeArr.push(item?.link);
    } // close if isDropdown
  }); // close loop
  // Define isValid access
  let isValid = routeArr?.includes(currRoute);
  //console.log("Debug handleGetUserRoutes: ", routeArr);
  return { routeArr, isValid };
}; // close fxn

// HANDLE IS ROLE ROUTE
// CHECK IF USER ROLE MATCH CURRENT PATH
export const handleIsRoleRoute = (routeArr, currPath) => {
  // If empty args, return
  if (!routeArr || !currPath) return false;
  let isValid = routeArr?.includes(currPath);
  //console.log("Debug handleIsRoleRoute: ", routeArr);
  return isValid;
}; // close fxn

// HANDLE GET POST INFO
export const handleGetPostInfo = (objArr, postID) => {
  // If empty args, return
  if (typeof objArr !== "object" || !postID) return;
  const result = objArr?.find((item) => item?.id === postID);
  return result;
}; // close fxn

// HANDLE GENERATE BLOG SLUG
export const handleGenBlogSlug = (val) => {
  // If empty args, return
  if (!val) return "";
  // Define variables
  val = val?.toLowerCase()?.replace(/ /g, "-");
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
  // // If fileInfo === false
  // if (fileInfo?.isValid === false) {
  //   alert.error(fileInfo?.msg);
  //   return fileInfo?.isValid;
  // } // close if
  // Upload file
  // Create storage ref
  const storageRef = ref(fireStorage, `/${folder}/${fileName}`);
  const uploadTask = await uploadBytesResumable(storageRef, fileInput);
  const url = await getDownloadURL(uploadTask.ref);
  // Debug
  //console.log("Debug fxnUploadUrl: ", url);
  // Return result
  return url;
}; // close fxn

// HANDLE IS PRODUCT IN CART
export const handleGetProdInCart = (objArr, prodID) => {
  // If empty args, return
  if (!objArr || !prodID) return false;
  // Check if newProd is in cart
  const checkProd = objArr?.filter((item) => item?.id === prodID);
  const isValid = checkProd?.length > 0;
  const data = checkProd?.[0];
  // Return result
  return { isValid, data };
}; // close fxn

// HANDLE SUM CART SUBTOTAL
export const handleSumCartSubTotal = (cartArr) => {
  // If empty args, return
  if (!cartArr) return 0;
  // Define variables
  let subTotalArr = [];
  // Loop cartArr to create subTotalArr
  cartArr?.map((item) => {
    subTotalArr.push(item?.prodSubTotal);
  });
  // Sum subTotalArr values
  const sumValue = subTotalArr?.reduce((a, b) => {
    return a + b;
  }, 0);
  // Return result
  return sumValue;
}; // close fxn

// HANDLE GET ALL COUNTRIES
export const handleGetAllCountries = async () => {
  // Return and await response
  return await axios({
    method: "GET",
    url: "https://restcountries.com/v3.1/all",
  })
    .then((apiRes) => {
      // Define resData
      const resData = apiRes.data;
      // Get country name array
      let countryNameArr = [];
      resData?.map((item) => {
        countryNameArr.push(item.name.common);
      });
      // Return
      return countryNameArr?.sort();
    })
    .catch((err) => {
      console.log("Debug handleGetAllCountries: ", err.message);
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

// HANDLE PICKUP LOCATION SELECT
export const handlePickupLocSelect = (objArr) => {
  // If empty args, return
  if (!objArr) return;
  // Convert locations to string array
  const result = objArr?.map((item) => {
    return item?.location;
  });
  // Return result
  return result;
}; // close fxn

// HANDLE GET ORDER INFO
export const handleGetOrderInfo = (objArr, orderID) => {
  // If empty args, return
  if (!objArr || !orderID) return;
  const result = objArr?.filter((item) => item?.id === orderID)?.[0];
  return result;
}; // close fxn

// HANDLE TITLE TO STRING ARRAY
export const handleTitleToStringArr = (objArr) => {
  // If empty args, return
  if (!objArr) return;
  // Return result
  return objArr?.map((item) => item?.title);
}; // close fxn

// HANDLE HTML PARSER
export const handleHtmlParser = (val) => {
  // If empty args, return
  if (!val) return;
  return htmlParser(val);
}; // close fxn

// HANDLE GET ROUTE ARRAY
export const handleGetRouteArr = (linkArr) => {
  // If empty args, return
  if (!linkArr) return [];
  // Define linksArr
  let result = [];
  // Loop linkArr
  linkArr?.map((item) => {
    // Define variables
    const isDropdown = item?.isDropdown;
    const options = item?.options;
    // If isDropdown
    if (isDropdown) {
      // Loop options links
      options?.forEach((opt) => {
        result.push(opt?.link);
      });
    } else {
      // Return normal links
      result.push(item?.link);
    } // close if
  }); // close loop
  // Return
  return result;
}; // close fxn

// HANDLE PRODUCT BOUGHT NAMES
export const handleProdBoughtNames = (prodBoughtArr) => {
  // If empty args, return
  if (!prodBoughtArr) return;
  // Define variables
  const result = prodBoughtArr?.map((item) => item?.prodName)?.join(", ");
  // Return
  return result;
}; // close fxn

// HANDLE GET PRODUCT INFO
export const handleGetProductInfo = (prodArr, rowID) => {
  // If empty args, return
  if (!prodArr || !rowID) return;
  // Return result
  return prodArr?.find((item) => item?.id === rowID);
}; // close fxn
