"use client";

import React, { useState } from "react";
import ResumePasswordForm from "./resume-password-form";
import ResumeProtectedContent from "./resume-protected-content";

const ResumeIntro = () => {
  const [hasAccess, setHasAccess] = useState(false);

  if (!hasAccess) {
    return <ResumePasswordForm onAccessGranted={() => setHasAccess(true)} />;
  }

  return <ResumeProtectedContent />;
};

export default ResumeIntro;
