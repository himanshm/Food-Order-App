import { ComponentPropsWithoutRef, ReactNode } from 'react';

type ButtonProps = {
  className?: string;
  textOnly?: boolean;
  children: ReactNode;
} & ComponentPropsWithoutRef<'button'>;

function Button({ children, className, textOnly, ...props }: ButtonProps) {
  const buttonClasses = `${textOnly ? 'text-button' : 'button'} ${className}`;

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
}

export default Button;
