import { assetsUrl } from '@/config';

export const FilePathUtils = {
  images: () => `${assetsUrl as string}/assets/images`,
  courseImagePath: (id: number) =>
    `${assetsUrl as string}/uploads/courses/${id}/thumbnails`,
  userProfilePath: (id: number) =>
    `${assetsUrl as string}/uploads/users/${id}/profile`,
  resourcePath: (id: number) =>
    `${assetsUrl as string}/uploads/resources/${id}/documents`,
};
