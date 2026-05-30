import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    marginBottom: 24,
  },

  input: {
    borderWidth: 1,
    borderColor: "#d0d7de",
    borderRadius: 8,
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 12,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#57606a",
    marginBottom: 6,
  },

  priorityRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },

  priorityButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d0d7de",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#fff",
  },

  activePriority: {
    backgroundColor: "#ddf4ff",
  },

  submitButton: {
    backgroundColor: "#0969da",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },

  submitText: {
    color: "#fff",
    fontWeight: "600",
  },
});
