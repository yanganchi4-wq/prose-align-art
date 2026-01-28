import React from "react";

interface HighlightBoxProps {
  children: React.ReactNode;
}

const HighlightBox: React.FC<HighlightBoxProps> = ({ children }) => {
  return (
    <div className="bg-warning-light border-l-4 border-warning p-5 rounded-xl my-5">
      {children}
    </div>
  );
};

export default HighlightBox;
