import { DrawerToggleButton } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <Drawer screenOptions={{
      headerStyle: { backgroundColor: "#FFFFFF55"},
      headerTransparent: true,
      headerLeft: () => <DrawerToggleButton/>
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
          title: 'overview',
        }}
      />
      <Drawer.Screen
        name="hunters"
        options={{
          drawerLabel: 'Hunters',
          title: 'overview',
        }}
      />
      <Drawer.Screen
        name="map" 
        options={{
          drawerLabel: 'Map',
          title: 'overview',
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: 'Profile',
          title: 'overview',
        }}
      />
    </Drawer>
  );
}