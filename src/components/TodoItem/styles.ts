import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d0d7de",
  },
  swipeContainer: {
    marginBottom: 12,
  },
  childrenContainer: {
    flex: 1,
    overflow: "hidden",
  },

  completedCard: {
    opacity: 0.6,
  },

  title: {
    fontSize: 16,
    color: "#24292f",
    fontWeight: "500",
  },

  completedTitle: {
    textDecorationLine: "line-through",
  },

  date: {
    marginTop: 4,
    color: "#57606a",
  },

  priority: {
    marginTop: 4,
    color: "#0969da",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  showButton: {
    width: 112,
    borderRadius: 8,
    backgroundColor: "#0969da",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    width: 112,
    borderRadius: 8,
    backgroundColor: "#d1242f",
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    color: "#fff",
    fontWeight: "700",
  },
});
