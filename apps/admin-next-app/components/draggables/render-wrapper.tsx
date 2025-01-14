export default function RenderWrapper({ children, title }: { children: React.ReactNode; title: string }) {
  return <div title={title}>{children}</div>;
}
