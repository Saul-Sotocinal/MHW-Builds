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
          name="builds"
          options={{
            drawerLabel: 'Builds',
            headerShown: false
          }}
        />
        <Drawer.Screen
          name="monsters"
          options={{
            drawerLabel: 'Monsters',
            title: 'Monsters',
          }}
        />
        <Drawer.Screen
          name="hunters"
          options={{
            drawerLabel: 'Hunters',
            title: 'Hunters',
          }}
        />
        <Drawer.Screen
          name="map"
          options={{
            drawerLabel: 'Map',
            title: 'Map',
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: 'Profile',
            title: 'Profile',
          }}
        />
      </Drawer>
    </BuildsContextProvider>
  );
}