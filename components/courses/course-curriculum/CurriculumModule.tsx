import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { CourseViewModel } from "@tajdid-academy/tajdid-corelib";
import { useNumberToLocalizedDigitFormat } from "@/hooks/useNumberToLocalDigitFormat";
import { Container, Typography } from "@/components/ui";
import Accordion from "@/components/accordion/Accordion";
import AccordionTrigger from "@/components/accordion/AccordionTrigger";
import { DropdownIcon } from "@/assets/icons/icons";
import theme from "@/constants/theme";
import LessonCount from "./LessonCount";
import CurriculumContent from "./CurriculumContent";

type CurriculumModuleProps = {
  courseDetails: CourseViewModel;
};

export default function CurriculumModule({
  courseDetails,
}: CurriculumModuleProps) {
  const { numberToDigitFormat } = useNumberToLocalizedDigitFormat();

  const [isShow, setIsShow] = useState(false);
  const totalModules = courseDetails?.curriculum?.length ?? 0;

  return (
    <Container px={0} gap={4}>
      {courseDetails?.curriculum
        ?.slice(0, isShow ? undefined : 3)
        .map((item, moduleIndex) => (
          <Accordion key={item?.id}>
            <Accordion.Item style={styles.accordionContainer}>
              <Accordion.Trigger style={styles.accordionTriggerContainer}>
                <AccordionTrigger.Content>
                  <View style={styles.moduleCuntContainer}>
                    <View style={styles.moduleCuntLeftDot} />
                    <Typography size="xs" color="primary700">
                      মডিউল {numberToDigitFormat(moduleIndex + 1)}
                    </Typography>
                  </View>
                  <Typography weight="semiBold" color="gray900" py={1}>
                    {item?.title}
                  </Typography>
                  <LessonCount curriculum={item} />
                </AccordionTrigger.Content>
                <AccordionTrigger.Icon>
                  <DropdownIcon />
                </AccordionTrigger.Icon>
              </Accordion.Trigger>

              <Accordion.Content>
                <Container py={4} gap={4} style={styles.contentStyle}>
                  {item?.contents.map((content, index) => (
                    <CurriculumContent
                      key={content?.id}
                      label={content?.title}
                      type={content?.type}
                      id={content?.id}
                      slug={content?.slug}
                      courseSlug={courseDetails?.slug}
                      index={index}
                      moduleIndex={moduleIndex + 1}
                      contentLength={item?.contents?.length}
                      isFree={content?.type !== "QUIZ" && content?.isFree}
                      status={content?.activityStatus}
                    />
                  ))}
                </Container>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>
        ))}

      {totalModules > 3 && (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity
            onPress={() => setIsShow(!isShow)}
            style={{ gap: 8, alignItems: "center", flexDirection: "row" }}
          >
            <Typography weight="semiBold" color="primary700">
              {!isShow
                ? ` আরও ${numberToDigitFormat(totalModules - 3)} টি দেখুন`
                : "কম দেখুন"}
            </Typography>
            <DropdownIcon
              color={theme.colors.primary700}
              style={isShow && { transform: [{ rotateX: "180deg" }] }}
            />
          </TouchableOpacity>
        </View>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  accordionContainer: {
    borderWidth: 1,
    borderColor: theme.colors.gray200,
    borderRadius: 8,
    backgroundColor: theme.colors.gray50,
  },
  accordionTriggerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  moduleCuntContainer: {
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: theme.colors.primaryDefault,
    borderRadius: 16,
    alignSelf: "flex-start",
    gap: 4,
    flexDirection: "row",
    paddingTop: 4,
  },
  moduleCuntLeftDot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: theme.colors.primaryDefault,
    marginTop: 3,
  },
  contentStyle: {
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray100,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
});
