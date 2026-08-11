import type { ReactNode } from "react";

interface DetailSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const DetailSection = ({
  title,
  children,
  className = "",
}: DetailSectionProps) => (
  <section className={`detail-section ${className}`.trim()}>
    <h2>{title}</h2>
    {children}
  </section>
);

export default DetailSection;
