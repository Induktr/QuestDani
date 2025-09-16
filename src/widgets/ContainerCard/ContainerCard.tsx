import React, { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ContainerCardProps {
    children: ReactNode;
    className: string;
}

export const ContainerCard: FC<ContainerCardProps> = ({ children, className, ...props }) => {
  return (
    <motion.div
     className={className}
     {...props}
     >
        {children}
    </motion.div>
  );
};

export default ContainerCard;
