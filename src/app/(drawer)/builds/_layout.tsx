import { DrawerToggleButton } from "@react-navigation/drawer";
import { Stack } from "expo-router";

export default function Layout() {
    return <Stack screenOptions={{
        headerStyle: { backgroundColor: "#FFFFFF55" },
        headerTransparent: true
    }}>
        <Stack.Screen
            name="index"
            options={{ headerLeft: () => <DrawerToggleButton /> }}
        />
        <Stack.Screen
            name="[id]"
            options={{ title: "Set" }}
        />
    </Stack>
}