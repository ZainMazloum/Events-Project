import Link from 'next/link';
import { MouseEventHandler, ReactNode } from 'react';
import classes from './button.module.css';

interface ButtonProps {
  children: ReactNode;
  link?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ link, onClick, children }: ButtonProps) {
  if (link) {
    return (
      <Link href={link} className={classes.btn}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes.btn} onClick={onClick}>
      {children}
    </button>
  );
}
