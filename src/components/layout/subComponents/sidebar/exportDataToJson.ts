export async function exportDataToJson(
  combinedData: any[],
  filename: string
): Promise<void> {
  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify(combinedData)
  )}`;
  const link = document.createElement("a");
  link.href = jsonString;
  link.download = filename;

  link.click();
}
