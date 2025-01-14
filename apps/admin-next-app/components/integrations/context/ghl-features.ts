// New file for GHL integration data
export const ghlFeatures = {
  ghl_crm: {
    title: 'Seamless CRM Integration',
    features: [
      'Two-way sync of customer data between Shopify and GHL',
      'Automatic contact creation and updates',
      'Order history synchronization',
      'Custom field mapping',
      'Conversation history tracking',
    ],
    workflow: [
      'Customer places order in mobile app',
      'Contact automatically created/updated in GHL',
      'Order details synced to GHL opportunity',
      'Automated follow-up sequences triggered',
      'Customer communications centralized in GHL',
    ],
    benefits: [
      'Unified customer view across platforms',
      'Automated customer segmentation',
      'Enhanced customer service capabilities',
      'Streamlined marketing automation',
    ],
    developerNotes: {
      requirements: [
        'GHL API Key with full access',
        'Shopify Webhook endpoints configured',
        'Customer data mapping schema',
      ],
      implementation: [
        'Set up webhook listeners for Shopify customer/order events',
        'Implement GHL API client using provided SDK',
        'Configure two-way sync handlers',
        'Set up error handling and retry mechanisms',
      ],
      codeSnippets: {
        webhookSetup: `
// Shopify Webhook Handler
app.post('/webhooks/customers/create', async (req, res) => {
  const customer = req.body;
  await ghlClient.contacts.create({
    email: customer.email,
    firstName: customer.first_name,
    lastName: customer.last_name,
    // ... map other fields
  });
});`,
        ghlSync: `
// GHL Contact Creation
const syncToGHL = async (shopifyCustomer) => {
  const contact = await ghlClient.contacts.create({
    email: shopifyCustomer.email,
    customFields: {
      shopify_customer_id: shopifyCustomer.id,
      // ... custom field mapping
    }
  });
  return contact;
};`
      },
      apiEndpoints: [
        {
          method: 'POST',
          endpoint: '/api/ghl/contacts',
          description: 'Create/Update GHL contact',
        },
        {
          method: 'GET',
          endpoint: '/api/ghl/opportunities',
          description: 'Fetch customer opportunities',
        },
      ],
    },
  },
  // ... other GHL features (automation, chatbot) remain the same
};

export type GHLFeatureKey = keyof typeof ghlFeatures; 