import TopBar from "@/components/global/TopBar";
import Radio from "@/components/radio/Radio";
import RadioItem from "@/components/radio/RadioItem";
import { Typography } from "@/components/ui";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const UserProfile = () => {
  const [gender, setGender] = useState("");
  console.log("from profile: ", gender);

  return (
    <View>
      <TopBar />
      <Text>UserProfile</Text>

      <Radio style={{ flexDirection: "row", gap: 48 }}>
        <Radio.Item
          value="M"
          selected={gender}
          setSelected={setGender}
          style={{ flexDirection: "row", gap: 8 }}
        >
          <RadioItem.Label>
            <Typography>পুরুষ</Typography>
          </RadioItem.Label>
        </Radio.Item>
        <Radio.Item
          value="F"
          selected={gender}
          setSelected={setGender}
          style={{ flexDirection: "row", gap: 8 }}
        >
          <RadioItem.Label>
            <Typography>মহিলা</Typography>
          </RadioItem.Label>
        </Radio.Item>
      </Radio>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({});
