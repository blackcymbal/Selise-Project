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

const apiEndpoint = "https://api.dev.tajdidacademy.com";
const assetsUrl = "https://dev-assets.tajdidacademy.com";
export { apiEndpoint, assetsUrl };
