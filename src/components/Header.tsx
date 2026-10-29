import { Link } from "react-router";

export function Header({ name }: { name: string }) {
  return (
    <header className="nav">
      <Link to="/" className="brand">{name}</Link>
      <nav>
        <Link to="/#skills">Skills</Link>
        <Link to="/#work">Work</Link>
        <Link to="/#about">About</Link>
        <Link to="/#contact">Contact</Link>
      </nav>
    </header>
  );
}
