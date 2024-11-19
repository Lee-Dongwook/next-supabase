import { createClient } from "@/utils/supabase/server";

export const updateTodo = async (
  todoId: number,
  updates: { title?: string; completed?: boolean }
) => {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("todos")
      .update(updates)
      .eq("id", todoId);
    if (error) {
      console.error("Error updating Todo", error.message);
      return null;
    }
    return data;
  } catch (error) {
    console.error("Error updating Todo", error);
    return null;
  }
};
