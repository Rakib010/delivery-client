import { ModeToggle } from "@/components/ModelToggler";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { Link } from "react-router";
import { role } from "@/types";

const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/tracking", label: "Parcel", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/contact", label: "Contact", role: "PUBLIC" },
  { href: "/admin", label: "Dashboard", role: role.admin },
  { href: "/sender", label: "Dashboard", role: role.sender },
  { href: "/receiver", label: "Dashboard", role: role.receiver },
];

export default function Navbar() {
  const { data } = useUserInfoQuery(undefined);
  console.log(data);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* LEFT - Logo */}
          <Link
            to="/"
            className="text-primary hover:text-primary/90 font-bold text-lg"
          >
            Parcel Delivery
          </Link>

          {/* CENTER - Nav links */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-4">
              {navigationLinks.map((link, index) => (
                <>
                  {link.role === "PUBLIC" && (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink
                        asChild
                        className="text-muted-foreground hover:text-primary font-medium"
                      >
                        <Link to={link.href}>{link.label}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )}
                  {link.role === data?.data?.role && (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink
                        asChild
                        className="text-muted-foreground hover:text-primary font-medium"
                      >
                        <Link to={link.href}>{link.label}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )}
                </>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* RIGHT - ModeToggle + Auth */}
          <div className="flex items-center gap-2">
            <ModeToggle />

            {data ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="font-medium">
                    {data?.data?.name ?? "User"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-semibold">{data?.data?.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {data?.data?.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      to={
                        data?.data?.role === role.admin
                          ? "/admin"
                          : data?.data?.role === role.sender
                            ? "/sender"
                            : "/receiver"
                      }
                    >
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="ghost" size="sm" className="text-sm">
                <Link to="/login">Sign In</Link>
              </Button>
            )}
          </div>

          {/* MOBILE MENU */}
          <div className="md:hidden">
            <Popover>
              <PopoverTrigger asChild>
                <Button className="group size-8" variant="ghost" size="icon">
                  <svg
                    className="pointer-events-none"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 12L20 12" />
                    <path d="M4 6H20" />
                    <path d="M4 18H20" />
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-40 p-2">
                <NavigationMenu>
                  <NavigationMenuList className="flex-col gap-2">
                    {navigationLinks.map((link, index) => (
                      <>
                        {link.role === "PUBLIC" && (
                          <NavigationMenuItem key={index}>
                            <NavigationMenuLink asChild>
                              <Link to={link.href}>{link.label}</Link>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        )}
                        {link.role === data?.data?.role && (
                          <NavigationMenuItem key={index}>
                            <NavigationMenuLink asChild>
                              <Link to={link.href}>{link.label}</Link>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        )}
                      </>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </header>
  );
}
