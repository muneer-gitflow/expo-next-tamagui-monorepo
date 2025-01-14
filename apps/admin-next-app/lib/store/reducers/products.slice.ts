import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { executeGraphQL, QUERIES } from "@/lib/routes/app.api.graphql";

interface Product {
  value: string;
  label: string;
  id: string;
  image?: string;
  price?: string;
}

interface ProductNode {
  id: string;
  title: string;
  handle: string;
  priceRangeV2: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  featuredMedia?: {
    image?: {
      url: string;
    };
  };
}

interface ProductQueryResponse {
  products: {
    edges: Array<{
      node: ProductNode;
    }>;
  };
}

interface ProductsState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  error: null,
};

export const searchProducts = createAsyncThunk(
  "products/search",
  async ({ searchTerm, first }: { searchTerm?: string; first: number }) => {
    const data = await executeGraphQL<ProductQueryResponse>({
      query: QUERIES.PRODUCTS,
      variables: {
        first,
        query: searchTerm || null,
      },
    });

    return data.products.edges.map(({ node }: { node: ProductNode }) => ({
      value: node.id,
      label: node.title,
      id: node.handle,
      image: node.featuredMedia?.image?.url,
      price: `${node.priceRangeV2.minVariantPrice.currencyCode} ${node.priceRangeV2.minVariantPrice.amount}`,
    }));
  },
);

export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (productId: string) => {
    const data = await executeGraphQL<ProductQueryResponse>({
      query: `#graphql
      query getProduct($id: ID!) {
        product(id: $id) {
          id
          title
          handle
          priceRangeV2 {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          featuredMedia {
            ... on MediaImage {
              image {
                url
              }
            }
          }
        }
      }
    `,
      variables: {
        id: productId,
      },
    });

    const product = data.products.edges[0].node;
    return {
      value: product.id,
      label: product.title,
      id: product.handle,
      image: product.featuredMedia?.image?.url,
      price: `${product.priceRangeV2.minVariantPrice.currencyCode} ${product.priceRangeV2.minVariantPrice.amount}`,
    };
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export const { clearProducts } = productsSlice.actions;
export default productsSlice.reducer;
