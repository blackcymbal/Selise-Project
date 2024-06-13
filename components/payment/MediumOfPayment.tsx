import { LockIcon } from "@/assets/icons/icons";
import theme from "@/constants/theme";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Radio, RadioItem } from "../radio";
import { Container, Typography } from "../ui";

type MediumOfPaymentProps = {
  isFreeCourse: boolean;
  paymentMethod: string;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
};

export default function MediumOfPayment({
  isFreeCourse,
  paymentMethod,
  setPaymentMethod,
}: MediumOfPaymentProps) {
  return (
    <Container gap={isFreeCourse ? 1 : 6}>
      <View style={styles.rowCenterBetween}>
        <Typography weight="bold" size="xl">
          পেমেন্ট মাধ্যম
        </Typography>
        {!isFreeCourse && (
          <View style={styles.paymentTag}>
            <LockIcon width={16} height={16} color={theme.colors.primary600} />
            <Typography size="sm" color="primary600">
              সম্পূর্ণ নিরাপদ পেমেন্ট
            </Typography>
          </View>
        )}
      </View>
      {!isFreeCourse && (
        <Radio style={{ gap: 16 }}>
          <Radio.Item
            selected={paymentMethod}
            setSelected={setPaymentMethod}
            value="NAGAD"
            style={styles.radioContainer}
            radioActiveColor={theme.colors.primary600}
            radioActiveFillColor={theme.colors.primary50}
          >
            <RadioItem.Label>
              <View style={styles.labelContainer}>
                <View>
                  <Typography>নগদ</Typography>
                </View>
                <View>
                  <Image
                    width={48}
                    height={20}
                    resizeMode="contain"
                    source={{
                      uri: "https://iconape.com/wp-content/png_logo_vector/nagad-logo.png",
                    }}
                  />
                </View>
              </View>
            </RadioItem.Label>
          </Radio.Item>
          <Radio.Item
            selected={paymentMethod}
            setSelected={setPaymentMethod}
            value="SSL_COMMERZ"
            style={styles.radioContainer}
            radioActiveColor={theme.colors.primary600}
            radioActiveFillColor={theme.colors.primary50}
          >
            <RadioItem.Label>
              <View style={styles.labelContainer}>
                <View>
                  <Typography>অন্যান্য পেমেন্ট মাধ্যম</Typography>
                </View>
                <View
                  style={{
                    gap: 16,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Image
                    width={29}
                    height={24}
                    resizeMode="contain"
                    source={{
                      uri: "https://pngimg.com/d/visa_PNG30.png",
                    }}
                  />
                  <Image
                    width={20}
                    height={16}
                    resizeMode="contain"
                    source={{
                      uri: "https://w7.pngwing.com/pngs/397/885/png-transparent-logo-mastercard-product-font-mastercard-text-orange-logo.png",
                    }}
                  />
                  <Image
                    width={24}
                    height={16}
                    resizeMode="contain"
                    source={{
                      uri: "https://i.pinimg.com/474x/30/a4/e4/30a4e42613a30af996ba45510a5150e3.jpg",
                    }}
                  />
                </View>
              </View>
            </RadioItem.Label>
          </Radio.Item>
        </Radio>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  paymentTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: theme.colors.primary600,
    borderRadius: 99,
  },
  rowCenterBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  radioContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.colors.gray300,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    width: "92%",
  },
});
