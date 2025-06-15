"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import Avatar from "../products/Avatar";
import BackDrop from "./BackDrop";
import MenuItem from "./MenuItem";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  if (status === "loading") return null; // não renderiza nada enquanto carrega

  return (
    <>
      <div className="relative z-30">
        {/* botão de avatar */}
        <div
          onClick={toggleOpen}
          className="p-2 border border-[--border] flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-[--foreground]"
        >
          <Avatar size={64} />
          <AiFillCaretDown />
        </div>

        {isOpen && (
          <div className="absolute right-0 top-12 w-[170px] text-sm flex flex-col rounded-md shadow-md border border-[--border] bg-[--surface] text-[--foreground] overflow-hidden">
            {session ? (
              <>
                <Link href="/orders">
                  <MenuItem onClick={toggleOpen}>Your Orders</MenuItem>
                </Link>
                <Link href="/admin">
                  <MenuItem onClick={toggleOpen}>Admin Dashboard</MenuItem>
                </Link>
                <MenuItem
                  onClick={() => {
                    toggleOpen();
                    signOut();
                  }}
                >
                  Logout
                </MenuItem>
              </>
            ) : (
              <>
                <Link href="/login">
                  <MenuItem onClick={toggleOpen}>Login</MenuItem>
                </Link>
                <Link href="/register">
                  <MenuItem onClick={toggleOpen}>Sign Up</MenuItem>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
      {isOpen && <BackDrop onClick={toggleOpen} />}
    </>
  );
};

export default UserMenu;
