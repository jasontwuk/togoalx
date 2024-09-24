import React from "react";

import { StyledLink } from "./StyledLink";

export const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4 sm:p-8">
      <p className="text-center text-base">
        <i className="fa-regular fa-copyright"></i> 2024 - present ∙ All Rights
        Reserved
      </p>

      <p className="flex items-center justify-center gap-2 text-center text-base">
        <span>Created by</span>

        <StyledLink
          target="blank"
          href="https://github.com/jasontwuk"
          isPlain={true}
        >
          Jason Liao
        </StyledLink>
      </p>
    </div>
  );
};
