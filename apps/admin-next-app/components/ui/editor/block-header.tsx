import { Box, Button, ButtonGroup, Icon, InlineGrid, InlineStack, Text } from '@shopify/polaris';
import { HideIcon, DuplicateIcon, DeleteIcon } from '@shopify/polaris-icons';
import { useEffect } from 'react';

interface BlockHeaderProps {
  title: string;
  onHide?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
  placeholder?: string;
}

export default function BlockHeader({ title, onHide, onDuplicate, onDelete, placeholder }: BlockHeaderProps) {
  useEffect(() => {
    if (!document.getElementById('tailwind-css1')) {
      const tailwindScript = document.createElement('script');
      tailwindScript.src = 'https://cdn.tailwindcss.com';
      tailwindScript.id = 'tailwind-css';
      document.head.appendChild(tailwindScript);
    }
  }, []);
  return (
    <>
      <div className="flex flex-col border-b -m-[15px] mb-2 px-4 py-2 w-[calc(100%+30px)]">
        <div className="flex justify-between w-full items-start">
          <span className="flex flex-col text-[10px] text-black/70">
            <text className="font-bold text-black/90 text-sm">{title}</text>
            {placeholder}
          </span>
          <span className="flex gap-2">
            <Button icon={<Icon source={HideIcon} />} onClick={onHide} variant="tertiary" />
            <Button icon={<Icon source={DuplicateIcon} />} onClick={onDuplicate} variant="tertiary" />
            <Button icon={<Icon source={DeleteIcon} />} onClick={onDelete} variant="tertiary" tone="critical" />
          </span>
        </div>
      </div>
    </>
  );
}
