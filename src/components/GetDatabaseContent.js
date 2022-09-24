// Import resources
import { useEffect, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

// Import custom files
import { useAuthContext } from "../context/AuthContext";
import { handleGetAllCountries } from "../config/functions";
import {
  appSettingsAtom,
  appLibraryAtom,
  allUsersAtom,
  allBlogAtom,
  allBlogCatAtom,
  activeBlogAtom,
  allFaqsAtom,
  activeFaqsAtom,
  userAtom,
  userBlogAtom,
  userBlogCatAtom,
  userActiveBlogAtom,
} from "../recoil/atoms";
import {
  fireDB,
  collection,
  onSnapshot,
  collectionGroup,
  doc,
  query,
  where,
  orderBy,
} from "../config/firebase";

// Component
const GetDatabaseContent = () => {
  // Define isMounted
  const isMounted = useRef(false);

  // Define auth context
  const { user } = useAuthContext();

  // Define variables
  const currUserID = user?.id;

  // Define state
  // All
  const setAllUsersAtom = useSetRecoilState(allUsersAtom);
  const setAllBlogAtom = useSetRecoilState(allBlogAtom);
  const setActiveBlogAtom = useSetRecoilState(activeBlogAtom);
  const setAllBlogCatAtom = useSetRecoilState(allBlogCatAtom);
  const setAllFaqsAtom = useSetRecoilState(allFaqsAtom);
  const setActiveFaqsAtom = useSetRecoilState(activeFaqsAtom);
  // User
  const setUserAtom = useSetRecoilState(userAtom);
  const setUserBlogAtom = useSetRecoilState(userBlogAtom);
  const setUserActiveBlogAtom = useSetRecoilState(userActiveBlogAtom);
  const setUserBlogCatAtom = useSetRecoilState(userBlogCatAtom);
  // Others
  const setAppSettingsAtom = useSetRecoilState(appSettingsAtom);
  const setAppLibraryAtom = useSetRecoilState(appLibraryAtom);

  // Debug
  //console.log("Debug getDatabaseContent: ", currUserID);

  // SIDE EFFECTS
  // API CALLS
  // useEffect(() => {
  //   // On mount
  //   isMounted.current = true;
  //   // IIFE
  //   (async () => {
  //     // GET DATA
  //     // Debug
  //     //console.log("Debug getDatabaseContentAPI: ", getPaystackBanks);
  //   })(); // close fxn
  //   // Clean up
  //   return () => {
  //     isMounted.current = false;
  //   };
  // }, []);

  // SIDE EFFECTS
  // LISTEN TO DATABASE
  useEffect(() => {
    // On mount
    isMounted.current = true;
    // LISTEN TO APP SETTINGS
    const appSettingsRef = collection(fireDB, "appSettings");
    // Snapshot
    onSnapshot(appSettingsRef, (snapshot) => {
      // Define data
      const data = snapshot.docs.map((doc) => {
        return { id: doc.id, data: doc.data() };
      });
      // Set atom
      setAppSettingsAtom(data);
    });

    // LISTEN TO APP LIBRARY
    const appLibraryRef = query(
      collection(fireDB, "appLibrary"),
      orderBy("dateCreated", "desc")
    );
    // Snapshot
    onSnapshot(appLibraryRef, (snapshot) => {
      // Define data
      const data = snapshot.docs.map((doc) => {
        return doc.data();
      });
      // Set atom
      setAppLibraryAtom(data);
    });

    // LISTEN TO ALL USERS
    const allUsersRef = collection(fireDB, "users");
    // Snapshot
    onSnapshot(allUsersRef, (snapshot) => {
      // Define data
      const data = snapshot.docs.map((doc) => {
        return doc.data();
      });
      // Set atom
      setAllUsersAtom(data);
    });

    // LISTEN TO All BLOG POSTS
    const allBlogRef = query(
      collectionGroup(fireDB, "blogPosts"),
      orderBy("datePublished", "desc")
    );
    // Snapshot
    onSnapshot(allBlogRef, (snapshot) => {
      // Define data
      const data = snapshot.docs.map((doc) => {
        return doc.data();
      });
      // Filter blog
      const filterActiveBlog = data?.filter(
        (item) => item?.status === "active"
      );
      // Filter user blog
      const filterUserBlog = data?.filter(
        (item) => item?.userID === currUserID
      );
      // Filter user active blog
      const filterUserActiveBlog = data?.filter(
        (item) => item?.userID === currUserID && item?.status === "active"
      );
      // Set atom
      setAllBlogAtom(data);
      setActiveBlogAtom(filterActiveBlog);
      setUserBlogAtom(filterUserBlog);
      setUserActiveBlogAtom(filterUserActiveBlog);
    });

    // LISTEN TO All BLOG CATEGORIES
    const allBlogCatRef = query(
      collectionGroup(fireDB, "blogCategories"),
      orderBy("dateCreated", "desc")
    );
    // Snapshot
    onSnapshot(allBlogCatRef, (snapshot) => {
      // Define data
      const data = snapshot.docs.map((doc) => {
        return doc.data();
      });
      // Filter user blog categories
      const filterUserBlogCat = data?.filter(
        (item) => item?.userID === currUserID
      );
      // Set atom
      setAllBlogCatAtom(data);
      setUserBlogCatAtom(filterUserBlogCat);
    });

    // LISTEN TO ALL FAQS
    const allFaqsRef = query(
      collection(fireDB, "faqs"),
      orderBy("dateCreated", "desc")
    );
    // Snapshot
    onSnapshot(allFaqsRef, (snapshot) => {
      // Define data
      const data = snapshot.docs.map((doc) => {
        return doc.data();
      });
      // Filter active
      const filterActive = data?.filter((item) => item?.status === "active");
      // Set atom
      setAllFaqsAtom(data);
      setActiveFaqsAtom(filterActive);
    });

    // Debug
    // console.log("Debug getDatabaseContent: ", filterUserBlog);
    // Clean up
    return () => {
      isMounted.current = false;
    };
  }, [
    currUserID,
    setAppSettingsAtom,
    setAppLibraryAtom,
    setAllUsersAtom,
    setAllBlogAtom,
    setActiveBlogAtom,
    setAllBlogCatAtom,
    setAllFaqsAtom,
    setActiveFaqsAtom,
    setUserAtom,
    setUserBlogAtom,
    setUserActiveBlogAtom,
    setUserBlogCatAtom,
  ]);

  // Return component
  return null;
}; // close component

// Export
export default GetDatabaseContent;
