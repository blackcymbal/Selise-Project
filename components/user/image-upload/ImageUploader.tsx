import { ImageUploadIcon, User } from "@/assets/icons/icons";
import theme from "@/constants/theme";
import { fallbackImages } from "@/utils";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Typography } from "../../ui";

export default function ImageUploader({
  bottomSheetRef,
  image,
}: {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  image: string;
}) {
  useEffect(() => {
    (async () => {
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
    })();
  }, []);

  const handleUploadPhoto = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  return (
    <View style={styles.container}>
      {image ? (
        <Image
          source={{
            uri: image ? image : fallbackImages.user,
          }}
          style={styles.imageStyle}
        />
      ) : (
        <View style={styles.imageStyle}>
          <User color={theme.colors.gray500} height={36} width={36} />
        </View>
      )}
      <TouchableOpacity
        onPress={handleUploadPhoto}
        style={styles.profilePicUploadBtn}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", gap: 16, marginVertical: 16 },
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
  profilePicUploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
});
