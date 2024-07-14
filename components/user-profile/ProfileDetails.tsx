import { DotsVerticalIcon, LogOutIcon } from "@/assets/icons/icons";
import theme from "@/constants/theme";
import useAuth from "@/hooks/auth/useAuth";
import useGetLocalData from "@/hooks/useGetLocalData";
import {
  UpdateMyProfileRequest,
  useUpdateMyProfile,
} from "@/services/authService";
import BottomSheet from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserViewModel } from "@tajdid-academy/tajdid-corelib";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Radio from "../radio/Radio";
import RadioItem from "../radio/RadioItem";
import { Button, Container, SectionDivider, Typography } from "../ui";
import ErrorMessage from "../ui/ErrorMessage";
import ImageUploadBottomSheet from "../user/image-upload/ImageUploadBottomSheet";
import ImageUpdate from "./ImageUpdate";
import { profileSchema } from "./profile-schema";

type ProfileDetailsProps = {
  user: UserViewModel | null;
};

export default function ProfileDetails({ user }: ProfileDetailsProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [isShow, setIsShow] = useState(true);
  const [image, setImage] = useState("");
  const [uploadedImagePath, setUploadedImagePath] = useState("");
  const { data: phoneNumber, loading: phoneNumerLoading } =
    useGetLocalData("phoneNumber");
  const { removeAuth } = useAuth();
  const { mutate, isPending } = useUpdateMyProfile();

  // console.log("Photo >>>>>>>> ", user?.picture);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateMyProfileRequest & { email: string }>({
    defaultValues: {
      name: user?.name ?? "",
      certificateName: user?.certificateName ?? "",
      phone: user?.phone?.trim(),
      email: user?.email ?? "",
      designation: user?.designation ?? "",
      age: user?.age ? user?.age : undefined,
      gender: user?.gender,
    },
    resolver: zodResolver(profileSchema),
    mode: "onChange",
  });

  const onSubmit = (data: UpdateMyProfileRequest) => {
    if (!user?.id) return;

    const requestData = {
      ...data,
      picture:
        uploadedImagePath.length !== 0 ? uploadedImagePath : user?.picture,
    };
    console.log("requestData ????? ", requestData);
    mutate(requestData);
  };

  const handleLogout = () => {
    removeAuth();
    if (!phoneNumerLoading) {
      router.replace({
        pathname: "/signIn",
        params: { phoneNumber: String(phoneNumber) },
      });
    }
  };

  return (
    <>
      <ScrollView style={{ backgroundColor: theme.colors.white }}>
        <Container pt={4}>
          <View style={styles.profileHeading}>
            <Typography weight="semiBold" size="2xl">
              প্রোফাইল তথ্যাবলি
            </Typography>
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => setIsShow(!isShow)}
            >
              <DotsVerticalIcon width={20} height={20} />
            </TouchableOpacity>
          </View>
          <Typography color="gray700">
            আপনার প্রোফাইলর সব তথ্য দিয়ে আমাদের সহায়তা করুন
          </Typography>
          <View
            style={[
              styles.logOutButtonContainer,
              isShow ? { display: "none" } : { display: "flex" },
            ]}
          >
            <TouchableOpacity style={styles.logOutBtn} onPress={handleLogout}>
              <LogOutIcon
                width={20}
                height={20}
                color={theme.colors.error700}
              />
              <Typography color="error700">লগ আউট</Typography>
            </TouchableOpacity>
          </View>
        </Container>

        <SectionDivider marginVertical={16} />
        <ImageUpdate
          image={image}
          user={user}
          bottomSheetRef={bottomSheetRef}
        />
        <SectionDivider marginVertical={24} />

        <Container gap={4} pb={4}>
          <View style={styles.fieldContainer}>
            <Typography weight="medium" size="sm">
              পুরা নাম*
            </Typography>
            <Controller
              control={control}
              name={"name"}
              rules={{
                required: true,
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  placeholder={value ? value : "পুরা নাম"}
                  style={[
                    styles.inputFieldStyle,
                    errors.name && styles.errorInput,
                  ]}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.name?.message && (
              <ErrorMessage message={errors.name?.message} />
            )}
          </View>
          <View style={styles.fieldContainer}>
            <Typography weight="medium" size="sm">
              সার্টিফিকেট নাম*
            </Typography>
            <Controller
              control={control}
              name={"certificateName"}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  placeholder={value ? value : "সার্টিফিকেট নাম"}
                  style={[
                    styles.inputFieldStyle,
                    errors.certificateName && styles.errorInput,
                  ]}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.certificateName?.message && (
              <ErrorMessage message={errors.certificateName?.message} />
            )}
          </View>
          <View style={styles.fieldContainer}>
            <Typography weight="medium" size="sm">
              মোবাইল নম্বর*
            </Typography>
            <Controller
              control={control}
              name={"phone"}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  placeholder={value ? value : "মোবাইল নম্বর দিন"}
                  style={[
                    styles.inputFieldStyle,
                    errors.phone && styles.errorInput,
                  ]}
                  keyboardType="numeric"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.phone?.message && (
              <ErrorMessage message={errors.phone?.message} />
            )}
          </View>
          <View style={styles.fieldContainer}>
            <Typography weight="medium" size="sm">
              ইমেইল
            </Typography>
            <Controller
              control={control}
              name={"email"}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  placeholder={value ? value : "ইমেইল"}
                  style={[
                    styles.inputFieldStyle,
                    errors.email && styles.errorInput,
                  ]}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.email?.message && (
              <ErrorMessage message={errors.email?.message} />
            )}
          </View>
          <View style={styles.fieldContainer}>
            <Typography weight="medium" size="sm">
              পেশা
            </Typography>
            <Controller
              control={control}
              name={"designation"}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  placeholder={value ? value : "পেশা"}
                  style={[
                    styles.inputFieldStyle,
                    errors.designation && styles.errorInput,
                  ]}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.designation?.message && (
              <ErrorMessage message={errors.designation?.message} />
            )}
          </View>
          <View style={styles.fieldContainer}>
            <Typography weight="medium" size="sm">
              বয়স*
            </Typography>
            <Controller
              control={control}
              name={"age"}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  placeholder={value ? value?.toString() : "বয়স"}
                  style={[
                    styles.inputFieldStyle,
                    errors.age && styles.errorInput,
                  ]}
                  keyboardType="numeric"
                  value={value?.toString()}
                  onChangeText={(text) => onChange(Number(text))}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.age?.message && (
              <ErrorMessage message={errors.age?.message} />
            )}
          </View>
          <View style={styles.fieldContainer}>
            <Typography weight="medium" size="sm">
              জেন্ডার*
            </Typography>
            <Controller
              control={control}
              name={"gender"}
              render={({ field: { value, onChange, onBlur } }) => (
                <Radio style={{ flexDirection: "row", gap: 48 }}>
                  <Radio.Item
                    value="M"
                    selected={value as string}
                    setSelected={onChange}
                    radioActiveColor={theme.colors.primary600}
                    radioActiveFillColor={theme.colors.primary50}
                  >
                    <RadioItem.Label>
                      <Typography>পুরুষ</Typography>
                    </RadioItem.Label>
                  </Radio.Item>
                  <Radio.Item
                    value="F"
                    selected={value as string}
                    setSelected={onChange}
                    radioActiveColor={theme.colors.primary600}
                    radioActiveFillColor={theme.colors.primary50}
                  >
                    <RadioItem.Label>
                      <Typography>মহিলা</Typography>
                    </RadioItem.Label>
                  </Radio.Item>
                </Radio>
              )}
            />
          </View>

          <Button
            active={true}
            isLoading={isPending}
            buttonStyle="inline"
            onPress={handleSubmit(onSubmit)}
          >
            প্রোফাইল তথ্য আপডেট করুন
          </Button>
        </Container>
      </ScrollView>
      <ImageUploadBottomSheet
        bottomSheetRef={bottomSheetRef}
        setImage={setImage}
        setUploadedImagePath={setUploadedImagePath}
      />
    </>
  );
}

const styles = StyleSheet.create({
  profileHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logOutButtonContainer: {
    position: "absolute",
    zIndex: 1,
    top: 50,
    right: 16,
    width: 170,
    padding: 8,
    borderRadius: 8,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.gray100,
    alignSelf: "flex-end",
  },
  logOutBtn: {
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  fieldContainer: {
    gap: 8,
  },
  inputFieldStyle: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.gray200,
    backgroundColor: theme.colors.white,
    fontSize: 16,
    fontFamily: "AnekBangla-Regular",
  },
  errorInput: {
    borderColor: theme.colors.error500,
  },
});
