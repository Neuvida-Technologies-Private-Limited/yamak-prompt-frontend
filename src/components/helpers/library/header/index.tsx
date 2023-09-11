import HeadingArea from './HeadingArea';
import CardFilter from './CardFilter';
import SearchArea from './SearchArea';

const Header = () => {
  return (
    <div className="shadow">
      <HeadingArea />
      <CardFilter />
      <SearchArea />
    </div>
  );
};

export default Header;
