// Import resources
import axios from "axios";
import dayjs from "dayjs";
import dayjsUTC from "dayjs/plugin/utc";
dayjs.extend(dayjsUTC);
import htmlParser from "html-react-parser";
import bcryptjs from "bcryptjs";

// Import custom files
import { baseUrl, currSymbol, fileExtensions } from "./data";
import { doc, fireDB, getDoc } from "./firebase";

// VARIABLES
// FUNCTIONS
// HANDLE GET PAGE DETAILS
export const handleGetPageDetails = async (docID) => {
  // If empty args, return
  if (!docID) return;
  const docRef = doc(fireDB, "pages", docID);
  const docSnap = await getDoc(docRef);
  const docData = docSnap.exists() ? docSnap.data() : null;
  return docData;
}; // close fxn

// HANDLE GET SITE INFO
export const handleGetSiteInfo = async () => {
  // Define ref
  const docRef = doc(fireDB, "app_settings", "general_settings");
  const docSnap = await getDoc(docRef);
  const docData = docSnap.exists() ? docSnap.data() : null;
  return { name: docData?.app_name, noReply: docData?.support_email_reply };
}; // close fxn

// HANDLE SEND EMAIL
export const handleSendEmail = async (newMsg, api) => {
  // If empty args, return
  if (!newMsg || !api?.api || !api?.tempID) return null;
  // Define variables
  const siteInfo = await handleGetSiteInfo();
  let defaultMsg = {
    role: "user",
    toName: "",
    toEmail: "",
    fromName: siteInfo?.name,
    fromEmail: siteInfo?.noReply,
  };
  const finalMsg = { ...defaultMsg, ...newMsg };
  // Return and await response
  return await axios({
    method: "POST",
    url: `/api/${api?.api}`,
    data: { msg: finalMsg, tempID: api?.tempID },
  }).then((res) => {
    return res?.data;
  }); // close return
}; // close fxn

// HANDLE RANDOM CODE
export const handleRandomCode = (val) => {
  val = Number(val);
  // Switch
  switch (val) {
    case 6:
      return Math.floor(Math.random() * 999999 + 1);
    case 10:
      return Math.floor(1000 + Math.random() * 9000000000);
    default:
      return Math.floor(1000 + Math.random() * 9000);
  } // close switch
}; // close fxn

// HANDLE RANDOM STRING
export const handleRandomString = (val) => {
  val = Number(val);
  // Switch
  switch (val) {
    case 6:
      return Math.random().toString(36).slice(2, 3);
    case 10:
      return Math.random().toString(36).slice(2, 3);
    default:
      return Math.random().toString(36).slice(2, 3);
  } // close switch
}; // close fxn

// HANDLE FIND ID
export const handleFindId = (objArr, rowID) => {
  // If empty args, return
  if (!objArr || !rowID) return;
  const result = objArr?.find((i) => i?.id === rowID);
  if (result) {
    return result;
  } else {
    return {};
  } // close if
}; // close fxn

// HANDLE FILTER ID
export const handleFilterId = (objArr, id) => {
  // If empty args, return
  if (!objArr || !id) return;
  const result = objArr?.filter((i) => i?.id === id);
  if (result?.length > 0) {
    return result;
  } else {
    return [];
  } // close if
}; // close fxn

// HANDLE FILTER STATUS
export const handleFilterStatus = (objArr, status) => {
  // If empty args, return
  if (!objArr) return;
  status = status || "active";
  const result = objArr?.filter((i) => i?.status === status);
  if (result?.length > 0) {
    return result;
  } else {
    return [];
  } // close if
}; // close fxn

// HANDLE FILTER USER ID
export const handleFilterUserId = (objArr, userID) => {
  // If empty args, return
  if (!objArr || !userID) return;
  const result = objArr?.filter((i) => i?.user_id === userID);
  if (result?.length > 0) {
    return result;
  } else {
    return [];
  } // close if
}; // close fxn

