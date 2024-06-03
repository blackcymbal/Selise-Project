import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { UserViewModel } from "@tajdid-academy/tajdid-corelib";
import {
  DotsVerticalIcon,
  ImageUploadIcon,
  LogOutIcon,
} from "@/assets/icons/icons";
import TopBar from "../global/TopBar";
import { Container, SectionDivider, Typography } from "../ui";
import theme from "@/constants/theme";
import Radio from "../radio/Radio";
import RadioItem from "../radio/RadioItem";

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
> = {
  id: 52,
  email: "soyeb@gmail.com",
  phone: "01303909304",
  name: "সোয়েব চান্দানী",
  certificateName: "Md. Soyeb Chandani",
  role: "LEARNER",
  picture:
    "https://dev.tajdidacademy.com/_next/image?url=https%3A%2F%2Fdev-assets.tajdidacademy.com%2Fuploads%2Fusers%2F52%2Fprofile%2Fimages.jfif&w=96&q=75",
  age: 28,
};

export default function ProfileDetails() {
  const [isShow, setIsShow] = useState(true);
  const [gender, setGender] = useState("");

  return (
    <>
      <TopBar />
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
            <TouchableOpacity style={styles.logOutBtn}>
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
                uri: user?.picture ? user?.picture : "",
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
          <TouchableOpacity style={styles.profilePicUpdateBtn}>
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
            <TextInput
              style={styles.inputFieldStyle}
              defaultValue={user?.name ? user?.name : "নাম"}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Typography weight="medium" size="sm">
              সার্টিফিকেট নাম*
            </Typography>
            <TextInput
              style={styles.inputFieldStyle}
              defaultValue={
                user?.certificateName
                  ? user?.certificateName
                  : "সার্টিফিকেট নাম"
              }
            />
          </View>
          <View style={styles.fieldContainer}>
            <Typography weight="medium" size="sm">
              মোবাইল নম্বর*
            </Typography>
            <TextInput
              style={styles.inputFieldStyle}
              defaultValue={user?.phone ? user?.phone : "মোবাইল নম্বর দিন"}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Typography weight="medium" size="sm">
              ইমেইল
            </Typography>
            <TextInput
              style={styles.inputFieldStyle}
              defaultValue={user?.email ? user?.email : "ইমেইল"}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Typography weight="medium" size="sm">
              পেশা
            </Typography>
            <TextInput
              style={styles.inputFieldStyle}
              defaultValue={user?.role ? user?.role : "পেশা"}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Typography weight="medium" size="sm">
              বয়স*
            </Typography>
            <TextInput
              style={styles.inputFieldStyle}
              inputMode="decimal"
              defaultValue={user?.age ? "28" : "বয়স"}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Typography weight="medium" size="sm">
              জেন্ডার*
            </Typography>
            <View>
              <Radio style={{ flexDirection: "row", gap: 48 }}>
                <Radio.Item
                  value="M"
                  selected={gender}
                  setSelected={setGender}
                  radioActiveColor={theme.colors.primary600}
                  radioActiveFillColor={theme.colors.primary50}
                >
                  <RadioItem.Label>
                    <Typography>পুরুষ</Typography>
                  </RadioItem.Label>
                </Radio.Item>
                <Radio.Item
                  value="F"
                  selected={gender}
                  setSelected={setGender}
                  radioActiveColor={theme.colors.primary600}
                  radioActiveFillColor={theme.colors.primary50}
                >
                  <RadioItem.Label>
                    <Typography>মহিলা</Typography>
                  </RadioItem.Label>
                </Radio.Item>
              </Radio>
            </View>
          </View>
          <TouchableOpacity style={styles.updateBtn}>
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
