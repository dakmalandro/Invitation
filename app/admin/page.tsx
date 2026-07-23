import type { Metadata } from "next";
import { Download } from "lucide-react";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main className='flex min-h-screen w-full items-center justify-center bg-background px-6'>
      <a
        href='/api/admin/guests-export'
        download
        className='flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95'>
        <Download className='h-5 w-5' />
        Λήψη Excel καλεσμένων
      </a>
    </main>
  );
}