// HANDLE FILTER SELLER ID
export const handleFilterSellerId = (objArr, sellerID) => {
  // If empty args, return
  if (!objArr || !sellerID) return;
  const result = objArr?.filter((i) => i?.seller_id === sellerID);
  if (result?.length > 0) {
    return result;
  } else {
    return [];
  } // close if
}; // close fxn

// HANDLE FILTER CATEGORY & STATUS
export const handleFilterCategory = (objArr, category, status) => {
  // If empty args, return
  if (!objArr || !category) return;
  status = status || "active";
  const result = objArr?.filter(
    (i) => i?.category === category && i?.status === status
  );
  if (result?.length > 0) {
    return result;
  } else {
    return [];
  } // close if
}; // close fxn

// HANDLE FILTER KYC
export const handleFilterKyc = (objArr, category, status) => {
  // If empty args, return
  if (!objArr || !category) return [];
  status = status || "pending";
  const result = objArr?.filter(
    (i) => i?.category === category && i?.status === status
  );
  if (result?.length > 0) {
    return result;
  } else {
    return [];
  } // close if
}; // close fxn

// HANDLE FILTER SLUG
export const handleFilterSlug = (objArr, val) => {
  // If empty args, return
  if (!objArr || !val) return;
  const result = objArr?.filter((i) => i?.slug === val);
  if (result?.length > 0) {
    return result;
  } else {
    return [];
  } // close if
}; // close fxn

// HANDLE SLICE STRING
export const handleSliceString = (strInput, sliceFrom, sliceTo, holder) => {
  // If empty args, reurn
  if (!strInput || !sliceTo) return;
  let result;
  holder = holder || "...";
  if (strInput?.length > sliceTo) {
    result = `${strInput?.slice(sliceFrom, sliceTo)}${holder}`;
  } else {
    result = strInput;
  } // close if
  return result;
}; // close fxn

// HANDLE SELECT BULK ITEM
export const handleSelectBulkItem = (itemID, objArr) => {
  // If empty args, return
  if (!itemID || !objArr) return null;
  // Define tempArr
  let tempArr = objArr?.map((item) => {
    if (itemID === item?.id) {
      return { ...item, isChecked: !item?.isChecked };
    } // close if
    // Return item
    return item;
  }); // close get item
  // Define variables
  // let selectedItem = objArr?.filter((item) => item?.isChecked);
  // Return
  return tempArr;
  //return { getItem, selectedItem };
}; // close if

// HANDLE SELECT BULK ITEM STRING
export const handleSelectBulkItemStr = (objArr) => {
  // If empty args, return null
  if (!objArr) return null;
  // Get all keys
  const allKeys = objArr?.map((obj) => {
    return obj?.key;
  });
  const result = allKeys?.join(", ");
  // Return
  return result;
}; // close fxn

// HANDLE UPPERCASE FIRST LETTER
export const handleUppercaseFirst = (stringInput) => {
  // If typeof stringInput != string
  if (typeof stringInput != "string") return "";
  return stringInput.charAt(0).toUpperCase() + stringInput.slice(1);
}; // close fxn

// HANDLE FORMAT NUMBER
export const handleFormatNumber = (value, decimal) => {
  // Define variables
  let result;
  decimal = decimal || 0;
  // If value > 0
  if (value > 0) {
    result = parseFloat(value)
      .toFixed(decimal)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  } else {
    result = 0;
  } // close if
  // Return
  return result;
}; // close fxn

// HANDLE TEXTAREA PHONE NUMBERS
export const handleTextareaPhoneNumbers = (values) => {
  // Define variables
  // Split textarea values to array and trim it
  const trimPhone = values?.split(/[\r?\n,]+/).map((item) => item.trim());
  // Filter empty values from keywords array
  const filterPhone = trimPhone.filter((a) => a);
  // Remove duplicates
  const uniquePhone = [...new Set(filterPhone)];
  // Define phoneArr
  const phoneArr = uniquePhone?.map((item) => item.replace("0", "+234"));
  // Finally... replace first character with 234
  const finalPhone = uniquePhone
    ?.map((item) => item.replace("0", "+234"))
    .join(", ");
  // Count phone
  const finalPhoneCount = uniquePhone?.length;
  // Check if each phoneNum === 11
  const isValidPhone = uniquePhone?.every((item) => {
    if (item?.length === 11) {
      return true;
    } else {
      return false;
    } // close if
  }); // close isValidPhone
  // Return
  return { finalPhone, finalPhoneCount, isValidPhone, phoneArr };
}; // close fxn

// GENERATE USERNAME FROM EMAIL ADDRESS
export const handleGenUsername = (email) => {
  // If data type is string
  if (typeof email === "string") {
    return email.split("@")[0];
  } else {
    return null;
  } // close if
}; // close fxn

// HANDLE GENERATE OTP CODE
export const handleGenOtpCode = () => {
  // Define code - random 6 digit numbers
  const randomCode = handleRandomCode(6);
  return randomCode?.toString();
}; // close fxn

// SAMPLE - HANDLE FORM SELECT ITEMS
export const handleFormSelectItems = (objArr) => {
  // If !obj, return
  if (!objArr || typeof objArr != "object") return;
  // Define result
  let result = [];
  // Loop objArr and generate new objArr
  objArr?.map((item) => {
    result.push({
      label: item.name,
      value: item.slug,
      image: "",
      fee: item.receiveFee,
    });
  });
  // Return
  return result;
}; // close fxn

// HANDLE GENERATE TRANX REFERENCE
export const handleGenTranxRef = (prefix) => {
  // Define variables
  const prefixFinal = prefix || "BA";
  const randomCode = handleRandomCode(6);
  const randomStr = handleRandomString(6);
  const result = prefixFinal + randomStr.toUpperCase() + randomCode;
  return result;
}; // close fxn

// HANDLE STATUS COLOR
export const handleStatusColor = (status) => {
  // If empty args, return
  if (!status || typeof status != "string") return "";
  // Define variable
  let color;
  // Switch status
  switch (status) {
    case "active":
      color = `bg-[${appColors?.success}]`;
      break;
    case "success":
      color = `bg-[${appColors?.success}]`;
      break;
    case "approved":
      color = `bg-[${appColors?.success}]`;
      break;
    case "paid":
      color = `bg-[${appColors?.success}]`;
      break;
    case "pending":
      color = `bg-[${appColors?.warning}]`;
      break;
    case "processing":
      color = `bg-[${appColors?.warning}]`;
      break;
    case "completed":
      color = `bg-[${appColors?.black}]`;
      break;
    default:
      color = `bg-[${appColors?.danger}]`;
      break;
  } // close switch
  // Return
  return color;
}; // close fxn

// HANDLE SUM TRANX AMT
export const handleSumTranxAmt = (objArr, itemName) => {
  // If !objArr or objArr != object, return
  if (!itemName || !objArr || objArr != "object") return;
  // Loop objArr - convert objArr to arr
  const convertObjArrToArr = objArr?.map((obj) => {
    return obj?.itemName;
  });
  // Sum arr value
  const sumArrValue = convertObjArrToArr?.reduce((a, b) => {
    return a + b;
  }, 0);
  // Return
  return sumArrValue;
}; // close funx

// HANDLE REMOVE OBJ PROP - SINGLE
export const handleRemoveObjProp = (
  propKey,
  { [propKey]: propValue, ...rest }
) => rest;

// HANDLE REMOVE OBJ PROP - BULK
export const handleBulkRemoveObjProp = (obj, ...keys) => {
  return keys?.length
    ? handleBulkRemoveObjProp(handleRemoveObjProp(keys?.pop(), obj), ...keys)
    : obj;
}; // close fxn

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

// HANDLE TITLE CASE
export const handleTitleCase = (strVal) => {
  // If !strVal return
  if (!strVal) return;
  // Convert strVal to lowercase and split each word
  const finalStrVal = strVal?.toLowerCase()?.split(" ");
  // Loop finalStrVal and capitalize each word
  for (var i = 0; i < finalStrVal?.length; i++) {
    finalStrVal[i] =
      finalStrVal[i].charAt(0).toUpperCase() + finalStrVal[i].slice(1);
  } // close loop
  // Return
  return finalStrVal?.join(" ");
}; // close fxn

// HANDLE IS POSTIVE NUMBER
export const handleIsPositiveNum = (val) => {
  // Define variables
  val = val || 0;
  // Check balance
  if (Math?.sign(val) !== -1) {
    return true;
  } else {
    return false;
  } // close if
}; // close fxn

// HANDLE JAVASCRIPT DATE ADD DAYS
export const handleJsDateAddDays = (dateVal, days) => {
  // If empty args, return
  if (!dateVal || typeof days !== "number") return null;
  let result = new Date(dateVal);
  result.setDate(result.getDate() + days);
  return result;
}; // close fxn

// HANDLE DAYJS DIFFERENCE
export const handleDayJsDiff = (date1, date2, unit) => {
  // If empty args, return
  if (!date1 || !date2) return 0;
  date1 = dayjs(date1);
  date2 = dayjs(date2);
  unit = unit || "day";
  const result = date2?.diff(date1, unit);
  return result;
}; // close fxn

// HANDLE DAYJS FORMAT
export const handleDayJsFormat = (dateVal, num, formatVal) => {
  // Define variables
  dateVal = dateVal || undefined;
  formatVal = formatVal || "YYYY";
  let result;
  // Switch num
  switch (num) {
    case 1:
      result = dayjs.utc(dateVal).format("MMM D, YYYY");
      break;
    case 2:
      result = dayjs.utc(dateVal).format("MMM D, YYYY h:mm A");
      break;
    case 3:
      result = dayjs.utc(dateVal).format(formatVal);
      break;
    default:
      result = dayjs.utc(dateVal).format();
      break;
  } // close switch
  // Retuurn
  return result;
}; // close fxn

// HANDLE DAYSJS ADD DAYS
export const handleDayJsAddDays = (val, units) => {
  // If empty args, return
  if (!val) return null;
  units = units || "days";
  const result = dayjs().add(val, units);
  const resultFormat = handleDayJsFormat(result);
  return resultFormat;
}; // close fxn

// HANDLE ITEM IS IN OBJECT ARRAY
export const handleItemIsInObjArr = (objArr, id) => {
  // If empty args, return
  if (!objArr || !id) return false;
  const checkIItem = objArr?.filter((i) => i?.id === id);
  const isValid = checkIItem?.length > 0;
  return isValid;
}; // close fxn

// HANDLE ITEM IS IN ARRAY
export const handleItemIsInArr = (arr, val) => {
  // If empty args, return
  if (!arr || !val) return false;
  return arr?.includes(val);
}; // close fxn

// HANDLE ADD ITEM TO OBJECT ARRAY
export const handleAddItemToObjArr = (objArr, id, currItem) => {
  // If empty args, return
  if (!objArr || !id || !currItem) return [];
  // Check if item in objArr
  const objArrLen = objArr?.length;
  const isInObjArr = handleItemIsInObjArr(objArr, id);
  const newArr = isInObjArr
    ? objArr?.filter((i) => i?.id !== id)
    : [...objArr, currItem];
  // If objArrLen
  if (objArrLen > 0) {
    if (isInObjArr) {
      return newArr;
    } else {
      return newArr;
    } // close if
  } else {
    return newArr;
  } // close if
}; // close fxn

