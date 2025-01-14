export const QUERIES = {
  COLLECTIONS: `#graphql
    query Collections($first: Int!, $query: String) {
      collections(first: $first, query: $query) {
        edges {
          node {
            id
            title
            handle
            image {
              url
            }
          }
        }
      }
    }
  `,
};

export const executeGraphQL = async <T>(options: {
  query: string;
  variables: Record<string, any>;
}): Promise<T> => {
  // Mock implementation
  return Promise.resolve({} as T);
}; 