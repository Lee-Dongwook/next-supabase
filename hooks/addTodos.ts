import { createClient } from "@/utils/supabase/server";

export const addTodo = async (userId: string, title: string) => {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.from("todos").insert([
      {
        user_id: userId,
        title,
        completed: false,
      },
    ]);
    if (error) {
      console.error("Error adding Todo", error.message);
      return null;
    }
    return data;
  } catch (error) {
    console.error("Error adding Todo", error);
    return null;
  }
};
