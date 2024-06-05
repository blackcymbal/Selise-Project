import {
  DotsVerticalIcon,
  ImageUploadIcon,
  LogOutIcon,
} from "@/assets/icons/icons";
import theme from "@/constants/theme";
import useAuth from "@/hooks/auth/useAuth";
import { FilePathUtils, fallbackImages } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserViewModel } from "@tajdid-academy/tajdid-corelib";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Radio from "../radio/Radio";
import RadioItem from "../radio/RadioItem";
import { Container, SectionDivider, Typography } from "../ui";
import { ProfileSchema, profileSchema } from "./profile-schema";

const user: Pick<
  UserViewModel,
  | "id"
  | "email"
  | "phone"
  | "name"
  | "role"
  | "picture"
  | "age"
  | "certificateName"
  | "designation"
  | "gender"
> = {
  id: 79,
  email: "soyeb@gmail.com",
  phone: "01303909304",
  name: "সোয়েব চান্দানি",
  certificateName: "Md. Soyeb Chandani",
  role: "LEARNER",
  picture: "soyeb_profile.jpg",
  age: 28,
  designation: "Student",
  gender: "M",
};

export default function ProfileDetails() {
  const [isShow, setIsShow] = useState(true);
  const [image, setImage] = useState("");
  const { removeAuth } = useAuth();

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

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProfileSchema & { email: string }>({
    defaultValues: {
      name: user?.name ?? "",
      certificateName: user?.certificateName ?? "",
      phone: user?.phone?.trim(),
      email: user?.email ?? "",
      designation: user?.designation ?? "",
      picture: user?.picture ?? "",
      age: user?.age ? user?.age : undefined,
      gender: user?.gender ?? "",
    },
    resolver: zodResolver(profileSchema),
    mode: "onChange",
  });

  const onSubmit = (data: ProfileSchema) => {
    Alert.alert("Successful", JSON.stringify(data));
  };

  const handleLogout = () => {
    removeAuth();
    router.replace("/signIn");
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

        <Container>
          <View style={styles.imageContainer}>
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
            <View>
              <Typography weight="bold" size="xl" color="gray900">
                {user?.name}
              </Typography>
              <Typography size="lg" color="gray600">
                {user?.role}
              </Typography>
            </View>
          </View>
          <TouchableOpacity
            style={styles.profilePicUpdateBtn}
            onPress={pickImageAsync}
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
              <Typography color="error500">{errors.name?.message}</Typography>
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
              <Typography color="error500">
                {errors.certificateName?.message}
              </Typography>
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
              <Typography color="error500">{errors.phone?.message}</Typography>
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
              <Typography color="error500">{errors.email?.message}</Typography>
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
              <Typography color="error500">
                {errors.designation?.message}
              </Typography>
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
              <Typography color="error500">{errors.age?.message}</Typography>
            )}
          </View>
          <View style={styles.fieldContainer}>
            <Typography weight="medium" size="sm">
              জেন্ডার*
            </Typography>
            <View>
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
          </View>
          <TouchableOpacity
            style={styles.updateBtn}
            onPress={handleSubmit(onSubmit)}
          >
            <Typography weight="semiBold" color="white">
              প্রোফাইল তথ্য আপডেট করুন
            </Typography>
          </TouchableOpacity>
        </Container>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  profileHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageContainer: {
    gap: 16,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 16,
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
  imageStyle: {
    width: 72,
    height: 72,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: theme.colors.gray200,
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
  updateBtn: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    backgroundColor: theme.colors.primary600,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
});
