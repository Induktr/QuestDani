import React, { useState } from 'react';

interface QuestCardProps {
    image: string;
    text: string;
    onCLick: () => void;
}


export const QuestCard: React.FC<QuestCardProps> = ({ image, text, onCLick }) => {
    return(
        <div>
            <div>
                {text}
                <img src={image}/>
            </div>
        </div>
    );
}

export default QuestCard;