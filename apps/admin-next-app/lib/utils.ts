import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export function objectToGraphQL(data: any): string {
  if (data === null) {
    return 'null';
  }

  if (Array.isArray(data)) {
    // Handle arrays recursively
    return `[${data.map((item) => objectToGraphQL(item)).join(', ')}]`;
  }

  if (typeof data === 'object' && data !== null) {
    // Handle objects recursively
    return `{ ${Object.entries(data)
      .map(([key, value]) => `${key}: ${objectToGraphQL(value)}`)
      .join(', ')} }`;
  }

  if (typeof data === 'string') {
    // Wrap strings in double quotes
    return `"${data}"`;
  }

  if (typeof data === 'boolean') {
    // Convert booleans to lowercase string
    return data ? 'true' : 'false';
  }

  if (typeof data === 'number') {
    // Return numbers as is
    return `${data}`;
  }

  if (data === undefined) {
    // Undefined values are not valid in GraphQL, return null
    return 'null';
  }

  // Default case (should not occur in normal circumstances)
  throw new Error(`Unsupported data type: ${typeof data}`);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
