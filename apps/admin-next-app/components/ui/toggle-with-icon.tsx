import { Text } from '@shopify/polaris';
import { Heart, ToggleLeft, ToggleRight } from 'lucide-react';
import { useEffect, useState } from 'react';

import { styled } from 'styled-components';

interface ToggleWithIconProps {
  label: string;
  enabled: boolean;
  onToggle: (value: boolean) => void;
}

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 16px;
  background: #fff;
  border: 1px solid #e1e3e5;
  border-radius: 8px;
  margin-bottom: 12px;
  margin-top: 12px;
  cursor: pointer;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const HeartIcon = styled(Heart)<{ enabled: boolean }>`
  width: 20px;
  height: 20px;
  color: ${(props) => (props.enabled ? '#000' : '#8c9196')};
`;

const ToggleIcon = styled(ToggleLeft)`
  cursor: pointer;
  width: 20px;
  height: 20px;
`;

const ToggleIconRight = styled(ToggleRight)`
  cursor: pointer;
  width: 20px;
  height: 20px;
`;

export function ToggleWithIcon({ label, enabled, onToggle }: ToggleWithIconProps) {
  return (
    <ToggleContainer onClick={() => onToggle(!enabled)}>
      <LeftSection>
        <HeartIcon enabled={enabled} />
        <Text as="span" variant="bodyMd">
          {label}
        </Text>
      </LeftSection>

      {enabled ? <ToggleIconRight /> : <ToggleIcon />}
    </ToggleContainer>
  );
}
