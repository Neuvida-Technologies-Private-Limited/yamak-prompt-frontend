interface HeaderProps {
  children: React.ReactNode | any;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return <div className="shadow">{children}</div>;
};

export default Header;
