import { TextField } from '@shopify/polaris';
import { useEffect, useState } from 'react';

const UrlSelector = ({
  urlTarget,
  onSelect,
}: {
  urlTarget: string | null;
  onSelect: (value: { navigationType: 'url'; value: string; label: string }) => void;
}) => {
  const [target, setTarget] = useState<string>(urlTarget || '');

  useEffect(() => {
    onSelect({
      navigationType: 'url',
      value: target,
      label: target,
    });
  }, [target, onSelect]);

  return <TextField label="URL" value={target} onChange={setTarget} autoComplete="off" />;
};

export default UrlSelector;
