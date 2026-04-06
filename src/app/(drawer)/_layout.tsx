import { BuildsContextProvider } from "@/components/builds/builds-context";
import { initDb } from "@/db/init";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { SQLiteProvider } from "expo-sqlite";

export default function Layout() {
  return (
    <SQLiteProvider databaseName="mhwbuilds.db" onInit={initDb}>
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
              title: 'Monsters(Unfinished)',
            }}
          />
          <Drawer.Screen
            name="hunters"
            options={{
              drawerLabel: 'Hunters',
              title: 'Hunters(Unimplemented)',
            }}
          />
          <Drawer.Screen
            name="map"
            options={{
              drawerLabel: 'Map',
              title: 'Map(Unimplemented)',
            }}
          />
          <Drawer.Screen
            name="profile"
            options={{
              drawerLabel: 'Profile',
              title: 'Profile(Unimplemented)',
            }}
          />
        </Drawer>
      </BuildsContextProvider>
    </SQLiteProvider>
  );
}