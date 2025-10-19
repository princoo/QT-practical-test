import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <Image
            src="/404-error.svg"
            alt="404 Illustration"
            width={400}
            height={400}
          />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-3">Page Not Found</h2>
          <p className="text-muted-foreground leading-relaxed">
            Sorry, the page you are looking for may have been moved or deleted.
            Kindly check the URL in the address bar is correct.
          </p>
        </div>

        <Link href="/" className="inline-block mb-4">
          <Button className="text-white cursor-pointer rounded-xs">
            Back to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
}
