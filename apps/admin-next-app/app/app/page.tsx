'use client';
import { useCallback, useState } from 'react';
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  InlineStack,
  ProgressBar,
  InlineGrid,
  Popover,
  ActionList,
  Checkbox,
} from '@shopify/polaris';
import { MenuHorizontalIcon, XIcon, ChatIcon } from '@shopify/polaris-icons';
import { useRouter } from 'next/navigation';

const steps = [
  { id: '1', title: 'Select theme', completed: false },
  { id: '2', title: 'Set app name and colors', completed: false },
  { id: '3', title: 'Design app screens', completed: false },
  { id: '4', title: 'Preview on testing devices', completed: false },
  {
    id: '5',
    title: 'Publish to App Store and Google Play Store',
    completed: false,
  },
];

export default function Home() {
  const router = useRouter();
  const [progress] = useState(5);
  const [actionActive, toggleAction] = useState(false);

  const handleToggleAction = () => {
    toggleAction(!actionActive);
  };
  const [checked, setChecked] = useState(false);
  const handleChange = useCallback(
    (newChecked: boolean) => setChecked(newChecked),
    []
  );

  const handleMarkCompleted = (stepId: string) => {
    console.log('stepId', stepId);
  };

  const items = [
    { content: 'Dissmiss Guide', icon: XIcon },
    { content: 'Give Feedback', icon: ChatIcon },
  ];

  const disclosureButtonActivator = (
    <Button
      variant="plain"
      onClick={handleToggleAction}
      icon={MenuHorizontalIcon}
    ></Button>
  );
  const disclosureButton = (
    <Popover
      active={actionActive}
      activator={disclosureButtonActivator}
      onClose={handleToggleAction}
    >
      <ActionList items={items} />
    </Popover>
  );

  const handleThemeSelect = () => {
    router.push('/app/theme');
  };

  return (
    <Page>
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="500">
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd" fontWeight="bold">
                    Schedule 1-1 onboarding call with experts
                  </Text>
                  <Text variant="bodyMd" as="p">
                    Together, we'll assist you from setting up to launching
                    apps—save your time, more seamlessly.
                  </Text>
                  <BlockStack gap="800">
                    <InlineStack gap="300">
                      <Button
                        fullWidth={false}
                        size="micro"
                        variant="primary"
                        url="https://calendly.com/onboardingom/onboarding-om-1"
                      >
                        Schedule now
                      </Button>
                    </InlineStack>
                  </BlockStack>
                </BlockStack>
              </BlockStack>
            </Card>
            <div style={{ marginTop: '20px' }}>
              <Card>
                <BlockStack gap="500">
                  <BlockStack gap="200">
                    <InlineGrid columns="1fr auto">
                      <Text as="h2" variant="headingMd" fontWeight="bold">
                        Setup guide
                      </Text>
                      {disclosureButton}
                    </InlineGrid>
                    <Text variant="bodyMd" as="p">
                      Use this personalized guide to get your app up and
                      running.
                    </Text>
                    <InlineStack>
                      <InlineGrid alignItems="center" gap="400" columns={2}>
                        <Text variant="bodyMd" as="p">
                          0/5 completed
                        </Text>
                        <ProgressBar
                          tone="primary"
                          progress={progress}
                          size="small"
                        />
                      </InlineGrid>
                    </InlineStack>

                    <Box
                      background="bg"
                      padding="400"
                      borderRadius="500"
                      position="relative"
                    >
                      <BlockStack>
                        <Box
                          insetBlockStart="100"
                          insetInlineEnd="100"
                          position="absolute"
                        >
                          <img
                            alt="image_setup_guide_1"
                            src="https://onemobile.onecommerce.io/assets/image_setup_guide_1-Djzyed-7.png"
                          />
                        </Box>
                        <Checkbox
                          label="Select theme"
                          tone="magic"
                          checked={checked}
                          onChange={handleChange}
                        ></Checkbox>
                        <div>
                          <h2>App Setup Steps</h2>
                          <ul>
                            {steps?.map((step: any) => (
                              <li key={step.id}>
                                <div>
                                  <h3>{step.title}</h3>
                                  <p>{step.description}</p>
                                  <button
                                    onClick={() =>
                                      handleMarkCompleted(step?.id)
                                    }
                                    disabled={step.completed}
                                  >
                                    {step.completed
                                      ? 'Completed'
                                      : 'Mark as Completed'}
                                  </button>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Box paddingInlineStart="600">
                          <Text variant="bodyXs" as="span">
                            Firstly, pick a theme you want for your mobile app.
                          </Text>
                        </Box>
                        <Box paddingBlockStart="300" paddingInlineStart="600">
                          <Button 
                            variant="primary" 
                            onClick={handleThemeSelect}
                          >
                            Select theme
                          </Button>
                        </Box>
                      </BlockStack>
                    </Box>
                    {/* <Box background='bg' padding='400' borderRadius='500' position='relative'>
                      <BlockStack>
                        <Box insetBlockStart="100" insetInlineEnd="100"  position='absolute'><img src='https://onemobile.onecommerce.io/assets/image_setup_guide_2-D3J2tTqu.png' /></Box>
                        <Checkbox label="Set app name and colors"></Checkbox>
                        <Box paddingInlineStart='600'><Text variant="bodyXs" as="span">Help your app recognizable and matched with the overall brand.</Text></Box>
                        <Box paddingBlockStart='300' paddingInlineStart='600'><Button variant="primary" onClick={() => { }}>Set up</Button></Box>
                      </BlockStack>
                    </Box> */}
                    <Box
                      paddingInlineStart="400"
                      borderRadius="500"
                      position="relative"
                    >
                      <Checkbox label="Set app name and colors"></Checkbox>
                    </Box>
                    <Box
                      paddingInlineStart="400"
                      borderRadius="500"
                      position="relative"
                    >
                      <Checkbox label="Design app screens"></Checkbox>
                    </Box>
                    <Box
                      paddingInlineStart="400"
                      borderRadius="500"
                      position="relative"
                    >
                      <Checkbox label="Preview on testing devices"></Checkbox>
                    </Box>
                    <Box
                      paddingInlineStart="400"
                      borderRadius="500"
                      position="relative"
                    >
                      <Checkbox label="Publish to App Store and Google Play Store"></Checkbox>
                    </Box>
                  </BlockStack>
                </BlockStack>
              </Card>
            </div>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
