import { BuildsContextProvider } from "@/components/builds/builds-context-provider";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <BuildsContextProvider>
      <Drawer screenOptions={{
        headerStyle: { backgroundColor: "#FFFFFF55" },
        headerTransparent: true,
        headerLeft: () => <DrawerToggleButton />
      }}>
        <Drawer.Screen
          name="(drawer)/builds"
          options={{
            drawerLabel: 'Builds',
            headerShown: false
          }}
        />
        <Drawer.Screen
          name="(drawer)/monsters"
          options={{
            drawerLabel: 'Monsters',
            title: 'overview',
          }}
        />
        <Drawer.Screen
          name="(drawer)/hunters"
          options={{
            drawerLabel: 'Hunters',
            title: 'overview',
          }}
        />
        <Drawer.Screen
          name="(drawer)/map"
          options={{
            drawerLabel: 'Map',
            title: 'overview',
          }}
        />
        <Drawer.Screen
          name="(drawer)/profile"
          options={{
            drawerLabel: 'Profile',
            title: 'overview',
          }}
        />
      </Drawer>
    </BuildsContextProvider>
  );
}