import { ImageUploadIcon, User } from "@/assets/icons/icons";
import theme from "@/constants/theme";
import { fallbackImages } from "@/utils";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Typography } from "../ui";

export default function ImageUploader() {
  const [image, setImage] = useState("");

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
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
        onPress={pickImageAsync}
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
