// Import resources
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";

// Import custom files
import twStyles from "../styles/twStyles";
import useAppSettings from "../hooks/useAppSettings";
import { allUsersAtom, generalSettingsAtom } from "../recoil/atoms";
import { collection, doc, fireDB, onSnapshot } from "../config/firebase";

// Component
const GetDatabaseContent = () => {
  // Define app settings
  const { isMounted } = useAppSettings();

  // Define state
  const setAllUsers = useSetRecoilState(allUsersAtom);
  const setGeneralSettings = useSetRecoilState(generalSettingsAtom);

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
      setAllUsers(data);
    });

    // LISTEN TO GENERAL SETTINGS
    const generalRef = doc(fireDB, "app_settings", "general_settings");
    onSnapshot(generalRef, (snapshot) => {
      const data = snapshot.exists() ? snapshot.data() : null;
      setGeneralSettings(data);
    });

    // Clean up
    return () => {
      isMounted.current = false;
    };
  }, [isMounted, setAllUsers, setGeneralSettings]);

  // Return component
  return null;
}; // close component

// Export
export default GetDatabaseContent;
