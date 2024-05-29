import { BookOpen, Home, MortarBoard, UserSquare } from "@/assets/icons/icons";

export const navList = [
  {
    name: "হোম",
    navTo: "index",
    icon: Home,
  },
  {
    name: "কোর্স সমূহ",
    navTo: "courses",
    icon: BookOpen,
  },
  {
    name: "আমার কোর্স",
    navTo: "mycourses",
    icon: MortarBoard,
  },
  {
    name: "প্রোফাইল",
    navTo: "userprofile",
    icon: UserSquare,
  },
];

const apiEndpoint = process.env.API_ENDPOINT;
const assetsUrl = process.env.PUBLIC_ASSETS_URL;
export { apiEndpoint, assetsUrl };
