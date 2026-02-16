import { StyleSheet } from 'react-native';

export const general_styles = StyleSheet.create({
    safe_area: {
         flex: 1, 
         backgroundColor: '#fff'
    },

    main: {
        flex: 1, 
        alignItems: 'center'
    }
});

export const build_list_styles = StyleSheet.create({
  build_list_item: {
    backgroundColor: 'rgb(236, 222, 180)',
    borderColor: "rgb(211, 181, 92)",
    borderWidth: 10,
    display: "flex",
    flexDirection: "row",
    width: 350,
    margin: 10
  },

  build_list_details: {
    margin: 10,
    justifyContent: "space-between",
    width: '70%'
  },

  build_list_icon: {
    height: 50,
    width: 50,
    margin: 10
  },

  build_list_stats: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  build_list_damage: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },

  build_list_element: {
    height: 30,
    width: 30
  }
});