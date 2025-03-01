import { useEffect, useState } from "react";
import { userPreferences } from "../shared/api/user";

export function useAuthProvider() {
  const [user, setUser] = useState<string | undefined>(undefined);

  useEffect(() => {
    userPreferences()
      .then((res) => {
        setUser(res.username);
      })
      .catch((err) => {
        console.error("Error fetching user preferences:", err);
      });
  }, []);
  return {
    user,
  };
}
