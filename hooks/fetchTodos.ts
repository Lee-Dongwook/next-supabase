import { createClient } from "@/utils/supabase/server";

export const fetchTodos = async (userId: string) => {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error Fetching Todos", error.message);
      return [];
    }
    return data ?? [];
  } catch (error) {
    console.error("Fetching Todos Error", error);
    return [];
  }
};
