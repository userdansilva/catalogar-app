import { HTMLAttributes, PropsWithChildren } from "react";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/lib/shadcn/ui/dialog";

type ModalProps = PropsWithChildren<{
  title: string;
  description?: string;
}>;

export default function Modal({
  title, description, children,
}: ModalProps) {
  return (
    <Dialog open>
      <DialogContent className="max-w-[425px] space-y-4">
        <DialogHeader>
          <DialogTitle className="font-extrabold tracking-tight">
            {title}
          </DialogTitle>

          {description && (
            <DialogDescription>
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
}

export function ModalContent({
  children, ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...rest}>
      {children}
    </div>
  );
}

export function ModalFooter({
  children, ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <DialogFooter {...rest}>
      {children}
    </DialogFooter>
  );
}
