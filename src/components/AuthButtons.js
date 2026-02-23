"use client";

import Link from "next/link";
import {
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

export function SignUpCTA({ children, className = "" }) {
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
  return <SignedOut>{children}</SignedOut>;
}

export function ConditionalSignedIn({ children }) {
  return <SignedIn>{children}</SignedIn>;
}
