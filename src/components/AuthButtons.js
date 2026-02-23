"use client";

import Link from "next/link";
import { Button } from "@heroui/react";

const hasClerk = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

let SignUpButton, SignedIn, SignedOut;
if (hasClerk) {
  const clerk = require("@clerk/nextjs");
  SignUpButton = clerk.SignUpButton;
  SignedIn = clerk.SignedIn;
  SignedOut = clerk.SignedOut;
}

export function SignUpCTA({ children, className = "" }) {
  if (!hasClerk) {
    return (
      <Link href="/sign-up" className={className}>
        {children}
      </Link>
    );
  }

  return (
    <>
      <SignedOut>
        <SignUpButton mode="modal">{children}</SignUpButton>
      </SignedOut>
      <SignedIn>
        <Link href="/dashboard">{children}</Link>
      </SignedIn>
    </>
  );
}

export function ConditionalSignedOut({ children }) {
  if (!hasClerk) return <>{children}</>;
  return <SignedOut>{children}</SignedOut>;
}

export function ConditionalSignedIn({ children }) {
  if (!hasClerk) return null;
  return <SignedIn>{children}</SignedIn>;
}
