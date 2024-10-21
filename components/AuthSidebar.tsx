"use client";

import { useUser, UserButton } from "@clerk/nextjs";
import { SignInModal } from "@/components/SignInModal";
import { Button } from "@/components/ui/button";

export function AuthSidebar() {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) {
    return (
      <SignInModal>
        <Button
          variant="outline"
          className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white border-none font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-white"
        >
          Sign In With Email
        </Button>
      </SignInModal>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <UserButton afterSignOutUrl="/" />
      <p className="text-sm text-muted-foreground">
        Welcome, {user.firstName}!
      </p>
    </div>
  );
}
