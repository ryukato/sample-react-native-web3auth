import Constants, { AppOwnership } from "expo-constants";
import * as Linking from "expo-linking";

const scheme = "yyoo-test-web3auth";

export const resolvedRedirectUrl =
  Constants.appOwnership == AppOwnership.Expo || Constants.appOwnership == AppOwnership.Guest
    ? Linking.createURL("web3auth", {})
    : Linking.createURL("web3auth", { scheme: scheme });