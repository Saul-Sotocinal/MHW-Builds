import { HiddenBuildsContextProvider } from "@/state/hidden-builds-context";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { Stack } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";

export default function Layout() {
  const db = useSQLiteContext()
  useDrizzleStudio(db);

  return (
    <HiddenBuildsContextProvider>
      <Stack screenOptions={{
        headerStyle: { backgroundColor: "#FFFFFF55" },
        headerTransparent: true
      }}>
        <Stack.Screen
          name="index"
          options={{ headerLeft: () => <DrawerToggleButton />, title: "Builds" }}
        />
        <Stack.Screen
          name="[id]"
          options={{ title: "Build Details" }}
        />
      </Stack>
    </HiddenBuildsContextProvider>
  )
}