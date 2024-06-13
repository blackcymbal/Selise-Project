import { Typography } from "@/components/ui";
import { LoginScreenContainer, ProfileInfo } from "@/components/user";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import ImageUploadBottomSheet from "@/components/user/image-upload/ImageUploadBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";

const createProfileScreen = () => {
  const params = useLocalSearchParams();

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
