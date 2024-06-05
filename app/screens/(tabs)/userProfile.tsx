import TopBar from "@/components/global/TopBar";
import ProfileDetails from "@/components/user-profile/ProfileDetails";
import useAuth from "@/hooks/auth/useAuth";
import { useGetMyProfile } from "@/services/authService";
import { UserViewModel } from "@tajdid-academy/tajdid-corelib";
import React from "react";

const UserProfile = () => {
  const { token, user } = useAuth();

  let data = null;

  if (token || user) {
    data = useGetMyProfile();
  }

  return (
    <>
      <TopBar />
      <ProfileDetails user={data?.data as UserViewModel} />
    </>
  );
};

export default UserProfile;
