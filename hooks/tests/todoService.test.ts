import { fetchTodos } from "@/hooks/fetchTodos";
import { addTodo } from "@/hooks/addTodos";
import { updateTodo } from "@/hooks/updateTodos";
import { deleteTodo } from "@/hooks/deleteTodos";
import { createClient, resetMocks } from "@/__mocks__/supabase";

jest.mock("@/utils/supabase/server", () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          order: jest.fn().mockResolvedValue({ data: mockData, error: null }),
        })),
      })),
      update: jest.fn().mockResolvedValue({ data: mockData, error: null }),
      insert: jest.fn().mockResolvedValue({ data: mockData, error: null }),
      delete: jest.fn().mockResolvedValue({ data: mockData, error: null }),
    })),
  })),
}));

const mockData = [
  { id: 1, title: "Test Todo 1", completed: false },
  { id: 2, title: "Test Todo 2", completed: true },
];

describe("Todo Service 테스트", () => {
  beforeEach(() => {
    resetMocks();
  });

  it("특정 유저에 대한 Todo를 Fetch한다.", async () => {
    createClient().from.mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          order: jest.fn().mockResolvedValue({ data: mockData, error: null }),
        }),
      }),
    });

    const todos = await fetchTodos("user-id-123");
    expect(todos).toEqual(mockData);
    expect(createClient().from).toHaveBeenCalledWith("todos");
  });

  it("새로운 Todo를 작성할 수 있어야 한다.", async () => {
    createClient().from.mockReturnValue({
      insert: jest.fn().mockResolvedValue({
        data: [{ id: 3, title: "New Todo", completed: false }],
        error: null,
      }),
    });
    const newTodo = await addTodo("user-id-123", "New Todo");
    expect(newTodo).toEqual({ id: 3, title: "New Todo", completed: false });
    expect(createClient().from).toHaveBeenCalledWith("todos");
  });

  it("기존 Todo에 수정 반영이 가능해야 한다.", async () => {
    createClient().from.mockReturnValue({
      update: jest.fn().mockReturnValue({
        eq: jest.fn().mockResolvedValue({
          data: [{ id: 1, title: "Updated Todo", completed: true }],
          error: null,
        }),
      }),
    });
    const updatedTodo = await updateTodo(1, {
      title: "Updated Todo",
      completed: true,
    });
    expect(updatedTodo).toEqual([
      { id: 1, title: "Updated Todo", completed: true },
    ]);
    expect(createClient().from).toHaveBeenCalledWith("todos");
  });

  it("Todo를 삭제할 수 있어야 한다.", async () => {
    createClient().from.mockReturnValue({
      delete: jest.fn().mockReturnValue({
        eq: jest.fn().mockResolvedValue({
          data: null,
          error: null,
        }),
      }),
    });

    const result = await deleteTodo(1);
    expect(result).toBe(true);
    expect(createClient().from).toHaveBeenCalledWith("todos");
  });
});
