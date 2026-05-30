import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d0d7de",
    borderRadius: 16,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: "#57606a",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  value: {
    marginTop: 4,
    fontSize: 28,
    fontWeight: "700",
    color: "#24292f",
  },
  track: {
    height: 12,
    borderRadius: 999,
    backgroundColor: "#eaeef2",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 999,
  },
});
