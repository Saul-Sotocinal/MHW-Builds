import { StyleSheet } from 'react-native';

export const general_styles = StyleSheet.create({
  safe_area: {
    flex: 1,
    backgroundColor: 'rgb(232, 226, 207)'
  },
  main: {
    flex: 1,
    alignItems: 'center'
  }
});

export const filter_styles = StyleSheet.create({
  menu: {
    position: "absolute",
    bottom: 40,
    backgroundColor: 'rgba(34, 34, 34, 0.8)',
    width: "100%",
    alignItems: "center"
  },

  item: {
    backgroundColor: "white",
    padding: 5,
    margin: 2,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
  }
})

export const sort_styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: 'rgba(34, 34, 34, 0.8)',
    width: '100%',
    padding: 5,
    flexWrap: 'wrap',
    gap: 5,
    flexDirection: 'row',
  }
})

export const builds_display_styles = StyleSheet.create({
  bottom_bar: {
    margin: 20
  },

  bottom_bar_buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 50,
    marginRight: 50
  }
});

export const build_list_styles = StyleSheet.create({
  item: {
    backgroundColor: 'rgb(236, 222, 180)',
    borderColor: "rgb(211, 181, 92)",
    borderWidth: 10,
    display: "flex",
    flexDirection: "row",
    width: 350,
    margin: 10
  },

  details: {
    margin: 10,
    justifyContent: "space-between",
    width: '70%'
  },

  icon: {
    height: 50,
    width: 50,
    margin: 10
  },

  stats: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  damage: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },

  element: {
    height: 30,
    width: 30
  }
});

export const build_card_styles = StyleSheet.create({
  item: {
    backgroundColor: 'rgb(236, 222, 180)',
    borderColor: "rgb(211, 181, 92)",
    borderWidth: 10,
    display: "flex",
    width: 350,
    margin: 10,
    alignItems: "center"
  },

  title: {
    fontSize: 30,
    fontWeight: 600,
    textAlign: "center"
  },

  equipment_card: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: 'rgb(246, 242, 230)',
    width: 300,
    margin: 5
  },

  icon: {
    height: 50,
    width: 50,
    margin: 10
  },

  element: {
    height: 30,
    width: 30
  },

  damage: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },

  stats: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: 'rgb(246, 242, 230)',
    width: 300,
    margin: 5,
    padding: 10
  },

  stats_details: {
    fontSize: 20
  }
})