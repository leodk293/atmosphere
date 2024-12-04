import React from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Phone } from "lucide-react";
import { MessageSquare } from "lucide-react";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="mt-[100px] flex flex-col gap-5 w-full relative bottom-0 bg-black py-5 px-10 text-white ">
      <div className="flex flex-col gap-10 sm:flex-row sm:flex-wrap sm:justify-evenly">
        <div className=" flex flex-col gap-3">
          <h1 className=" text-3xl text-blue-900 font-extrabold self-start">
            Atmosphere ⛈️
          </h1>
          <p className=" font-semibold">
            © {year} <span className="font-extrabold">Atmosphere</span>. All
            Rights Reserved.
          </p>
        </div>

        <div className=" flex flex-col gap-2">
          <p className=" font-bold text-xl">Social networks</p>
          <Link
            target="_blank"
            href={"https://x.com/Aboubac48530295"}
            className=" pt-2 hover:underline hover:text-gray-300 underline-offset-2"
          >
            Twitter
          </Link>
          <Link
            target="_blank"
            className="hover:underline hover:text-gray-300 underline-offset-2"
            href={"https://www.facebook.com/profile.php?id=100092315485742"}
          >
            Facebook
          </Link>
          <Link
            target="_blank"
            className="hover:underline hover:text-gray-300 underline-offset-2"
            href={"https://www.linkedin.com/in/aboubacar-traore-495736252/"}
          >
            Linkedin
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <p className=" font-bold text-xl">Contact</p>

          <div className=" pt-2 flex flex-row gap-1">
            <Mail color="#ffffff" />
            <p className=" self-center">aboubatrao04@gmail.com</p>
          </div>

          <div className=" flex flex-row gap-1">
            <Phone color="#ffffff" />
            <p className=" self-center">+212 0619965635</p>
          </div>

          <Link className=" flex flex-row gap-1" href={"/contact"}>
            <MessageSquare color="#ffffff" />
            <p className=" self-center">Contact Us</p>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
