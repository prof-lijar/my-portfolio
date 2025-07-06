import Link from "next/link";
import React from "react";

export interface SkillCardProps {
  /** The name of the skill. Can be a string or a JSX element for complex names. */
  name: React.ReactNode;
  /** The Icon component for the skill. */
  Icon: React.ElementType;
  /** Optional URL to link the skill icon to. */
  href?: string;
}

/**
 * A reusable card component to display a single skill with its icon and name.
 * The icon can optionally be a link.
 */
export const SkillCard = ({ name, Icon, href }: SkillCardProps) => {
  const iconElement = <Icon className="w-10 h-10" />;

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      {href ? (
        <Link href={href} target="_blank" rel="noopener noreferrer">
          {iconElement}
        </Link>
      ) : (
        iconElement
      )}
      <span className="text-sm font-medium">{name}</span>
    </div>
  );
};

export default SkillCard;
