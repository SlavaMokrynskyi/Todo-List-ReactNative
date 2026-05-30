import { StyleSheet } from "react-native";

import { BottomTabInset } from "../../constants/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f8fa",
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: BottomTabInset + 24,
  },
  overline: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.2,
    color: "#57606a",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#24292f",
  },
  subtitle: {
    fontSize: 16,
    color: "#57606a",
    marginTop: 8,
    marginBottom: 24,
    lineHeight: 22,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  card: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d0d7de",
    borderRadius: 16,
    padding: 16,
  },
  cardLabel: {
    fontSize: 13,
    color: "#57606a",
    marginBottom: 12,
  },
  cardValue: {
    fontSize: 28,
    fontWeight: "700",
    color: "#24292f",
  },
  panel: {
    marginTop: 16,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d0d7de",
    borderRadius: 16,
    padding: 16,
  },
  panelTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#24292f",
    marginBottom: 8,
  },
  panelText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#57606a",
  },
});
