export const DateFormatConverter = (dateString: Date) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" } as const;
  const formattedDate = date.toLocaleDateString("en-IN", options);
  return formattedDate;
};
