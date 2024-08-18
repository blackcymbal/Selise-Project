import AddBookMarkFrom from "@/components/bookmarks/AddBookMarkFrom";
import BookmarkListByCategory from "@/components/bookmarks/BookmarkListByCategory";
import TopBarHome from "@/components/home/TopBarHome";
import { Button, Container } from "@/components/ui";
import theme from "@/constants/theme";
import { BookmarkContext } from "@/contexts/bookmarkContext";
import React, { useContext, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const [newCategory, setNewCategory] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { addCategory, categories } = useContext(BookmarkContext);

  // console.log("categories ", categories);

  return (
    <>
      <View style={styles.container}>
        <TopBarHome />
        <Container px={26} mt={2}>
          <Button
            active={true}
            onPress={() => {
              setShowModal(true);
            }}
          >
            Add Bookmark
          </Button>
        </Container>
        <BookmarkListByCategory />
      </View>
      <AddBookMarkFrom showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get("screen").height,
    backgroundColor: theme.colors.gray50,
  },
  title: { fontSize: 24, marginBottom: 20 },
  category: { fontSize: 18, marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
});
