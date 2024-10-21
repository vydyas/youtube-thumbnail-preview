"use client";

import { useUser, UserButton } from "@clerk/nextjs";
import { SignInModal } from "@/components/SignInModal";

export function AuthSidebar() {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) {
    return <SignInModal />;
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
