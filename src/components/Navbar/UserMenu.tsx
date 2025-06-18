"use client";

import { logoutServer } from "@/app/actions/auth";
import Link from "next/link";
import { useCallback, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { useAuth } from "../../Providers/AuthProvider";
import Avatar from "../products/Avatar";
import BackDrop from "./BackDrop";
import MenuItem from "./MenuItem";
const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, setCurrentUser } = useAuth();

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutServer();
      setCurrentUser(null); // limpa do context
      toggleOpen();
    } catch (error) {
      console.error("Erro ao fazer logout", error);
    }
  };

  return (
    <>
      <div className="relative z-30">
        <div
          onClick={toggleOpen}
          className="p-2 border border-[--border] flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-[--foreground]"
        >
          <Avatar size={64} />
          <AiFillCaretDown />
        </div>

        {isOpen && (
          <div className="absolute right-0 top-12 w-[170px] text-sm flex flex-col rounded-md shadow-md border border-[--border] bg-[--surface] text-[--foreground] overflow-hidden">
            {currentUser ? (
              <>
                <Link href="/my-orders">
                  <MenuItem onClick={toggleOpen}>Your Orders</MenuItem>
                </Link>
                <Link href="/order/1">
                  <MenuItem onClick={toggleOpen}>Admin Dashboard</MenuItem>
                </Link>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
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
