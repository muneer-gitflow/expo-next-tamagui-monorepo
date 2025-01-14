import { createContext, useContext, useState, useCallback } from 'react';
import { useAppBridge } from '@shopify/app-bridge-react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/lib/store/store';
import { useCreateVendorBlockMutation, useUpdateVendorBlockMutation } from '@/lib/api/cms-api';
import { setCurrentBlockConfig } from '@/lib/store/reducers/dnd.slice';

type FormMutationContextType = {
  saveData: (
    formData: { config: Record<string, unknown> },
    additionalParams?: Record<string, unknown>,
  ) => Promise<unknown>;
  onRemove: () => void;
  isSaving: boolean;
};

const FormMutationContext = createContext<FormMutationContextType | undefined>(undefined);

// Custom hook for easier usage
export const useFormMutation = (): FormMutationContextType => {
  const context = useContext(FormMutationContext);
  if (!context) {
    throw new Error('useFormMutation must be used within a FormMutationProvider');
  }
  return context;
};

export const FormMutationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const app = useAppBridge();
  const dispatch = useDispatch<AppDispatch>();

  const { activeTheme } = useSelector((state: RootState) => state?.theme);
  const currentScreen = useSelector((state: RootState) => state.theme.currentScreen);
  const currentBlock = useSelector((state: RootState) => state.dnd.currentBlock);
  const components = useSelector((state: RootState) => state.dnd.droppedComponents);
  const uiBlocks = useSelector((state: RootState) => state.uiBlocks.blocks);

  const [isSaving, setIsSaving] = useState(false);
  const [createVendorBlock] = useCreateVendorBlockMutation();
  const [updateVendorBlock] = useUpdateVendorBlockMutation();

  const saveData = useCallback(
    async (formData: { config: Record<string, unknown> }, additionalParams?: Record<string, unknown>) => {
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
        if (currentBlock.vendorBlockId) {
          const result = await updateVendorBlock({
            id: currentBlock.vendorBlockId.toString(),
            config: formData.config,
          }).unwrap();

          app.toast?.show('Data updated successfully!');
          dispatch(setCurrentBlockConfig({ config: result.config, vendorBlockId: result.id }));
          return result;
        }

        const payload = { ...formData, ...additionalParams };
        const index = components.findIndex((c) => c.id === currentBlock.id);

        const result = await createVendorBlock({
          vendorId: 'test_vendor', // Replace with appropriate vendorId logic
          config: payload.config || null,
          uiBlockId: uiBlock?.id || '',
          themeId: activeTheme.id.toString(),
          screenId: currentScreen.id.toString(),
          index: index.toString(),
        }).unwrap();

        app.toast?.show('Data saved successfully!');
        dispatch(setCurrentBlockConfig({ config: result.config, vendorBlockId: result.id }));
        return result;
      } catch (error) {
        console.error('Save error:', error);
        app.toast?.show('Error saving data!');
      } finally {
        setIsSaving(false);
      }
    },
    [
      app,
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

    app.toast?.show('Removed Vendor Block');
    // Add additional logic for removal if needed
  }, [currentBlock, currentScreen, app]);

  return (
    <FormMutationContext.Provider value={{ saveData, onRemove, isSaving }}>{children}</FormMutationContext.Provider>
  );
};
