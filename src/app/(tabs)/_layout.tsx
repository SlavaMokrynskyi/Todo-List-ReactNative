import {
  Icon,
  Label,
  NativeTabs,
  VectorIcon,
} from "expo-router/unstable-native-tabs";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { TodosProvider } from "../../context/TodosContext";

export default function TabLayout() {
  return (
    <TodosProvider>
      <NativeTabs
        labelStyle={{
          color: "#24292f",
        }}
        tintColor="#0969da"
      >
        <NativeTabs.Trigger name="home">
          <Label>Tasks</Label>
          <Icon
            sf="list.bullet"
            androidSrc={<VectorIcon family={MaterialIcons} name="list" />}
          />
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="insights">
          <Label>Insights</Label>
          <Icon
            sf="chart.bar.fill"
            androidSrc={<VectorIcon family={MaterialIcons} name="insights" />}
          />
        </NativeTabs.Trigger>
      </NativeTabs>
    </TodosProvider>
  );
}
