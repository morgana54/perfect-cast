export function assertIsNotNullish<T>(
  value: T
): asserts value is NonNullable<T> {
  if (value == null) {
    throw new Error("Value is null or undefined");
  }
}
