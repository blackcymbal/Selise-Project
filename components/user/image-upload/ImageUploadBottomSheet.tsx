import { Album, Camera } from "@/assets/icons/icons";
import { Typography } from "@/components/ui";
import theme from "@/constants/theme";
import useAuth from "@/hooks/auth/useAuth";
import { useUploadUserProfile } from "@/services/authService";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import * as ImagePicker from "expo-image-picker";
import React, { useCallback } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type ImageUploadBottomSheetProps = {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setUploadedImagePath: React.Dispatch<React.SetStateAction<string>>;
};

export default function ImageUploadBottomSheet({
  bottomSheetRef,
  setImage,
  setUploadedImagePath,
}: ImageUploadBottomSheetProps) {
  const { user } = useAuth();

  const uploadUserProfile = useUploadUserProfile();
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const snapPoints = ["25%"];

  // Render backdrop component
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.6}
      />
    ),
    []
  );

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
      console.log("image >>> ", result.assets);

      setImage(result.assets[0].uri);

      const file = {
        path: result.assets[0].uri,
        name: result.assets[0].fileName,
        type: result.assets[0].mimeType,
        size: result.assets[0].fileSize,
        webkitRelativePath: "",
      };

      const formData = new FormData();
      formData.append("file", file);
      formData.append("id", user ? user?.id?.toString() : "");
      uploadUserProfile.mutate(formData, {
        onSuccess: (data) => {
          setUploadedImagePath(data?.data?.name);
        },
      });
      bottomSheetRef.current?.close();
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={{ gap: 12 }}>
          <TouchableOpacity onPress={takePhoto} style={styles.panelButton}>
            <Camera height={28} width={28} color={theme.colors.body} />
            <Typography size="lg" weight="medium">
              ছবি তুলুন
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImage} style={styles.panelButton}>
            <Album height={28} width={28} color={theme.colors.body} />
            <Typography size="lg" weight="medium">
              ছবি নির্বাচন করুন
            </Typography>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  panelButton: {
    flexDirection: "row",
    gap: 12,
  },
});
