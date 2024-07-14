import { KeyboardAvoidingContainer, Typography } from "@/components/ui";
import { LoginScreenContainer, ProfileInfo } from "@/components/user";
import ImageUploadBottomSheet from "@/components/user/image-upload/ImageUploadBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";
const createProfileScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [image, setImage] = useState("");
  const [uploadedImagePath, setUploadedImagePath] = useState("");

  return (
    <KeyboardAvoidingContainer>
      <>
        <LoginScreenContainer>
          <Typography weight="semiBold" size="xl" color="gray900" mt={10}>
            প্রোফাইল তথ্যাবলি
          </Typography>
          <ProfileInfo
            bottomSheetRef={bottomSheetRef}
            image={image}
            uploadedImagePath={uploadedImagePath}
          />
        </LoginScreenContainer>

        <ImageUploadBottomSheet
          bottomSheetRef={bottomSheetRef}
          setImage={setImage}
          setUploadedImagePath={setUploadedImagePath}
        />
      </>
    </KeyboardAvoidingContainer>
  );
};

export default createProfileScreen;
