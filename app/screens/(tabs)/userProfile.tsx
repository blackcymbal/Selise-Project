import Loader from "@/components/global/Loader";
import TopBar from "@/components/global/TopBar";
import ProfileDetails from "@/components/user-profile/ProfileDetails";
import useAuth from "@/hooks/auth/useAuth";
import { useGetMyProfile } from "@/services/authService";
import { UserViewModel } from "@tajdid-academy/tajdid-corelib";
import { StyleSheet, View } from "react-native";

const UserProfile = () => {
  const { token, user } = useAuth();
  const { data, isLoading, refetch } = useGetMyProfile(!!token && !user);

  return (
    <>
      <TopBar />
      {isLoading ? (
        <View style={styles.container}>
          <Loader />
        </View>
      ) : (
        <ProfileDetails user={data as UserViewModel} refetch={refetch} />
      )}
    </>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
