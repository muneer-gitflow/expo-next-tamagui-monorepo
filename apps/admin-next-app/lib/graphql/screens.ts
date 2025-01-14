export const SCREENS_QUERY = `
  query GetScreens($themeId: GraphQLStringOrFloat!) {
    screens(filter: {
      theme: {
        id: {
          _eq: $themeId
        }
      }
    }) {
      id
      name
      display_name
      screen_variants {
        id
        name
        display_name
      }
    }
  }
`;
