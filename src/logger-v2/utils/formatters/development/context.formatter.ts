export const formatContext = (context: Record<string, unknown>): string => {
  return `${JSON.stringify(context)}`;
};
