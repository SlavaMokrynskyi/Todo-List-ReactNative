import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import styles from "./styles";

type FormData = {
  title: string;
  deadline: string;
  priority: "low" | "medium" | "high";
};

interface Props {
  onSubmit: (data: FormData) => void;
}

export const TodoForm = ({ onSubmit }: Props) => {
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      title: "",
      deadline: "",
      priority: "low",
    },
  });

  const handleFormSubmit = (data: FormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="title"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Task title"
            value={value}
            onChangeText={onChange}
            style={styles.input}
          />
        )}
      />

      <Controller
        control={control}
        name="deadline"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <>
            <Text style={styles.fieldLabel}>Deadline</Text>
            <TextInput
              placeholder="2026-05-30T18:00"
              value={value}
              onChangeText={onChange}
              style={styles.input}
            />
          </>
        )}
      />

      <Controller
        control={control}
        name="priority"
        render={({ field: { onChange, value } }) => (
          <View style={styles.priorityRow}>
            {["low", "medium", "high"].map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => onChange(item)}
                style={[
                  styles.priorityButton,
                  value === item && styles.activePriority,
                ]}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit(handleFormSubmit)}
      >
        <Text style={styles.submitText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};
