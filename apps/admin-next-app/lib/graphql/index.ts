export * from './screens';
export * from './theme';
export * from './vendor-blocks';

export const VENDOR_BLOCKS_QUERY = `
  query GetVendorBlocks($themeId: GraphQLStringOrFloat!, $screenId: GraphQLStringOrFloat!) {
    vendor_blocks(
      filter: {
        theme: {
          id: {
            _eq: $themeId
          }
        }
        screen: {
          id: {
            _eq: $screenId
          }
        }
      }
    ) {
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

export const CREATE_VENDOR_BLOCK_MUTATION = `
  mutation CreateVendorBlock(
    $vendorId: String!
    $config: JSON!
    $uiBlockId: ID!
    $themeId: ID!
    $screenId: ID!
    $index: String!
  ) {
    create_vendor_blocks_item(
      data: {
        vendor_id: $vendorId
        config: $config
        ui_block: {
          id: $uiBlockId
        }
        theme: {
          id: $themeId
        }
        screen: {
          id: $screenId
        }
        index: $index
      }
    ) {
      id
      vendor_id
      config
      ui_block {
        id
        block_id
        initialConfig
      }
      screen {
        id
        name
        display_name
      }
    }
  }
`;

export const APP_ANALYTICS_QUERY = `
  query {
    app_analytics {
      id
      total_installs
      active_users
      new_users
      retention_rate
      crash_rate
      avg_session_time
      daily_sales {
        time_slot
        amount
        percentage
      }
      store_metrics {
        total_orders
        revenue
        avg_order_value
        conversion_rate
        abandoned_carts
      }
      engagement {
        push_notifications {
          sent
          delivered
          opened
          ctr
        }
        feature_usage {
          feature_name
          usage_count
        }
      }
      traffic_sources {
        source
        visitors
        revenue
        revenue_per_visitor
        conversion_rate
      }
      time_distribution {
        peak_hours {
          start_time
          end_time
          user_count
        }
        day_distribution {
          day
          user_count
        }
      }
    }
  }
`;

export const GET_VENDOR_BLOCK_BY_UI_BLOCK = `
  query GetVendorBlockByUIBlock($blockId: String!) {
    vendor_blocks(
      filter: { 
        ui_block: { 
          block_id: { 
            _eq: $blockId 
          } 
        } 
      }
    ) {
      id
      config
      vendor_id
      theme {
        id
      }
      screen {
        id
        name
      }
      index
      ui_block {
        id
        block_id
        initialConfig
      }
    }
  }
`;

export const GET_BLOCK_DEFINITIONS = `
  query GetBlockDefinitions($themeId: GraphQLStringOrFloat!, $screenName: String!) {
    ui_block_definitions(
      filter: {
        theme: { 
          id: { 
            _eq: $themeId 
          } 
        }
        screens: { 
          screens_id: { 
            name: { 
              _eq: $screenName 
            } 
          } 
        }
      }
    ) {
      id
      name
      display_name
      description
      version
      block_id
      theme {
        id
      }
      screens {
        screens_id {
          name
        }
      }
      initialConfig
      isLive
    }
  }
`;

export const UPDATE_VENDOR_BLOCK_MUTATION = `
  mutation UpdateVendorBlock($id: ID!, $config: JSON!) {
    update_vendor_blocks_item(
      id: $id,
      data: {
        config: $config
      }
    ) {
      id
      config
      ui_block {
        id
        block_id
        initialConfig
      }
    }
  }
`;
