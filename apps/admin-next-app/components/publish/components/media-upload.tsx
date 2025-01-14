import { Box, DropZone, Thumbnail, Text, List, Banner, BlockStack, InlineStack } from '@shopify/polaris';
import { usePublish } from '../context/PublishContext';

export function MediaUpload() {
  const { state, dispatch } = usePublish();
  const { media } = state;

  const handleDropIcon = (_files: File[], acceptedFiles: File[]) => {
    dispatch({
      type: 'UPDATE_MEDIA',
      payload: { icon: acceptedFiles[0] }
    });
  };

  const handleDropScreenshots = (_files: File[], acceptedFiles: File[]) => {
    dispatch({
      type: 'UPDATE_MEDIA',
      payload: { screenshots: [...media.screenshots, ...acceptedFiles] }
    });
  };

  return (
    <Box padding="400">
      <BlockStack gap="400">
        <Banner tone="info">
          High-quality visuals help users understand your app better
        </Banner>

        <Box>
          <Text as="h2" variant="headingMd">App Icon</Text>
          <Box paddingBlockStart="400">
            <DropZone accept="image/*" onDrop={handleDropIcon} allowMultiple={false}>
              {media.icon ? (
                <Thumbnail source={URL.createObjectURL(media.icon)} alt="App icon" />
              ) : (
                <DropZone.FileUpload actionHint="or drop files to upload" />
              )}
            </DropZone>
          </Box>
          <Box paddingBlockStart="200">
            <List type="bullet">
              <List.Item>Required size: 1024 x 1024 pixels</List.Item>
              <List.Item>PNG format with transparency</List.Item>
              <List.Item>Max file size: 5MB</List.Item>
            </List>
          </Box>
        </Box>

        <Box>
          <Text as="h2" variant="headingMd">Screenshots</Text>
          <Box paddingBlockStart="400">
            <DropZone accept="image/*" onDrop={handleDropScreenshots} allowMultiple>
              <Box padding="400">
                <InlineStack gap="200">
                  {media.screenshots.map((screenshot, index) => (
                    <Thumbnail
                      key={index}
                      source={URL.createObjectURL(screenshot)}
                      alt={`Screenshot ${index + 1}`}
                    />
                  ))}
                  {media.screenshots.length < 5 && (
                    <DropZone.FileUpload actionHint="or drop files to upload" />
                  )}
                </InlineStack>
              </Box>
            </DropZone>
          </Box>
          <Box paddingBlockStart="200">
            <List type="bullet">
              <List.Item>Upload 3-5 screenshots</List.Item>
              <List.Item>Recommended size: 2732 x 2048 pixels (iPad Pro)</List.Item>
              <List.Item>PNG or JPG format</List.Item>
              <List.Item>Max file size: 10MB each</List.Item>
            </List>
          </Box>
        </Box>
      </BlockStack>
    </Box>
  );
} 