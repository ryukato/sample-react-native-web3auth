import {Buffer} from "buffer";
import { resolvedRedirectUrl} from "./Web3AuthRedirectUrl";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView, Dimensions} from 'react-native';
import React, { useState } from "react";
import Web3Auth, { LOGIN_PROVIDER, OPENLOGIN_NETWORK } from "@web3auth/react-native-sdk";
import * as WebBrowser from "expo-web-browser";

global.Buffer = global.Buffer || require('buffer').Buffer;

const clientId = "BKfFo1yc5FleAJ_0iF7C3gMwnTyL8WUUwNFh9i_HOa9QY-pRBnyMKh-_mhkxQ8reAoNcbkcCFmGklYEr7Y0JlH0";

export default function App() {
  const [key, setKey] = useState("");
  const [userInfo, setUserInfo] = useState("");

  const login = async () => {
    try {
      console.log("Logging in");
      const web3auth = new Web3Auth(WebBrowser, {
        clientId,
        network: OPENLOGIN_NETWORK.TESTNET, // MAINNET, AQUA,  CYAN or TESTNET
      });

      const info = await web3auth.login({
        redirectUrl: resolvedRedirectUrl,
        mfaLevel: "default", // Pass on the mfa level of your choice: default, optional, mandatory, none
        loginProvider: "google", // Pass on the login provider of your choice: google, facebook, discord, twitch, twitter, github, linkedin, apple, etc.
      });

      setUserInfo(info);
      setKey(info.privKey);
      console.log("Logged In");
    } catch (e) {
      console.log(e);
    }
  };


  const loggedInView = (
    <View style={styles.buttonArea}>
      <Button title="Get User Info" onPress={() => console.log(userInfo)} />
      <Button title="Get Private Key" onPress={() => console.log(key)} />
      <Button title="Log Out" onPress={() => setKey('')} />
    </View>
  );

  const unloggedInView = (
    <View style={styles.buttonArea}>
      <Button title="Login with Web3Auth" onPress={login} />
    </View>
  );

  return (
    <View style={styles.container}>
      {key ? loggedInView : unloggedInView}
      <View style={styles.consoleArea}>
        <Text style={styles.consoleText}>Console:</Text>
        <ScrollView style={styles.console}>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 30,
  },
  consoleArea: {
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  console: {
    flex: 1,
    backgroundColor: '#CCCCCC',
    color: '#ffffff',
    padding: 10,
    width: Dimensions.get('window').width - 60,
  },
  consoleText: {
    padding: 10,
  },
  buttonArea: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 30,
  },
});