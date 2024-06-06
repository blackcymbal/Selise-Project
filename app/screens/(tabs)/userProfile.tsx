import Loader from "@/components/global/Loader";
import TopBar from "@/components/global/TopBar";
import { Container, Typography } from "@/components/ui";
import ProfileDetails from "@/components/user-profile/ProfileDetails";
import useAuth from "@/hooks/auth/useAuth";
import { useGetMyProfile } from "@/services/authService";
import { UserViewModel } from "@tajdid-academy/tajdid-corelib";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

const UserProfile = () => {
  const { token, user } = useAuth();
  const { data, error, isLoading } = useGetMyProfile(!!token && !user);

  return (
    <>
      <TopBar />
      {isLoading ? (
        <View style={styles.container}>
          <Loader />
        </View>
      ) : !token ? (
        <View style={styles.container}>
          <Container gap={4} style={{ alignItems: "center" }}>
            <Typography>আপনি এখনো লগিন করেন নি!</Typography>
            <Typography>
              দয়া করে{" "}
              <Link href={"/signIn"}>
                <Typography weight="semiBold" color="blue500">
                  লগিন
                </Typography>
              </Link>{" "}
              করুন
            </Typography>
          </Container>
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
