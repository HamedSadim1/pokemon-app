import type { ReactNode } from "react";

interface DetailChipsProps {
  items: Array<{ key: string; content: ReactNode }>;
  emptyLabel: string;
}

const DetailChips = ({ items, emptyLabel }: DetailChipsProps) => {
  if (!items.length) {
    return <span className="detail-chip">{emptyLabel}</span>;
  }

  return (
    <div className="detail-list">
      {items.map((item) => (
        <span className="detail-chip" key={item.key}>
          {item.content}
        </span>
      ))}
    </div>
  );
};

export default DetailChips;
