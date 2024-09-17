"use client";

import { MessageSquareWarning } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({
  error, reset,
}: ErrorProps) {
  // Implement error log (sentry probably) in the future
  useEffect(() => {
    // Log the error to an error reporting service
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 self-center">
      <MessageSquareWarning className="size-4" />
      Ops! Algo deu errado. Por favor, tente novamente.

      <Button onClick={() => reset()} id="try-again">
        Tentar novamente
      </Button>
    </div>
  );
}
