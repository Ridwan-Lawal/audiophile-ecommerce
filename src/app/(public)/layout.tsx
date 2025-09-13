import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <nav className="border">This is the nav bar</nav>
      <main>{children}</main>
      <footer className="footer">This is the footer</footer>
    </div>
  );
}
