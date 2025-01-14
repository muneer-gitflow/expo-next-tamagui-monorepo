import { DropZone, BlockStack, Thumbnail, Text } from '@shopify/polaris';
import { NoteIcon } from '@shopify/polaris-icons';
import { useState, useCallback } from 'react';

interface GalleryProps {
  handleChange: (value: any) => void;
}

export default function Gallery({ handleChange }: GalleryProps) {
  const [files, setFiles] = useState<File[]>([]);

  const handleDropZoneDrop = useCallback(
    (_dropFiles: File[], acceptedFiles: File[], _rejectedFiles: File[]) =>
      setFiles((files) => [...files, ...acceptedFiles]),
    [],
  );

  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

  const fileUpload = !files.length && <DropZone.FileUpload actionHint="Accepts .gif, .jpg, and .png" />;

  const uploadedFiles = files.length > 0 && (
    <BlockStack>
      {files.map((file, index) => (
        <BlockStack key={index}>
          <Thumbnail
            size="small"
            alt={file.name}
            source={validImageTypes.includes(file.type) ? window.URL.createObjectURL(file) : NoteIcon}
          />
          <div>
            {file.name}{' '}
            <Text variant="bodySm" as="p">
              {file.size} bytes
            </Text>
          </div>
        </BlockStack>
      ))}
    </BlockStack>
  );

  return (
    <DropZone onDrop={handleDropZoneDrop} variableHeight>
      {uploadedFiles}
      {fileUpload}
    </DropZone>
  );
}
