import { DROPPABLE_ID } from '@/lib/const';

export interface Vendor {
  id: string; // Unique identifier for the vendor
  name: string; // Name of the vendor
}

export interface AppTheme {
  id: string;
  vendors?: Vendor[];
  niche: string;
  title: string;
  description: string;
  thumbnail_image: {
    id: string;
  };
  preview: string;
  is_active: boolean;
  block_definitions: UIBlock[];
  screens: SimulatedScreenType[];
}

export interface AppThemeState {
  themes: AppTheme[];
  activeTheme: AppTheme | null;
  loading: boolean;
  error: string | null;
  currentScreen: SimulatedScreenType | null;
  screens: SimulatedScreenType[];
}

export interface UIBlock {
  block_id: string;
  id: string;
  description?: string;
  themeId: string; // The ID of the theme this block belongs to
  name: string;
  display_order: number; // Order of the block in the layout
  is_hidden: boolean; // Whether the block is hidden
  content: string;
  accessibility_label: string;
  panel_id: string;
  ui_block_fields: Field<unknown>[];
  display_name: string;
  title: string;
  initialConfig: unknown;
}

export interface UIBlocksState {
  blocks: UIBlock[];
  displayBlocks: UIBlock[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  currentBlock: {
    block: UIBlock | null; // Currently selected block
    config: VendorConfig | null; // Vendor-specific configuration for the block
  };
}

export interface VendorConfig {
  blockId: string; // Block ID this config is for
  fieldValues: Record<string, unknown>; // Field values set by the vendor
}

export interface SimulatorItem extends VendorBlock {
  simulatorItemId: string;
  type: string;
  config: Record<string, unknown>;
  displayOrder?: number;
  block_id: string;
  themeId: string;
}

export interface VendorSimulatorState {
  themeId: string;
  vendorId: string;
  screens: {
    [key: string]: SimulatorItem[];
  };
}

export interface DroppableResult {
  destination: {
    droppableId: typeof DROPPABLE_ID.COMPONENTS_PICKER | typeof DROPPABLE_ID.MOBILE_SIMULATOR;
    index: number;
  };
  draggableId: string;
  mode: string;
  reason: string;
  source: {
    droppableId: typeof DROPPABLE_ID.COMPONENTS_PICKER | typeof DROPPABLE_ID.MOBILE_SIMULATOR;
    index: number;
  };
  type: string;
}

export type LoaderData<T = Record<string, unknown>> = {
  data?: T;
  error?: string;
};

export enum FormInputType {
  Input = 'input',
  Gallery = 'gallery',
  Checkbox = 'checkbox',
  Select = 'select',
  ImageUploader = 'imageUploader',
  FileUploader = 'fileUploader',
  Button = 'button',
  RangeSlider = 'rangeSlider',
}

export interface SelectOption {
  value: string | number;
  label: string | number;
}

export interface Field<T> {
  field_key: string;
  interface: string;
  display_name: string;
  options: T[];
  order: number;
}

export interface FieldGroupType<T> {
  id: string;
  name: string;
  fields: Field<T>[];
  controls?: {
    show: boolean;
    onAdd?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onRemove?: (itemId: string | number) => void;
  };
}

export interface FormValues {
  [key: string]: unknown; // This can be as specific as you need
}

export interface FormBuilderProps<T> {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  fieldGroups: FieldGroupType<T>[];
  values: FormValues;
  handleChange: (event: React.ChangeEvent<unknown>) => void;
  touched: Record<string, unknown>;
  errors: Record<string, unknown>;
  setFieldValue: (field: string, value: unknown, shouldValidate?: boolean) => void;
  isSubmitting: boolean;
  submitButtonText?: string;
  popup?: boolean;
}

export interface ClientWindow {
  ENV: {
    PUBLIC_ENV_ENVIRONMENT: string;
  };
}

export const ValidComponentKeys: Record<string, string> = {
  BannerSlider: 'banner_slider',
  Category_Labels: 'category_labels',
  Product_Grid_New: 'product_grid_new',
  Collection_List: 'collection_list',
  Brands_List: 'brands_list',
  Product_Details_Basic: 'product_details_basic',
  // Product_Tiles_Grid: 'product_tiles_grid',
  // Product_Tiles_Dual: 'product_tiles_dual',
  // SearchBar: 'searchbar',
  // AnnouncementBar: 'announcement_bar',
  // Blogs: 'blogs',
  // ProductDetails: 'product_details',
  // ProductRecommendations: 'product_recommendations',
  // ProductsGridPaginated: 'products_grid_paginated',
  // CartScreen: 'cart_screen',
  // ProductDetailsPageCard: 'product_details_page_card',
} as const;

export type ValidComponentKeys = (typeof ValidComponentKeys)[keyof typeof ValidComponentKeys];

export interface ShopifyShop {
  id: string;
  name: string;
}

export interface SimulatedScreenType {
  display_name: string;
  id: number;
  name: string;
  icon?: string;
  premium?: boolean;
  variant?: SimulatedScreenType | null;
  variant_id?: number;
  screen_variants?: SimulatedScreenType[];
}

export const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

export type VendorUIBlock = UIBlock & {
  isDraft?: boolean;
  initialConfig?: unknown;
  id?: number;
};

export type VendorBlock = {
  id?: number;
  config: unknown;
  savedAt?: string;
  ui_block: VendorUIBlock;
  isDraft?: boolean;
  simulatorItemId: string;
  screen?: SimulatedScreenType;
};

export interface AppAnalytics {
  id: string;
  total_installs: string;
  active_users: string;
  new_users: string;
  retention_rate: string;
  crash_rate: string;
  avg_session_time: string;
  daily_sales: {
    time_slot: string;
    amount: string;
    percentage: number;
  }[];
  store_metrics: {
    total_orders: string;
    revenue: string;
    avg_order_value: string;
    conversion_rate: string;
    abandoned_carts: string;
  };
  engagement: {
    push_notifications: {
      sent: string;
      delivered: string;
      opened: string;
      ctr: string;
    };
    feature_usage: {
      feature_name: string;
      usage_count: number;
    }[];
  };
  traffic_sources: {
    source: string;
    visitors: number;
    revenue: string;
    revenue_per_visitor: string;
    conversion_rate: string;
  }[];
  time_distribution: {
    peak_hours: {
      start_time: string;
      end_time: string;
      user_count: number;
    }[];
    day_distribution: {
      day: string;
      user_count: number;
    }[];
  };
}
