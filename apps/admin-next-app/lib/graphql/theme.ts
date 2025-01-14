export const THEME_BY_ID_QUERY = `
  query ($themeId: ID!) {
    ui_themes_by_id(id: $themeId) {
      id
      title
      block_definitions {
        id
        description
        display_name
        initialConfig
        block_id
        order
        theme {
          id
        }
      }
    }
  }
`;

export const THEMES_LIST_QUERY = `
  query {
    ui_themes {
      id
      description
      niche
      title
      thumbnail_image {
        id
      }
      is_active
      screens {
        id
        name
        display_name
        theme {
          id
          title
          niche
        }
      }
    }
  }
`;
