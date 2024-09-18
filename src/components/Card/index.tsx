//Thanks to Docux (Juniors017) for creating this component and sharing it with us.
//Docusaurus community - component library
import React, { CSSProperties, ReactNode } from 'react'; // Import types for props
import clsx from 'clsx'; // clsx helps manage conditional className names in a clean and concise manner.
import Link from '@docusaurus/Link';
// Define an interface for the component props
interface CardProps {
  link?: string; // link to doc 
  className?: string; // Custom classes for the container card
  style?: CSSProperties; // Custom styles for the container card
  children: ReactNode; // Content to be included within the card
  shadow?: 'lw' | 'md' | 'tl'; // Used to add shadow under your card Shadow levels: low (lw), medium (md), top-level (tl)
}
// Build the card component with the specified props
const Card: React.FC<CardProps> = ({
  link,
  className,
  style,
  children,
  shadow,
}) => {
  const cardShadow = shadow ? `item shadow--${shadow}` : '';
  return (
    <Link to={link} className={clsx('card', className, cardShadow)} style={style}>
      {children}
    </Link>
  );
};
export default Card;
