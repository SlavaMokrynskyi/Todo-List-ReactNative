import { Platform, StyleSheet } from 'react-native';

const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fa',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
  },
  content: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#24292f',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d0d7de',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonPressed: {
    backgroundColor: '#f3f4f6',
  },
  addButtonText: {
    fontSize: 24,
    lineHeight: 24,
    color: '#24292f',
    fontWeight: '400',
    marginTop: -1,
  },
  formContainer: {
    marginBottom: 12,
  },
  list: {
    flex: 1,
  },
  footer: {
    paddingTop: 12,
    paddingBottom: BottomTabInset + 12,
  },
});
