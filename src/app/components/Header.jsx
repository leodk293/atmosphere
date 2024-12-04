import React from "react";
import Link from "next/link";
import { signIn, signOut, auth } from "../auth";
import Image from "next/image";
import { db } from "../../db";
import { usersTable } from "../../db/schema";
import { eq } from "drizzle-orm";

const Header = async () => {
  const session = await auth();

  async function storeUserIfNew() {
    if (session?.user) {
      const { name, email } = session.user;

      const existingUser = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email))
        .get();

      if (!existingUser) {
        await db.insert(usersTable).values({ name, email });
      }
    }
  }

  async function getAllUsers() {
    const users = await db.select().from(usersTable);
    return users;
  }

  const users = await getAllUsers();
  //console.log(users);

  if (session) {
    await storeUserIfNew();
  }

  return (
    <header className=" border border-transparent shadow-yellow-900 bg-black py-5 flex flex-wrap justify-center gap-10 md:gap-0 md:justify-evenly">
      <Link className=" self-center" href={"/"}>
        <h1 className=" text-3xl text-blue-900 font-extrabold self-start">
          Atmosphere ⛈️
        </h1>
      </Link>
      <div className=" self-center font-bold text-xl justify-center flex flex-wrap gap-4">
        <Link target="_blank" href={"https://x.com/Aboubac48530295"}>Twitter</Link>
        <Link target="_blank" href={"https://www.linkedin.com/in/aboubacar-traore-495736252/"}>Linkedin</Link>
        <Link target="_blank" href={"https://www.facebook.com/profile.php?id=100092315485742"}>Facebook</Link>
      </div>

      <div className=" flex flex-wrap justify-center gap-5 self-center">
        <Link className=" self-center" href={"/contact"}>
          <button className=" border border-transparent bg-sky-900 text-xl px-5 py-2 rounded-[50px]">
            Contact
          </button>
        </Link>

        {session?.user ? (
          <div className=" flex flex-row gap-5">
            <form
              className=" self-center"
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button className=" border border-transparent bg-blue-800 text-xl px-5 py-2 rounded-[50px]">
                Sign out
              </button>
            </form>

            <div className=" self-center border border-slate-300 bg-transparent rounded-[50px] px-3 py-2 flex flex-row gap-3">
              <Image
                src={session?.user?.image}
                alt={session?.user?.name}
                width={35}
                height={25}
                className=" self-center rounded-[50%] object-cover"
              />
              <p className=" font-semibold self-center">
                {session?.user?.name}
              </p>
            </div>
          </div>
        ) : (
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <button className=" border border-transparent bg-red-800 text-xl px-5 py-2 rounded-[50px]">
              Sign in
            </button>
          </form>
        )}

      </div>
    </header>
  );
};

export default Header;
