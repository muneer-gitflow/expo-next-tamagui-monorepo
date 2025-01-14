import { Card, Box, Text, ButtonGroup, Button, ProgressBar, Tabs } from '@shopify/polaris';
import { usePublish } from '../context/PublishContext';
import { InitialChoice } from './initial-choice';
import { AppInfoForm } from './app-info-form';
import { MediaUpload } from './media-upload';
import { PricingForm } from './pricing-form';
import { ReviewSubmit } from './review-submit';
import { StoreAccess } from './store-access';

import { StoreSelection } from './store-selection';
import { LaunchTypeSelection } from './launch-type-selection';
import { InviteSetup } from './invite-setup';
import { BetaConfig } from './beta-config';

const STEPS = {
  'undecided': [
    { id: 'choice', title: 'Publishing Method', component: InitialChoice },
  ],
  'our-account': [
    { id: 'choice', title: 'Choose Method', component: InitialChoice },
    { id: 'store-selection', title: 'Target Stores', component: StoreSelection },
    // { id: 'launch-type', title: 'Launch Type', component: LaunchTypeSelection },
    { id: 'app-info', title: 'App Information', component: AppInfoForm },
    { id: 'media', title: 'Media Assets', component: MediaUpload },
    // { id: 'pricing', title: 'Pricing & Content', component: PricingForm },
    { id: 'review', title: 'Review & Submit', component: ReviewSubmit },
  ],
  'client-account': [
    { id: 'choice', title: 'Choose Method', component: InitialChoice },
    { id: 'store-selection', title: 'Target Stores', component: StoreSelection },
    { id: 'store-access', title: 'Developer Accounts', component: StoreAccess },
    { id: 'invite-setup', title: 'Collaboration Setup', component: InviteSetup },
    // { id: 'launch-type', title: 'Launch Type', component: LaunchTypeSelection },
    { id: 'app-info', title: 'App Information', component: AppInfoForm },
    { id: 'media', title: 'Media Assets', component: MediaUpload },
    // { id: 'pricing', title: 'Pricing & Content', component: PricingForm },
    { id: 'review', title: 'Review & Submit', component: ReviewSubmit },
  ],
};

export function PublishWizard() {
  const { state, dispatch } = usePublish();
  const { wizard } = state;

  const steps = wizard.path === 'undecided' ? STEPS['our-account'] : STEPS[wizard.path];
  const currentStep = steps[wizard.currentStep];
  const StepComponent = currentStep.component;

  const handleNext = () => {
    if (wizard.currentStep < steps.length - 1) {
      dispatch({
        type: 'UPDATE_WIZARD',
        payload: { currentStep: wizard.currentStep + 1 },
      });
    }
  };

  const handleBack = () => {
    if (wizard.currentStep > 0) {
      dispatch({
        type: 'UPDATE_WIZARD',
        payload: { currentStep: wizard.currentStep - 1 },
      });
    }
  };

  const handleSubmit = () => {
    dispatch({
      type: 'UPDATE_STATUS',
      payload: { status: 'in_progress' },
    });
    // Add submission logic here
  };

  return (
    <Box paddingBlockEnd="800">
      <Card>
        <Box padding="400">
          <Box paddingBlockEnd="400">
            <Text as="h1" variant="headingLg">
              {currentStep.title}
            </Text>
          </Box>

          <Box paddingBlockEnd="400">
            <ProgressBar progress={(wizard.currentStep + 1) * (100 / steps.length)} size="small" />
          </Box>

          <Tabs
            tabs={steps.map((step, index) => ({
              id: step.id,
              content: step.title,
              accessibilityLabel: step.title,
              panelID: step.id,
              selected: index === wizard.currentStep,
              disabled: index > wizard.currentStep,
            }))}
            selected={wizard.currentStep}
            onSelect={(index) => {
              if (index <= wizard.currentStep) {
                dispatch({
                  type: 'UPDATE_WIZARD',
                  payload: { currentStep: index },
                });
              }
            }}
          />

          <Box paddingBlock="600">
            <StepComponent />
          </Box>

          <Box paddingBlockStart="400">
            <ButtonGroup>
              <Button onClick={handleBack} disabled={wizard.currentStep === 0}>
                Back
              </Button>
              {wizard.currentStep < steps.length - 1 ? (
                <Button variant="primary" onClick={handleNext}>
                  Continue
                </Button>
              ) : (
                <Button variant="primary" onClick={handleSubmit}>
                  Submit for Review
                </Button>
              )}
            </ButtonGroup>
          </Box>
        </Box>
      </Card>

      {wizard.launchType === 'beta' && wizard.currentStep > 0 && (
        <Box paddingBlockStart="400">
          <BetaConfig />
        </Box>
      )}
    </Box>
  );
}
