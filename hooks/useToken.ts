import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const useToken = (key: string) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem(key);

        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Failed to load token", error);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, [key]);

  return { token, loading };
};

export default useToken;
