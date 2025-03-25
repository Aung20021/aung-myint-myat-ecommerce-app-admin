import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Settings() {
  const { data: session } = useSession();
  const router = useRouter();

  async function logout() {
    await router.push("/");
    await signOut();
  }

  if (!session) return null;

  const [firstName, lastName] = session.user.name.split(" ");

  return (
    <div className="my-10 max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-2xl">
      {/* Profile Section */}
      <section className="border-b border-gray-300 pb-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Profile</h2>
        <p className="mt-2 text-gray-600">
          This information is visible only to you.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block font-medium text-gray-700"
            >
              Username
            </label>
            <div className="mt-2 flex items-center rounded-md border border-gray-300">
              <span className="px-3 text-gray-500">admin.com/</span>
              <input
                id="username"
                type="text"
                className="w-full border-none py-2 pl-1 focus:ring-0"
                value={session.user.name}
                readOnly
              />
            </div>
          </div>

          {/* Profile Image */}
          <div>
            <label className="block font-medium text-gray-700">Photo</label>
            <div className="mt-2 flex items-center gap-4">
              <Image
                className="rounded-full"
                src={session.user.image}
                alt={session.user.email}
                width={64}
                height={64}
              />
              <button
                type="button"
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Change
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Information */}
      <section className="border-b border-gray-300 pb-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Personal Information
        </h2>
        <p className="mt-2 text-gray-600">
          You can only view your information; editing is disabled.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* First Name */}
          <div>
            <label
              htmlFor="first-name"
              className="block font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              className="mt-2 w-full rounded-lg border border-gray-300 py-2 px-4 focus:ring-2 focus:ring-indigo-500"
              value={firstName}
              readOnly
            />
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="last-name"
              className="block font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              className="mt-2 w-full rounded-lg border border-gray-300 py-2 px-4 focus:ring-2 focus:ring-indigo-500"
              value={lastName}
              readOnly
            />
          </div>

          {/* Email Address */}
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="mt-2 w-full rounded-lg border border-gray-300 py-2 px-4 focus:ring-2 focus:ring-indigo-500"
              value={session.user.email}
              readOnly
            />
          </div>
        </div>
      </section>

      {/* Logout Button */}
      <div className="flex justify-end">
        <button
          onClick={logout}
          className="px-6 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
