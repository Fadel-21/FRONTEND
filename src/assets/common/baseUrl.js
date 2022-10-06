import { Platform } from "react-native";

let baseURL = "";

{
  Platform.OS == "android"
    ? (baseURL = "https://97f2-114-124-130-29.ap.ngrok.io/api/v1/")
    : (baseURL = "http://localhost:3000/api/v1");
}

export default baseURL;
