import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import styles from './dialog.module.css';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;

function DialogContent({ children, ...props }: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={styles.overlay} />
      <DialogPrimitive.Content className={styles.content} {...props}>
        {children}
        <DialogPrimitive.Close className={styles.closeBtn} aria-label="Fechar">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

function DialogHeader({ children }: { children: React.ReactNode }) {
  return <div className={styles.header}>{children}</div>;
}

function DialogTitle({ children }: { children: React.ReactNode }) {
  return (
    <DialogPrimitive.Title className={styles.title}>{children}</DialogPrimitive.Title>
  );
}

function DialogDescription({ children }: { children: React.ReactNode }) {
  return (
    <DialogPrimitive.Description className={styles.description}>{children}</DialogPrimitive.Description>
  );
}

export { Dialog, DialogTrigger, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogDescription };
