import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import instructorsBg from "@/assets/images/instructors-bg.png";
import { Container, Typography } from "../ui";
import Accordion from "../accordion/Accordion";
import AccordionTrigger from "../accordion/AccordionTrigger";
import { DropdownIcon } from "@/assets/icons/icons";
import theme from "@/constants/theme";

export default function CourseDetailsFaq() {
  const faqs = [
    {
      id: 1,
      title: " আমার কি ভিডিওগুলোর লাইফটাইম এক্সেস থাকবে?",
      content: "  হ্যাঁ, ভিডিও এবং রিসোর্সের লাইফটাইম এক্সেস পাবেন।",
    },
    {
      id: 2,
      title: " কোর্স করার জন্য আমার কি ধরনের ডিভাইস থাকতে হবে?",
      content: "  আপনার একটি স্মার্ট ফোন অথবা ল্যাপটপ/ডেস্কটপ থাকলে হবে।",
    },
    {
      id: 3,
      title: " কোর্সের ভিডিও কখন দেখতে হবে?",
      content: "  আপনি যে কোনো সময় দেখতে পারবেন।",
    },
    {
      id: 4,
      title: " পরীক্ষার কোনো ব্যবস্থা থাকবে?",
      content: "  হ্যাঁ, প্রতিটি মডিউলের জন্য ১ টি করে কুইজ থাকবে।",
    },
  ];

  return (
    <Container px={0} gap={4}>
      <Typography weight="semiBold" size="xl" color="gray900">
        প্রায়ই জিজ্ঞেস করা প্রশ্ন
      </Typography>
      <ImageBackground
        source={instructorsBg}
        resizeMode="cover"
        style={styles.faqsContainer}
      >
        {faqs?.map((item, index) => (
          <Accordion key={index} style={styles.accordionContainer}>
            <Accordion.Trigger style={styles.triggerContainer}>
              <AccordionTrigger.Content style={{ width: "75%" }}>
                <Typography weight="semiBold">{item?.title}</Typography>
              </AccordionTrigger.Content>
              <AccordionTrigger.Icon style={styles.triggerIcon}>
                <DropdownIcon width={20} height={20} />
              </AccordionTrigger.Icon>
            </Accordion.Trigger>
            <Accordion.Content>
              <Typography size="sm" pt={2}>
                {item?.content}
              </Typography>
            </Accordion.Content>
          </Accordion>
        ))}
      </ImageBackground>
    </Container>
  );
}

const styles = StyleSheet.create({
  faqsContainer: {
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 16,
    backgroundColor: theme.colors.primary50,
    overflow: "hidden",
  },
  accordionContainer: {
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary600,
    backgroundColor: theme.colors.white,
    padding: 16,
    borderRadius: 8,
  },
  triggerContainer: {
    width: "100%",
    gap: 19,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  triggerIcon: {
    backgroundColor: theme.colors.primary50,
    alignSelf: "flex-start",
    borderRadius: 24,
    padding: 4,
  },
});
