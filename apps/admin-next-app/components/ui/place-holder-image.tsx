interface PlaceholderProps {
  height?: string | number;
  width?: string | number;
  color?: string;
  text?: string;
}

const PlaceholderImage = ({
  height = 'auto',
  width = 'auto',
  color = 'var(--p-color-text-info)',
  text = '',
}: PlaceholderProps) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--p-surface-neutral)',
        height: height ?? undefined,
        width: width ?? undefined,
        borderRadius: '4px',
      }}
    >
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.5 11C15.3284 11 16 10.3284 16 9.5C16 8.67157 15.3284 8 14.5 8C13.6716 8 13 8.67157 13 9.5C13 10.3284 13.6716 11 14.5 11Z"
          fill={color}
        />
        <path fillRule="evenodd" clipRule="evenodd" d="M7 17H17L13 12L10 15.5L8.5 13.5L7 15.5V17Z" fill={color} />
      </svg>
      {text && <span style={{ color: color }}>{text}</span>}
    </div>
  );
};

export default PlaceholderImage;
