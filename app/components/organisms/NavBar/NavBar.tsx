"use client";

import { Disclosure } from "@headlessui/react";
import { NavLinkGroup } from "../../molecules";
import { HiOutlineXMark, HiBars3 } from "react-icons/hi2";
import { ThemeButton } from "../../atoms";

const links = [
  { href: "/", label: "Home" },
  { href: "/guestbook", label: "GuestBook" },
  { href: "/blog", label: "Blog" },
];

const NavBar = () => {
  return (
    <Disclosure as="nav">
      {({ open }) => (
        <div className="mx-auto px-5 backdrop-blur-xl z-1 max-w-screen-sm">
          <div className="flex justify-between h-16">
            <div className="flex w-full">
              <NavLinkGroup
                links={links}
                style="hidden sm:flex sm:space-x-12 sm:items-center"
              />
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <ThemeButton />
              <Disclosure.Button className="inline-flex ml-2 items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-400">
                {open ? <HiOutlineXMark size={24} /> : <HiBars3 size={24} />}
              </Disclosure.Button>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <NavLinkGroup
              links={links}
              style="pt-2 pb-3 space-y-1"
              slice={true}
            />
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};

export default NavBar;
