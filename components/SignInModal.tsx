"use client";

import { ReactNode, useState } from "react";
import { SignIn } from "@clerk/nextjs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
interface SignInModalProps {
  children: ReactNode;
}

export function SignInModal({ children }: SignInModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <SignIn
          afterSignInUrl="/"
          routing="hash"
          appearance={{
            elements: {
              footerActionLink: "hidden",
              socialButtonsBlockButton: "hidden",
            },
          }}
        ></SignIn>
      </DialogContent>
    </Dialog>
  );
}