// HANDLE ADD ITEM TO ARRAY
export const handleAddItemToArr = (arr, currItem) => {
  // If empty args, return
  if (!arr || !currItem) return [];
  // Check if item in array
  const arrLen = arr?.length;
  const isInArr = handleItemIsInArr(arr, currItem);
  const newArr = isInArr
    ? arr?.filter((i) => i !== currItem)
    : [...arr, currItem];
  // If arrLen
  if (arrLen > 0) {
    if (isInArr) {
      return newArr;
    } else {
      return newArr;
    } // close if
  } else {
    return newArr;
  } // close if
}; // close fxn

// HANDLE GET SAVED ITEM
export const handleGetSavedItem = (objArr, id) => {
  // If empty args, return
  if (!objArr || !id) return null;
  const getData = objArr?.filter((i) => i?.data?.id === id);
  const isValid = getData?.length > 0;
  const data = getData?.[0];
  return { isValid, data };
}; // close fxn

// HANDLE GET INFO BY ID
export const handleGetInfoById = (objArr, id) => {
  // If empty args, return
  if (!objArr || !id) return null;
  const getData = objArr?.filter((i) => i?.id === id);
  const isValid = getData?.length > 0;
  const data = getData?.[0];
  return { isValid, data };
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
    totalItems: items?.length,
    totalPages: totalPages,
    data: paginatedItems,
  }; // close return
}; // close fxn

// HANDLE GENERATE EMPTY ARRAY
export const handleGenEmptyArr = (x) => {
  let arr = "";
  return [...Array(x).keys()].map(() => arr);
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
  return result;
}; // close fxn

// HANDLE VERIFY PAGE ACCESS
export const handleVerifyPageAccess = (cmsLinks, pageAccess, currPath) => {
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
  }).then((res) => {
    // Define resData
    const resData = res.data;
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
  const today = new Date();
  const maxDate = new Date(today.setMonth(today.getMonth() + months));
  return maxDate;
}; // close fxn

// HANDLE GENERATE ARRAY BY TITLE
export const handleGenArrByTitle = (objArr) => {
  // If empty args, return
  if (!objArr) return;
  return objArr?.map((i) => i?.title);
}; // close fxn

// HANDLE HTML PARSER
export const handleHtmlParser = (val) => {
  // If empty args, return
  if (!val) return;
  return htmlParser(val);
}; // close fxn

// HANDLE PRODUCT BOUGHT NAMES
export const handleProdBoughtNames = (objArr) => {
  // If empty args, return
  if (!objArr) return;
  const result = objArr?.map((i) => i?.prodName)?.join(", ");
  return result;
}; // close fxn

// HANDLE IS URL
export const handleIsUrl = (val) => {
  // If empty args, return
  if (!val) return false;
  const pattern = RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$", // fragment locator
    "i"
  );
  return pattern?.test(val);
}; // close fxn

// HANDLE SORT OBJARR BY STEP
export const handleSortObjArrStep = (objArr) => {
  // If empty args, return
  if (!objArr) return;
  let newArr = [...objArr];
  const result = newArr?.sort((a, b) => (a?.step > b?.step ? 1 : -1));
  return result;
}; // close fxn

// HANDLE FIREADMIN ACTIONS
export const handleFireAdminAction = async (email, action) => {
  // If empty args, return
  if (!email || !action) return null;
  return await axios({
    method: "POST",
    url: `/api/fireadmin`,
    data: { action, email },
  }).then((res) => {
    return res?.data;
  });
}; // close fxn

// HANDLE IS EMAIL
export const handleIsEmail = (val) => {
  // If empty args return
  if (!val) return false;
  const pattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
  return pattern.test(val);
}; // close fxn

// HANDLE HASH VAL
export const handleHashVal = (rawVal) => {
  // If empty args, return
  if (!rawVal) return null;
  return bcryptjs.hashSync(rawVal);
}; // close fxn

// HANDLE COMPARE HASH VAL
export const handleCompareHashVal = (newVal, hashVal) => {
  // If empty args, return
  if (!newVal || !hashVal) return null;
  //const rawValHash = handleHashVal(rawVal);
  return bcryptjs.compareSync(newVal, hashVal);
}; // close fxn
