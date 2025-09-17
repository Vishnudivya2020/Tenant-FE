"use client";
import { Suspense } from "react";
import AcceptInviteComponent from "./AcceptInviteComponent";

export default function AcceptInvitePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AcceptInviteComponent />
    </Suspense>
  );
}
