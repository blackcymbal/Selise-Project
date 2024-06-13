import { Typography } from "@/components/ui";
import { LoginScreenContainer, ProfileInfo } from "@/components/user";
import ImageUploadBottomSheet from "@/components/user/image-upload/ImageUploadBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet";
import React, { useRef, useState } from "react";
import { StyleSheet } from "react-native";

const createProfileScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [image, setImage] = useState("");

  return (
    <>
      <LoginScreenContainer>
        <Typography weight="semiBold" size="xl" color="gray900" mt={10}>
          প্রোফাইল তথ্যাবলি
        </Typography>
        <ProfileInfo bottomSheetRef={bottomSheetRef} image={image} />
      </LoginScreenContainer>

      <ImageUploadBottomSheet
        bottomSheetRef={bottomSheetRef}
        image={image}
        setImage={setImage}
      />
    </>
  );
};

export default createProfileScreen;

const styles = StyleSheet.create({});
