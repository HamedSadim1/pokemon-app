import type { ReactNode } from "react";
import Icon, { type IconName } from "./Icon";

export interface FeedbackStateProps {
  icon: IconName;
  title: string;
  description: string;
  kicker?: string;
  action?: ReactNode;
  headingLevel?: "h1" | "h2";
  className?: string;
  actionClassName?: string;
}

interface FeedbackStateBaseProps extends FeedbackStateProps {
  variant: "empty" | "error";
}

const FeedbackState = ({
  icon,
  title,
  description,
  kicker,
  action,
  headingLevel = "h2",
  className = "",
  actionClassName = "",
  variant,
}: FeedbackStateBaseProps) => {
  const Heading = headingLevel;

  return (
    <div
      className={`${variant}-state feedback-state ${className}`.trim()}
      {...(variant === "error" ? { role: "alert" } : {})}
    >
      <div className="empty-state-icon">
        <Icon name={icon} size={24} />
      </div>
      {kicker && <div className="page-kicker">{kicker}</div>}
      <Heading className={headingLevel === "h1" ? "page-title" : undefined}>{title}</Heading>
      <p>{description}</p>
      {action && (
        <div className={`detail-actions feedback-state-actions ${actionClassName}`.trim()}>
          {action}
        </div>
      )}
    </div>
  );
};

export const EmptyState = (props: FeedbackStateProps) => (
  <FeedbackState {...props} variant="empty" />
);

export const ErrorState = (props: FeedbackStateProps) => (
  <FeedbackState {...props} variant="error" />
);
