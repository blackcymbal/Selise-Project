import { ImageUploadIcon, User } from "@/assets/icons/icons";
import theme from "@/constants/theme";
import { fallbackImages } from "@/utils";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Typography } from "../ui";

export default function ImageUploader() {
  const [image, setImage] = useState("");

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

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    handleImagePicked(result);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    handleImagePicked(result);
  };

  const handleImagePicked = async (result: ImagePicker.ImagePickerResult) => {
    if (!result.canceled) {
      console.log(result);
      setImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  // const formData = new FormData();
  //     formData.append("file", {
  //       name: "photo.jpg",
  //       uri: result.assets[0].uri,
  //       mime: result.assets[0].mimeType,
  //       type: result.assets[0].type,
  //     });

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
      <TouchableOpacity onPress={pickImage} style={styles.profilePicUploadBtn}>
        <ImageUploadIcon
          width={20}
          height={20}
          color={theme.colors.primary700}
        />
        <Typography weight="semiBold" color="primary700">
          ছবি আপলোড করুন
        </Typography>
      </TouchableOpacity>
      <TouchableOpacity onPress={takePhoto}>
        <Typography>Take Photo from camera</Typography>
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
