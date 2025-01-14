import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { executeGraphQL, QUERIES } from "@/lib/routes/app.api.graphql";

interface Collection {
  value: string;
  label: string;
  id: string;
  image?: string;
}

interface CollectionQueryResponse {
  collections: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        handle: string;
        image?: {
          url: string;
        };
      };
    }>;
  };
}

interface CollectionDetails {
  id: string;
  products: Array<{
    id: string;
    title: string;
    image?: string;
    price: string;
  }>;
}

interface CollectionsState {
  collections: Collection[];
  collectionDetails: Record<string, CollectionDetails>;
  isLoading: boolean;
  error: string | null;
}

interface CollectionProductsResponse {
  collection: {
    id: string;
    products: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          featuredMedia?: {
            preview: {
              image: {
                url: string;
              };
            };
          };
          priceRangeV2: {
            minVariantPrice: {
              amount: string;
              currencyCode: string;
            };
          };
        };
      }>;
    };
  };
}

interface CollectionNode {
  id: string;
  title: string;
  handle: string;
  image?: {
    url: string;
  };
}

interface ProductNode {
  id: string;
  title: string;
  featuredMedia?: {
    preview: {
      image: {
        url: string;
      };
    };
  };
  priceRangeV2: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
}

const initialState: CollectionsState = {
  collections: [],
  collectionDetails: {},
  isLoading: false,
  error: null,
};

export const searchCollections = createAsyncThunk(
  "collections/search",
  async ({ searchTerm, first }: { searchTerm?: string; first: number }) => {
    const data = await executeGraphQL<CollectionQueryResponse>({
      query: QUERIES.COLLECTIONS,
      variables: {
        first,
        query: searchTerm || null,
      },
    });

    return data.collections.edges.map(({ node }: { node: CollectionNode }) => ({
      value: node.id,
      label: node.title,
      id: node.handle,
      image: node.image?.url,
    }));
  },
);

export const getCollectionDetails = createAsyncThunk(
  "collections/getDetails",
  async ({ collectionId, first }: { collectionId: string; first: number }) => {
    const data = await executeGraphQL<CollectionProductsResponse>({
      query: `#graphql
        query getCollectionProducts($collectionId: ID!, $first: Int!) {
          collection(id: $collectionId) {
            id
            products(first: $first) {
              edges {
                node {
                  id
                  title
                  featuredMedia {
                    ... on MediaImage {
                      preview {
                        image {
                          url
                        }
                      }
                    }
                  }
                  priceRangeV2 {
                    minVariantPrice {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        collectionId,
        first,
      },
    });

    return {
      id: collectionId,
      products: data.collection.products.edges.map(
        ({ node }: { node: ProductNode }) => ({
          id: node.id,
          title: node.title,
          image: node.featuredMedia?.preview?.image?.url,
          price: `${node.priceRangeV2.minVariantPrice.currencyCode} ${Number(
            node.priceRangeV2.minVariantPrice.amount,
          ).toFixed(2)}`,
        }),
      ),
    };
  },
);

const collectionsSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    clearCollections: (state) => {
      state.collections = [];
      state.collectionDetails = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchCollections.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchCollections.fulfilled, (state, action) => {
        state.isLoading = false;
        state.collections = action.payload;
      })
      .addCase(searchCollections.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch collections";
      })
      .addCase(getCollectionDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCollectionDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.collectionDetails[action.payload.id] = action.payload;
      })
      .addCase(getCollectionDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || "Failed to fetch collection details";
      });
  },
});

// Selector to get cached collection details
export const selectCollectionProducts = (
  state: { collections: CollectionsState },
  collectionId: string,
) => state.collections.collectionDetails[collectionId]?.products;

export const { clearCollections } = collectionsSlice.actions;
export default collectionsSlice.reducer;
