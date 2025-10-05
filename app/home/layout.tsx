import { ReactNode } from "react";

export default async function HomeLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden w-full bg-black">
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
