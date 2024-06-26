import Loader from "@/components/global/Loader";
import TopBar from "@/components/global/TopBar";
import ProfileDetails from "@/components/user-profile/ProfileDetails";
import { useGetMyProfile } from "@/services/authService";
import { UserViewModel } from "@tajdid-academy/tajdid-corelib";
import { StyleSheet, View } from "react-native";

const UserProfile = () => {
  const { data, isPending } = useGetMyProfile();

  return (
    <>
      <TopBar />
      {isPending ? (
        <View style={styles.container}>
          <Loader />
        </View>
      ) : (
        <ProfileDetails user={data as UserViewModel} />
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
