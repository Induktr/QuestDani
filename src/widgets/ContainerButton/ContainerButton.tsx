import React, { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ContainerButton {
    children: ReactNode;
    className: string;
}

export const ContainerButton: FC<ContainerButton> = ({ children, className, ...props }) => {
  return (
    <motion.div
     className={className}
     {...props}
     >
        {children}
    </motion.div>
  );
};

export default ContainerButton;
