"use client";
import useAuthDetailsContext from "@/hooks/auth-details.hook";
import Link from "next/link";

export default function Header() {
  const authContext = useAuthDetailsContext();
  const { authUser } = authContext.authDetails;
  console.log({ authContext, authUser });
  return (
    <header className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Cheeti Paatalu</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/managers">Managers</Link>
          </li>
          <li>
            <Link href="/cheetilu">Cheetilu</Link>
          </li>
          {!authUser ? (
            <li>
              <Link href="/auth/login">Login</Link>
            </li>
          ) : (
            <></>
          )}
        </ul>
        {authUser ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full flex justify-center items-center flex-row text-xl">
                AU
              </div>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <Link href="/auth/logout">Logout</Link>
              </li>
            </ul>
          </div>
        ) : (
          <></>
        )}
      </div>
    </header>
  );
}
