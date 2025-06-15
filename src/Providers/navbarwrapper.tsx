import NavBar from "@/components/Navbar/Navbar";
import { Suspense } from "react";

export default function NavBarWithSuspense() {
  return (
    <Suspense fallback={null}>
      <NavBar />
    </Suspense>
  );
}
