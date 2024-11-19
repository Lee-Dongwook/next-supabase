export const mockFrom = jest.fn();

export const createClient = jest.fn(() => ({
  from: mockFrom,
}));

export const resetMocks = () => {
  mockFrom.mockReset();
};
