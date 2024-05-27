import { FilePathUtils } from "./filePathUtils";

const assetsUrl = FilePathUtils?.images();

export const fallbackImages = {
  course: `${assetsUrl}/course-fallback-image.jpg`,
  user: `${assetsUrl}/user-fallback-image.svg`,
};
