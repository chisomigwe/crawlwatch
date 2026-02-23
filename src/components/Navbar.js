"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@heroui/react";
import { siteConfig } from "@/config/site.config";

const hasClerk = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Conditionally import Clerk components
let SignInButton, SignUpButton, SignedIn, SignedOut, UserButton;
if (hasClerk) {
  const clerk = require("@clerk/nextjs");
  SignInButton = clerk.SignInButton;
  SignUpButton = clerk.SignUpButton;
  SignedIn = clerk.SignedIn;
  SignedOut = clerk.SignedOut;
  UserButton = clerk.UserButton;
}

function AuthButtons() {
  if (!hasClerk) {
    return (
      <NavbarItem>
        <Link href="/sign-up">
          <Button color="primary" className="font-medium">
            Get Started
          </Button>
        </Link>
      </NavbarItem>
    );
  }

  return (
    <>
      <SignedOut>
        <NavbarItem className="hidden sm:flex">
          <SignInButton mode="modal">
            <Button variant="light" className="font-medium">
              Sign In
            </Button>
          </SignInButton>
        </NavbarItem>
        <NavbarItem>
          <SignUpButton mode="modal">
            <Button color="primary" className="font-medium">
              Get Started
            </Button>
          </SignUpButton>
        </NavbarItem>
      </SignedOut>
      <SignedIn>
        <NavbarItem>
          <Link href="/dashboard">
            <Button variant="light" className="font-medium">
              Dashboard
            </Button>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-10 h-10",
              },
            }}
          />
        </NavbarItem>
      </SignedIn>
    </>
  );
}

function MobileAuthButtons() {
  if (!hasClerk) return null;

  return (
    <SignedOut>
      <NavbarMenuItem className="mt-4">
        <SignInButton mode="modal">
          <Button variant="light" className="w-full font-medium">
            Sign In
          </Button>
        </SignInButton>
      </NavbarMenuItem>
    </SignedOut>
  );
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <HeroNavbar
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      className="border-b border-gray-100"
      maxWidth="xl"
    >
      {/* Mobile menu toggle */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      {/* Brand */}
      <NavbarContent className="pr-3" justify="center">
        <NavbarBrand>
          <Link href="/" className="flex items-center gap-2">
            {siteConfig.logo.emoji && (
              <span className="text-2xl">{siteConfig.logo.emoji}</span>
            )}
            <span className="font-bebas text-2xl tracking-wide">
              {siteConfig.name}
            </span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop navigation */}
      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        {siteConfig.nav.main.map((item) => (
          <NavbarItem key={item.href}>
            <Link
              href={item.href}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Auth buttons */}
      <NavbarContent justify="end">
        <AuthButtons />
      </NavbarContent>

      {/* Mobile menu */}
      <NavbarMenu className="pt-6">
        {siteConfig.nav.main.map((item) => (
          <NavbarMenuItem key={item.href}>
            <Link
              href={item.href}
              className="w-full text-lg text-gray-600 hover:text-gray-900"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
        <MobileAuthButtons />
      </NavbarMenu>
    </HeroNavbar>
  );
}
