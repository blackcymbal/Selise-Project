import { ImageUploadIcon, User } from "@/assets/icons/icons";
import theme from "@/constants/theme";
import { FilePathUtils, fallbackImages } from "@/utils";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { UserViewModel } from "@tajdid-academy/tajdid-corelib";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Container, Typography } from "../ui";

type ImageUpdateProps = {
  image: string;
  user: UserViewModel | null;
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
};

export default function ImageUpdate({
  image,
  user,
  bottomSheetRef,
}: ImageUpdateProps) {
  const requestPermissions = async () => {
    if (Constants?.platform?.ios) {
      const cameraRollStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      if (
        cameraRollStatus.status !== "granted" ||
        cameraStatus.status !== "granted"
      ) {
        alert("Sorry, we need these permissions to make this work!");
      }
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  const handleUploadPhoto = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };
  return (
    <Container>
      <View style={styles.imageContainer}>
        {image || user?.picture ? (
          <Image
            source={{
              uri: image
                ? image
                : user?.picture
                ? `${FilePathUtils.userProfilePath(user.id)}/${user.picture}`
                : fallbackImages.user,
            }}
            style={styles.imageStyle}
          />
        ) : (
          <View style={styles.imageStyle}>
            <User color={theme.colors.gray500} height={36} width={36} />
          </View>
        )}
        <View>
          <Typography weight="bold" size="xl" color="gray900">
            {user?.name}
          </Typography>
          <Typography size="lg" color="gray600">
            {user?.designation}
          </Typography>
        </View>
      </View>
      <TouchableOpacity
        style={styles.profilePicUpdateBtn}
        onPress={handleUploadPhoto}
      >
        <ImageUploadIcon
          width={20}
          height={20}
          color={theme.colors.primary700}
        />
        <Typography weight="semiBold" color="primary700">
          ছবি আপলোড করুন
        </Typography>
      </TouchableOpacity>
    </Container>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    gap: 16,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  imageStyle: {
    width: 72,
    height: 72,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: theme.colors.gray200,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.gray100,
  },
  profilePicUpdateBtn: {
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: theme.colors.primary600,
    backgroundColor: theme.colors.primary50,
    borderRadius: 8,
  },
});
