import { DropZone, BlockStack, Thumbnail, Text } from '@shopify/polaris';
import { NoteIcon } from '@shopify/polaris-icons';
import { useState, useCallback } from 'react';

interface FileUploaderProps {
  maxFiles?: number;
  placeholder?: string;
  onFilesChange?: (files: File[]) => void;
}

export default function FileUploader({ maxFiles = Infinity, placeholder, onFilesChange }: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);

  const handleDropZoneDrop = useCallback(
    (_dropFiles: File[], acceptedFiles: File[], _rejectedFiles: File[]) => {
      const newFiles = [...files, ...acceptedFiles].slice(0, maxFiles);
      setFiles(newFiles);
      onFilesChange?.(newFiles);
    },
    [files, maxFiles, onFilesChange],
  );

  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

  const fileUpload = files.length < maxFiles && <DropZone.FileUpload actionTitle={placeholder} />;
  const uploadedFiles = files.length > 0 && (
    <div style={{ padding: '0' }}>
      <BlockStack gap="400">
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
    </div>
  );

  return (
    <>
      <BlockStack gap="200">
        <Text variant="bodySm" as="p">
          {placeholder} - Max {maxFiles} files - Recommended size: 1000px wide
        </Text>
        <DropZone onDrop={handleDropZoneDrop}>
          {uploadedFiles}

          {fileUpload}
        </DropZone>
      </BlockStack>
    </>
  );
}
