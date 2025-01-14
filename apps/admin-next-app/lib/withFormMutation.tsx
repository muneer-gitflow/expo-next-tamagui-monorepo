import { useCallback, useState } from 'react';
import { useAppBridge } from '@shopify/app-bridge-react';
import type { AppDispatch, RootState } from './store/store';
import { useDispatch, useSelector } from 'react-redux';
import BlockHeader from '@/components/ui/editor/block-header';
import { useCreateVendorBlockMutation, useUpdateVendorBlockMutation } from './api/cms-api';
import { setCurrentBlockConfig } from './store/reducers/dnd.slice';

type SaveLogicProps = {
  onSaveSuccess?: () => void;
  onSaveError?: (error: unknown) => void;
};

export const withFormMutation = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  headerProps?: { title: string; placeholder?: string },
) => {
  const FormMutationComponent = (props: P & SaveLogicProps) => {
    const app = useAppBridge();

    console.log('HOC Props:', props);

    const { activeTheme } = useSelector((state: RootState) => state?.theme);
    const dispatch = useDispatch<AppDispatch>();
    const currentScreen = useSelector((state: RootState) => state.theme.currentScreen);
    const currentBlock = useSelector((state: RootState) => state.dnd.currentBlock);
    const components = useSelector((state: RootState) => state.dnd.droppedComponents);
    const uiBlocks = useSelector((state: RootState) => state.uiBlocks.blocks);

    const [isSaving, setIsSaving] = useState(false);
    const [createVendorBlock] = useCreateVendorBlockMutation();
    const [updateVendorBlock] = useUpdateVendorBlockMutation();

    const saveData = useCallback(
      async (
        formData: {
          config: Record<string, unknown>;
        },
        additionalParams?: Record<string, unknown>,
      ) => {
        if (!currentBlock || !currentScreen || !activeTheme) {
          app.toast?.show('Missing required data');
          return;
        }

        const uiBlock = uiBlocks.find((block) => block.block_id === currentBlock.block_id);

        if (!uiBlock) {
          app.toast?.show('UI Block not found');
          return;
        }

        setIsSaving(true);

        try {
          if (currentBlock?.vendorBlockId) {
            // Update existing vendor block
            const result = await updateVendorBlock({
              id: currentBlock.vendorBlockId.toString(),
              config: formData.config,
            }).unwrap();

            app.toast?.show('Data updated successfully!');
            dispatch(setCurrentBlockConfig({ config: result.config, vendorBlockId: result.id }));

            if (props.onSaveSuccess) props.onSaveSuccess();
            return result;
          }

          // Create a new vendor block
          const payload = { ...formData, ...additionalParams };
          const index = components.findIndex((c) => c.id === currentBlock.id);

          const result = await createVendorBlock({
            vendorId: 'test_vendor', // Replace with appropriate vendorId logic
            config: payload?.config || null,
            uiBlockId: uiBlock?.id || '',
            themeId: activeTheme.id.toString(),
            screenId: currentScreen.id.toString(),
            index: index.toString(),
          }).unwrap();

          app.toast?.show('Data saved successfully!');
          dispatch(setCurrentBlockConfig({ config: result.config, vendorBlockId: result.id }));

          if (props.onSaveSuccess) props.onSaveSuccess();
          return result;
        } catch (error) {
          console.error('Save error:', error);
          app.toast?.show('Error saving data!');
          if (props.onSaveError) props.onSaveError(error);
        } finally {
          setIsSaving(false);
        }

        return null;
      },
      [
        app,
        props,
        activeTheme,
        currentScreen,
        currentBlock,
        components,
        uiBlocks,
        createVendorBlock,
        updateVendorBlock,
        dispatch,
      ],
    );

    const onRemove = useCallback(() => {
      if (!currentBlock) {
        app.toast?.show('No vendor block to remove');
        return;
      }

      if (!currentScreen?.id) {
        app.toast?.show('Screen not found');
        return;
      }

      if (currentBlock?.id) {
        app.toast?.show('Removed Vendor Block');
        // Implement block removal logic here if needed
      }
    }, [currentBlock, currentScreen, app]);

    return (
      <>
        {headerProps?.title && (
          <BlockHeader onDelete={onRemove} title={headerProps.title} placeholder={headerProps.placeholder || ''} />
        )}
        <WrappedComponent {...(props as P)} saveData={saveData} isSaving={isSaving} />
      </>
    );
  };

  FormMutationComponent.displayName = `WithFormMutation(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return FormMutationComponent;
};
