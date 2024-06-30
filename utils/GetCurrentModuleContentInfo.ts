import { CourseCurriculum } from "@tajdid-academy/tajdid-corelib";

export function getCurrentModuleAndContentInfo(
  contentId: number | undefined,
  curriculum: CourseCurriculum[]
) {
  const currentModuleIndex =
    curriculum?.findIndex((module) =>
      module.contents.find((content) => content?.id === contentId)
    ) ?? -1;

  const currentModule = curriculum[currentModuleIndex];

  const contentIndex =
    currentModule?.contents.findIndex((content) => content?.id === contentId) ??
    0;

  const content = currentModule.contents[contentIndex];

  if (currentModuleIndex !== -1) {
    return {
      currentModule: currentModule,
      currentModuleIndex: currentModuleIndex + 1,
      contentIndex: contentIndex + 1,
      content,
    };
  }

  return {};
}
