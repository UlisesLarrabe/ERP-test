"use client";
import { useUserContext } from "@/hooks/useUserContext";
import { useEffect } from "react";
import { User } from "@/consts/user";

const UserPassed = ({ user }: { user: User }) => {
  const { setUser } = useUserContext();
  useEffect(() => {
    setUser(user);
  }, [user]);
  return null;
};

export default UserPassed;
