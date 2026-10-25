import type { ZodType } from 'zod';
import type { FieldValues, Resolver, FieldErrors } from 'react-hook-form';

/**
 * Universal Zod resolver compatible with both Zod v3 and Zod v4.
 * Safely extracts issues/errors without throwing uncaught exceptions.
 */
export function createZodResolver<T extends FieldValues>(
  schema: ZodType<any, any, any>
): Resolver<T> {
  return async (values) => {
    try {
      const result = await schema.safeParseAsync(values);
      if (result.success) {
        return {
          values: result.data as T,
          errors: {} as Record<string, never>,
        };
      }

      const errors: Record<string, any> = {};
      // Handle both Zod v4 (.issues) and Zod v3 (.errors)
      const issues = (result.error as any).issues || (result.error as any).errors || [];

      for (const issue of issues) {
        const path = (issue.path && issue.path.length > 0) ? issue.path.join('.') : 'root';
        if (!errors[path]) {
          errors[path] = {
            type: issue.code || 'validation',
            message: issue.message,
          };
        }
      }

      return {
        values: {} as Record<string, never>,
        errors: errors as FieldErrors<T>,
      };
    } catch (err: any) {
      return {
        values: {} as Record<string, never>,
        errors: {
          root: {
            type: 'error',
            message: err?.message || 'Validation error',
          },
        } as unknown as FieldErrors<T>,
      };
    }
  };
}
