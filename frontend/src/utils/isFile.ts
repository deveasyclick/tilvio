export function isFile(val: unknown): val is File {
  return (
    val instanceof File ||
    (typeof val === 'object' &&
      val !== null &&
      'name' in val &&
      'lastModified' in val)
  );
}
