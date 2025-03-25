import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Header() {
  const router = useRouter();
  const { pathname } = router;

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const active =
    "text-green-600 transition hover:text-green-500/75 p-3 bg-gray-200 rounded-sm";
  const inactive = "text-gray-500 transition hover:text-gray-500/75 p-3";
  const { data: session } = useSession();
  if (session) {
    return (
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <a className="block text-teal-600" href="#">
                <span className="sr-only">Home</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
                  />
                </svg>
              </a>
            </div>

            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-lg">
                  <li>
                    <Link
                      className={location.pathname === "/" ? active : inactive}
                      href="/"
                    >
                      {" "}
                      Dashboard{" "}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={
                        location.pathname === "/products" ? active : inactive
                      }
                      href="/products"
                    >
                      {" "}
                      Products{" "}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={pathname === "/categories" ? active : inactive}
                      href="/categories"
                    >
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={
                        location.pathname === "/orders" ? active : inactive
                      }
                      href="/orders"
                    >
                      {" "}
                      Orders{" "}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={
                        location.pathname === "/settings" ? active : inactive
                      }
                      href="/settings"
                    >
                      {" "}
                      Settings{" "}
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <div className="w-10 h-10">
                  <Image
                    class="h-full w-full rounded-full object-contain object-center"
                    src={session.user.image}
                    alt={session.user.email}
                    width={34}
                    height={34}
                  />
                </div>
              </div>
              {/* Mobile navigation button */}
              <div className="block md:hidden">
                <button
                  onClick={toggleMobileNav}
                  className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                >
                  {isMobileNavOpen ? (
                    // X icon for close
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    // Menu icon for open
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {/* Mobile navigation links */}
              {isMobileNavOpen && (
                <div className="md:hidden absolute top-16 right-0 bg-white border border-zinc-200 rounded shadow-lg p-6 text-lg">
                  <ul className="flex flex-col items-start gap-4">
                    <li>
                      <Link
                        onClick={toggleMobileNav}
                        className={pathname === "/" ? active : inactive}
                        href="/"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={toggleMobileNav}
                        className={pathname === "/products" ? active : inactive}
                        href="/products"
                      >
                        Products
                      </Link>
                    </li>

                    <li>
                      <Link
                        onClick={toggleMobileNav}
                        className={
                          pathname === "/categories" ? active : inactive
                        }
                        href="/categories"
                      >
                        Categories
                      </Link>
                    </li>

                    <li>
                      <Link
                        onClick={toggleMobileNav}
                        className={pathname === "/orders" ? active : inactive}
                        href="/orders"
                      >
                        Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={toggleMobileNav}
                        className={pathname === "/settings" ? active : inactive}
                        href="/settings"
                      >
                        Settings
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }
}
