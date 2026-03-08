import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <Drawer screenOptions={{
      headerStyle: {
        backgroundColor: "transparent",
      },
      headerTransparent: true
    }}>
      <Drawer.Screen
        name="(drawer)/builds/index" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: 'Builds',
          title: 'overview',
        }}
      />
      <Drawer.Screen
        name="(drawer)/monsters" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: 'Monsters',
          title: 'overview',
        }}
      />
      <Drawer.Screen
        name="(drawer)/hunters" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: 'Hunters',
          title: 'overview',
        }}
      />
      <Drawer.Screen
        name="(drawer)/map" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: 'Map',
          title: 'overview',
        }}
      />
      <Drawer.Screen
        name="(drawer)/profile" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: 'Profile',
          title: 'overview',
        }}
      />
    </Drawer>
  );
}