import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserViewModel } from "@tajdid-academy/tajdid-corelib";
import { useEffect, useState } from "react";

const useGetLocalData = (key: string, isObject = false) => {
  const [data, setData] = useState<string | UserViewModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      try {
        let storedData = null;
        const jsonValue = await AsyncStorage.getItem(key);
        if (isObject && jsonValue != null) {
          try {
            storedData = JSON.parse(jsonValue);
          } catch (e) {
            console.error("JSON parsing error:", e);
            storedData = null;
          }
        } else {
          storedData = jsonValue;
        }
        if (storedData) {
          setData(storedData);
        }
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [key]);

  return { data: data, loading };
};

export default useGetLocalData;
