export type ServerActionResult<T> = { success: true, data: T } | { success: false, message: string, code: string }

export class ServerActionError extends Error {
  public code: string;

  constructor(message: string, code: string) {
    super(message)
    this.name = 'ServerActionError'
    this.code = code;
  }
}

// Server action wrapper that handles errors and redirects to login page
// if access token has expired.
export function serverAction<Return, Args extends unknown[] = []>(
  callback: (...args: Args) => Promise<Return>,
  functionCode: string
): (...args: Args) => Promise<ServerActionResult<Return>> {
  return async (...args: Args) => {
    try {
      const result = await callback(...args)

      if (process.env.NODE_ENV === "development") {
        console.log(
          `~~ 📡 RETURN ${functionCode}`,
          "ARGS:", JSON.stringify(args, null, 2),
          "RESULT:", JSON.stringify(result, null, 2)
        );
      }

      return { success: true, data: result };
    } catch (error) {
      if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
        console.error(`~~ ☄️  ERROR ${functionCode}`,
          "ARGS:", JSON.stringify(args, null, 2),
          "RESULT:", error
        );
      }

      if (error instanceof ServerActionError) {
        return { success: false, message: error.message, code: error.code };
      }

      throw error;
    }
  }
}
