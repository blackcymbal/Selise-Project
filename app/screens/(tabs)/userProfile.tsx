import Loader from "@/components/global/Loader";
import TopBar from "@/components/global/TopBar";
import ProfileDetails from "@/components/user-profile/ProfileDetails";
import useAuth from "@/hooks/auth/useAuth";
import { useGetMyProfile } from "@/services/authService";
import { UserViewModel } from "@tajdid-academy/tajdid-corelib";
import { View } from "react-native";

const UserProfile = () => {
  const { token, user } = useAuth();
  const { data, error, isLoading } = useGetMyProfile(!!token && !user);

  return (
    <>
      <TopBar />
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Loader />
        </View>
      ) : (
        <ProfileDetails user={data as UserViewModel} />
      )}
    </>
  );
};

export default UserProfile;
