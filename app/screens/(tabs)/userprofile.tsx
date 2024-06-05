import TopBar from "@/components/global/TopBar";
import ProfileDetails from "@/components/user-profile/ProfileDetails";
import useAuth from "@/hooks/auth/useAuth";
import { useGetMyProfile } from "@/services/authService";
import React from "react";

const UserProfile = () => {
  const { token, user } = useAuth();
  const { data, isLoading } = useGetMyProfile();

  return (
    <>
      <TopBar />
      <ProfileDetails />
    </>
  );
};

export default UserProfile;
