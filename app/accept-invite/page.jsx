"use client";
import { Suspense } from "react";
import AcceptInviteComponent from "./AcceptInviteComponent";

export default function AcceptInvitePageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AcceptInviteComponent />
    </Suspense>
  );
}
