const Placeholder = ({ height = 'auto', width = 'auto' }) => {
  return (
    <div
      style={{
        display: 'inherit',
        background: 'var(--p-color-text-info)',
        height: height ?? undefined,
        width: width ?? undefined,
      }}
    />
  );
};

export default Placeholder;
