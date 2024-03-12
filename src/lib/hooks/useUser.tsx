import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createSupabaseClient } from "../supabase/client";

export default function useUser() {
  const supabase = createSupabaseClient();

  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchAuth = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (!error) {
        setUserData(user);
      } else {
        setUserData(null);
      }
    };

    fetchAuth();
  }, [supabase.auth]);

  return userData;
}
