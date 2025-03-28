import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orderCount, setOrderCount] = useState(0);

  // Fetch total orders from the API
  useEffect(() => {
    axios.get("/api/order").then((response) => {
      console.log("Order Response:", response.data); // Debugging line
      setOrderCount(response.data.length); // Set the length of the orders array
    });
  }, []);

  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }, []);

  const totalImagesCount = products.reduce(
    (total, product) => total + product.images.length,
    0
  );

  if (session) {
    return (
      <>
        <main className={` min-h-screen p-4 `}>
          {/* Signed in as {session.user.email} <br />
      <button onClick={() => signOut()}>Sign out</button> */}
          <header>
            <div className="mx-auto  px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
              <div className="sm:flex sm:items-center sm:justify-between">
                <div className="text-center sm:text-left">
                  <h1 className="text-3xl font-bold text-gray-900 sm:text-3xl">
                    Welcome Back,{" "}
                    <span className="text-green-700 font-bold">
                      {session.user.name}
                    </span>
                  </h1>

                  <p className="mt-1.5 text-md text-gray-500 max-w-md">
                    View the statistics about your business. Also manage and add
                    products.
                  </p>
                </div>

                <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                  <Link
                    href={"/products"}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-500 px-5 py-3 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring"
                    type="button"
                  >
                    <span className="text-sm font-medium"> View Products </span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </Link>
                  <Link
                    href={"https://aung-myint-myat-ecommerce-app-frontend.vercel.app/"}
                    target="_blank"
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-orange-500 px-5 py-3 text-orange-500 transition hover:bg-orange-50 hover:text-orange-700 focus:outline-none focus:ring"
                    type="button"
                  >
                    <span className="text-sm font-medium"> View Shop </span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-4 h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </header>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
            {/* Orders Card */}
            <div className="h-32 rounded-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 flex items-center justify-center shadow-lg">
              <article className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 text-white">
                <div>
                  <p className="text-sm">Total Orders</p>
                  <p className="text-2xl font-semibold">{orderCount || 0}</p>
                </div>
                <div className="inline-flex gap-2 rounded bg-green-700 p-1 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 12H4"
                    />
                  </svg>
                  <span className="text-xs font-medium">{orderCount}</span>
                </div>
              </article>
            </div>

            {/* Products Card */}
            <div className="h-32 rounded-lg bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
              <article className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 text-white">
                <div>
                  <p className="text-sm">Products</p>
                  <p className="text-2xl font-semibold">{products.length}</p>
                </div>
                <div className="inline-flex gap-2 rounded bg-blue-700 p-1 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                    />
                  </svg>
                  <span className="text-xs font-medium">{products.length}</span>
                </div>
              </article>
            </div>

            {/* Images Card */}
            <div className="h-32 rounded-lg bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg">
              <article className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 text-white">
                <div>
                  <p className="text-sm">Images</p>
                  <p className="text-2xl font-semibold">{totalImagesCount}</p>
                </div>
                <div className="inline-flex gap-2 rounded bg-yellow-700 p-1 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                  <span className="text-xs font-medium">
                    {totalImagesCount}
                  </span>
                </div>
              </article>
            </div>

            {/* Categories Card */}
            <div className="h-32 rounded-lg bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
              <article className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 text-white">
                <div>
                  <p className="text-sm">Categories</p>
                  <p className="text-2xl font-semibold">{categories.length}</p>
                </div>
                <div className="inline-flex gap-2 rounded bg-purple-700 p-1 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                    />
                  </svg>
                  <span className="text-xs font-medium">
                    {categories.length}
                  </span>
                </div>
              </article>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <main
        className={`flex min-h-screen flex-col items-center justify-center p-5 text-center `}
      >
        <div className="max-w-xl lg:max-w-3xl">
          <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            Welcome to my-Shop
          </h1>

          <p className="mt-4 leading-relaxed text-gray-500 max-w-sm">
            This website is only accessible to admins only. Add new products and
            manage database.
          </p>
          <div className="col-span-6 sm:flex sm:items-center sm:gap-4 my-4 flex items-center justify-center">
            <button
              disabled={isLoading}
              onClick={() => {
                setIsLoading(true);
                signIn("google");
              }}
              className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
            >
              Login With Google
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
