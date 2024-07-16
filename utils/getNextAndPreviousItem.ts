import { CourseCurriculum } from "@tajdid-academy/tajdid-corelib";
import { CourseUtils } from "./courseUtils";

export const getNextAndPreviousItem = (
  courseId: number,
  curriculum: CourseCurriculum[],
  contentId: number
) => {
  const curriculumContents = curriculum.flatMap((module) => module.contents);
  const currentContentIndex = curriculumContents.findIndex(
    (content) => content.id === contentId
  );
  const nextItem = curriculumContents[currentContentIndex + 1];
  const previousItem = curriculumContents[currentContentIndex - 1];

  return {
    nextLink:
      nextItem &&
      CourseUtils.curriculumContentTypeToLinkMap[nextItem.type](
        courseId,
        nextItem.id
      ),
    previousLink:
      previousItem &&
      CourseUtils.curriculumContentTypeToLinkMap[previousItem.type](
        courseId,
        previousItem.id
      ),
  };
};
