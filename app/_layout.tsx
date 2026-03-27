import "../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="choose-mode" />
        <Stack.Screen name="upload" />
        <Stack.Screen name="studio" />
        <Stack.Screen name="generating" />
        <Stack.Screen name="results" />
      </Stack>
    </>
  );
}
