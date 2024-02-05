'use client';

import { cn } from '@/lib/utils/cn';
import { useState } from 'react';

type Props = {
  children?: React.ReactNode;
  text: string;
};

export default function Tooltip({ children, text }: Props) {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <div
      className={'flex justify-center'}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <div
        className={cn(
          'text-akvamariini-50 border-akvamariini-500 bg-akvamariini-900 shadow-akvamariini-800 absolute z-10 hidden w-fit rounded-lg border-2 px-2 py-1 text-sm font-normal shadow-lg',
          visible && 'flex translate-y-[80px]'
        )}
      >
        {text}
      </div>
    </div>
  );
}
