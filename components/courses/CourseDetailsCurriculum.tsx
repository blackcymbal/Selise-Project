import React from "react";
import { TouchableOpacity, View } from "react-native";
import { CourseViewModel } from "@tajdid-academy/tajdid-corelib";
import { useNumberToLocalizedDigitFormat } from "@/hooks/useNumberToLocalDigitFormat";
import { Container, Typography } from "../ui";
import theme from "@/constants/theme";
import CurriculumModule from "./course-curriculum/CurriculumModule";
import { DownloadIcon } from "@/assets/icons/icons";

type CourseDetailsCurriculumProps = {
  courseDetails: CourseViewModel;
};

const CourseDetailsCurriculum = ({
  courseDetails,
}: CourseDetailsCurriculumProps) => {
  const { numberToDigitFormat } = useNumberToLocalizedDigitFormat();

  return (
    <Container px={0} gap={4}>
      <View
        style={{
          gap: 8,
          alignItems: "flex-start",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Typography weight="semiBold" size="xl" color="gray900">
            কোর্স কারিকুলাম
          </Typography>
          <Typography weight="medium" color="gray700">
            {numberToDigitFormat(courseDetails.curriculum?.length ?? 0)} টি
            মডিউল
          </Typography>
        </View>
        <TouchableOpacity style={{ gap: 8, flexDirection: "row" }}>
          <DownloadIcon
            width={20}
            height={20}
            color={theme.colors.primary700}
          />
          <Typography weight="semiBold" color="primary700">
            ডাউনলোড করুন
          </Typography>
        </TouchableOpacity>
      </View>

      <CurriculumModule courseDetails={courseDetails} />
    </Container>
  );
};

export default CourseDetailsCurriculum;
