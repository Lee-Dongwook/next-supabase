import { createClient } from "@/utils/supabase/server";

export const deleteTodo = async (todoId: number) => {
  const supabase = await createClient();

  try {
    const { error } = await supabase.from("todos").delete().eq("id", todoId);
    if (error) {
      console.error("Error deleting Todo", error.message);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error deleting Todo", error);
    return false;
  }
};
