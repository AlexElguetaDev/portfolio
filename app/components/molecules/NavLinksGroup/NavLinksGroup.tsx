import { NavLink, ThemeButton } from "../../atoms";

interface NavLinkGroupProps {
  links: { href: string; label: string }[];
  style?: string;
  slice?: boolean;
}

const NavLinkGroup: React.FC<NavLinkGroupProps> = ({ links, style, slice }) => {
  return (
    <div className={style}>
      {links.map((link) => (
        <NavLink href={link.href} key={link.href} slice={slice}>
          {link.label}
        </NavLink>
      ))}
      {slice ? null : <ThemeButton />}
    </div>
  );
};

export default NavLinkGroup;
