import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';

const Page = ({
  children,
  isActive,
  isExiting,
  exitDirection, // 'left' | 'right' | null
  className = '',
}) => {
  const pageRef = useRef(null);

  useEffect(() => {
    // Auto-expandir textareas dentro de la página
    if (isActive) {
      const textareas = pageRef.current?.querySelectorAll('textarea');
      textareas?.forEach(ta => {
        ta.style.height = 'auto';
        ta.style.height = ta.scrollHeight + 'px';
      });
    }
  }, [isActive]);

  const pageClasses = classNames(
    'page',
    {
      'active': isActive,
      'exit-left': isExiting && exitDirection === 'left',
      'exit-right': isExiting && exitDirection === 'right',
    },
    className
  );

  return (
    <div ref={pageRef} className={pageClasses}>
      {children}
    </div>
  );
};

export default Page;