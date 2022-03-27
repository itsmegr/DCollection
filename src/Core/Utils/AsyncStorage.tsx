import AsyncStorage from "@react-native-async-storage/async-storage";
export const getIsFirstTime = async () => {
  try {
    const value = await AsyncStorage.getItem("@isFirstTime");
    if (value != null) {
      return value === "true" ? true : false;
    } else return true;
  } catch (e) {}
};

export const setIsFirstTime = async (value: boolean) => {
  try {
    let data1: string = value ? "true" : "false";
    const jsonValue = JSON.stringify(data1);
    await AsyncStorage.setItem("@isFirstTime", jsonValue);
  } catch (e) {
    // saving error
  }
};
