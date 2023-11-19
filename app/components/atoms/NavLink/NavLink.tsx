import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  slice?: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, slice, children }) => {
  const pathname = usePathname();

  return (
    <>
      {slice ? (
        <Link
          href={href}
          prefetch
          className={`${
            pathname === href
              ? "bg-rose-50 border-rose-400 text-rose-400 block pl-3 pr-4 py-2 border-l-4 text-base font-medium dark:bg-gray-800"
              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-rose-400 block pl-3 pr-4 py-2 dark:hover:text-rose-400 boder-l-4 text-base font-medium dark:text-white"
          }`}
        >
          {children}
        </Link>
      ) : (
        <Link
          href={href}
          prefetch
          className={`${
            pathname === href
              ? "border-rose-400 dark:text-white h-full inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              : "border-transparent text-gray-500 dark:text-gray-300 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
          }`}
        >
          {children}
        </Link>
      )}
    </>
  );
};

export default NavLink;
