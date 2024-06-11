import {
  CourseCurriculum,
  CourseViewModel,
  ModuleViewModel,
} from "@tajdid-academy/tajdid-corelib";

export const CourseUtils = {
  getTotalModules: (curriculum: CourseViewModel["curriculum"]) => {
    return curriculum?.length ?? 0;
  },
  getTotalCompletedModule: (curriculum: CourseViewModel["curriculum"]) => {
    if (!curriculum) {
      return 0;
    }

    return curriculum.reduce((acc, curr) => {
      return acc + (curr.isCompleted ? 1 : 0);
    }, 0);
  },
  calculateProgress: (curriculum: CourseViewModel["curriculum"]) => {
    if (!curriculum) {
      return 0;
    }

    const completedContent = curriculum
      .flatMap((module) => module.contents)
      .filter((content) => content.activityStatus === "COMPLETED");

    const totalContents = curriculum.reduce((total, module) => {
      return total + module.contents.length;
    }, 0);

    const percentageCompleted = (completedContent.length / totalContents) * 100;
    return percentageCompleted | 0;
  },
  calculateTotalLessonsUsingCurriculum: (curriculums: CourseCurriculum[]) => {
    const totalLessons = curriculums.reduce((count, module) => {
      return (
        count +
        module.contents.filter((content) => content.type === "LESSON").length
      );
    }, 0);
    return totalLessons;
  },
  calculateTotalLessonsUsingModules: (modules?: ModuleViewModel[]) => {
    const totalLessons = modules?.reduce(
      (acc, module) => acc + (module._count?.lessons ?? 0),
      0
    );
    return totalLessons;
  },
  curriculumContentTypeToLinkMap: {
    LESSON: (courseSlug: string, slug: string) =>
      `/my-curriculum/${courseSlug}/contents/${slug}`,
    QUIZ: (courseSlug: string, slug: string) =>
      `/my-curriculum/${courseSlug}/quizzes/${slug}`,
    RESOURCE: (courseSlug: string, slug: string) =>
      `/my-curriculum/${courseSlug}/resources/${slug}`,
  },
  calculateDiscountedPrice: (price: number, discountPercentage = 0) => {
    const discountAmount = price * (discountPercentage / 100);

    let discountedPrice = price - discountAmount;

    discountedPrice = Math.round(discountedPrice);

    return discountedPrice;
  },
};
