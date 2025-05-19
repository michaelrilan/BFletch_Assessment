import React, { useState } from 'react'

type Props = {
  text: string;
  maxLength?: number;
};

const SeeMoreText: React.FC<Props> = ({ text, maxLength = 400}) => {
  const [expanded, setExpanded] = useState(false);
  const isLongText = text.length > maxLength;
  const displayedText = expanded ? text : text.slice(0, maxLength);

  return (
    <span>
      {displayedText}
      {isLongText && !expanded && '... '}
      {isLongText && (
        <span
          onClick={() => setExpanded(!expanded)}
          style={{ color: 'blue', cursor: 'pointer' }}
        >
          {expanded ? ' See Less' : ' See More'}
        </span>
      )}
    </span>
  );
};

export default SeeMoreText;