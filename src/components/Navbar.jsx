import { FiArrowUpRight } from "react-icons/fi";

const Navbar = () => (
  <nav className="site-nav" aria-label="Main navigation">
    <a className="site-brand" href="#home">
      <span className="brand-mark">BA</span>
      <span>Bayu Adi Saputra</span>
    </a>

    <ul className="site-nav-links">
      <li><a href="#about">About</a></li>
      <li><a href="#project">Web</a></li>
      <li><a href="#editing">Edit</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>

    <a className="nav-cta" href="#contact">
      Let&apos;s talk <FiArrowUpRight aria-hidden="true" />
    </a>
  </nav>
);

export default Navbar;
