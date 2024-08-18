import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

type Bookmark = {
  id: number;
  title: string;
  url: string;
  category: string;
};

type Category = {
  id: number;
  title: string;
};

type BookmarkContextType = {
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Omit<Bookmark, "id" | "dateAdded">) => void;
  categories: Category[];
  addCategory: (category: Omit<Bookmark, "id">) => void;
};

const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined
);

const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      const storedCategories = await AsyncStorage.getItem("categories");
      if (storedCategories) {
        setCategories(JSON.parse(storedCategories));
      }

      const storedBookmarks = await AsyncStorage.getItem("bookmarks");

      if (storedBookmarks) {
        setBookmarks(JSON.parse(storedBookmarks));
      }
    };
    loadCategories();
  }, []);

  const currentDate = new Date();
  const currentTimeSeconds = Math.floor(currentDate.getTime() / 1000);

  const addCategory = async (category: Pick<Category, "title">) => {
    if (category.trim() === "") return;
    const updatedCategories = [
      ...categories,
      {
        id: currentTimeSeconds,
        title: category,
      },
    ];
    setCategories(updatedCategories);
    await AsyncStorage.setItem("categories", JSON.stringify(updatedCategories));
    // await AsyncStorage.removeItem("categories");
  };

  const addBookmark = async (bookmark) => {
    const updateBookmarks = [
      ...bookmarks,
      {
        id: currentTimeSeconds,
        ...bookmark,
      },
    ];
    setBookmarks(updateBookmarks);

    await AsyncStorage.setItem("bookmarks", JSON.stringify(updateBookmarks));
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        addBookmark,
        categories,
        addCategory,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export { BookmarkContext, BookmarkProvider };
