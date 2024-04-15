"use client";
import React, { useEffect } from "react";
import { createClient } from "../shared/clients/supabase/supabase-server";
import { supabase } from "../shared/clients/supabase/supabase-client";

const Marketing = () => {
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      console.log("User");
      console.log(data);
      console.log(error);
    };
    fetchUser()
  });
  // const supabase = createClient();
  // console.log("User");
  // console.log(data);
  // console.log(error)
  return <div>marketing</div>;
};

export default Marketing;
