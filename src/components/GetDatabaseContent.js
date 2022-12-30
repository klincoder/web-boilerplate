// Import resources
import React, { useEffect, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

// Import custom files
import twStyles from "../styles/twStyles";
import useAppSettings from "../hooks/useAppSettings";
import { allUsersAtom } from "../recoil/atoms";
import { collection, fireDB, onSnapshot } from "../config/firebase";

// Component
const GetDatabaseContent = () => {
  // Define app settings
  const { isMounted } = useAppSettings();

  // Define state
  const setAllUsersAtom = useSetRecoilState(allUsersAtom); // All

  // Debug
  //console.log("Debug getDatabaseContent: ",)

  // SIDE EFFECTS
  // LISTEN TO DATABASE
  useEffect(() => {
    // On mount
    isMounted.current = true;

    // LISTEN TO ALL USERS
    const allUsersRef = collection(fireDB, "users");
    onSnapshot(allUsersRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return doc.data();
      }); // close data
      setAllUsersAtom(data);
    });

    // Clean up
    return () => {
      isMounted.current = false;
    };
  }, [isMounted, setAllUsersAtom]);

  // Return component
  return null;
}; // close component

// Export
export default GetDatabaseContent;
