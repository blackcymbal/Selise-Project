import theme from "@/constants/theme";
import { UserUpdateRequest, useUpdateProfile } from "@/services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, TextInput, View } from "react-native";
import Radio from "../global/radioButton/Radio";
import RadioItem from "../global/radioButton/RadioItem";
import { Button, Typography } from "../ui";
import ErrorMessage from "../ui/ErrorMessage";
import ImageUploader from "./ImageUploader";
import { profileInfoSchema } from "./schema/SignupSchemas";

const ProfileInfo = () => {
  const updateProfileMutation = useUpdateProfile();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserUpdateRequest>({
    resolver: zodResolver(profileInfoSchema),
    mode: "onChange",
  });

  const onSubmit = (data: UserUpdateRequest) => {
    updateProfileMutation.mutate(data);
  };

  return (
    <View style={styles.container}>
      <ImageUploader />
      <Typography
        color="gray700"
        weight="medium"
        size="sm"
        style={styles.label}
      >
        পুরা নাম*
      </Typography>

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.name && styles.errorInput]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.name?.message && (
        <ErrorMessage message={errors.name?.message} style={styles.errorText} />
      )}
      <Typography
        color="gray700"
        weight="medium"
        size="sm"
        style={styles.label}
      >
        বয়স*
      </Typography>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        name="age"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.age && styles.errorInput]}
            onBlur={onBlur}
            onChangeText={(text) => onChange(Number(text))}
            value={value?.toString()}
            keyboardType="numeric"
          />
        )}
      />
      {errors.age?.message && (
        <ErrorMessage message={errors.age?.message} style={styles.errorText} />
      )}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        name="gender"
        render={({ field: { onChange, onBlur, value } }) => (
          <Radio
            style={[styles.radioButton, errors.gender ? styles.radioError : {}]}
          >
            <Radio.Item
              value="M"
              selected={value}
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
              selected={value}
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

      <Button
        active={isValid ? true : false}
        buttonStyle="inline"
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
      >
        সাইন আপ করুন
      </Button>
    </View>
  );
};

export default ProfileInfo;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    marginBottom: 4,
  },
  input: {
    fontSize: 16,
    fontFamily: "AnekBangla-Regular",
    color: theme.colors.gray900,
    height: 48,
    borderRadius: 8,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 12,
  },
  errorInput: {
    borderColor: theme.colors.error500,
  },
  errorText: {
    marginBottom: 8,
  },
  radioButton: {
    flexDirection: "row",
    gap: 48,
  },
  radioError: {
    borderBottomWidth: 1,
    borderBottomColor: "red",
  },
  button: {
    marginTop: 28,
  },
});
