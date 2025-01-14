export const VENDOR_BLOCKS_QUERY = `
  query ($themeId: GraphQLStringOrFloat!, $screenId: GraphQLStringOrFloat!) {
    vendor_blocks(
      filter : {
        theme : {
          id : {
            _eq : $themeId
          }
        }
        screen : {
          id : {
            _eq : $screenId
          }
        }
      }
    ){
      id
      vendor_id
      config
      ui_block {
        initialConfig
        id
        block_id
      }
      screen {
        id
        name
        display_name
      }
    }
  }
`;
