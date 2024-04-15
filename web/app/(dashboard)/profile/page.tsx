import { supabase } from "@/app/shared/clients/supabase/supabase-client";
import React from "react";

const Profile = async () => {
  const auth = await supabase.auth.getSession();
  console.log("AUTH", auth);
  return <div>Profile</div>;
};

export default Profile;
