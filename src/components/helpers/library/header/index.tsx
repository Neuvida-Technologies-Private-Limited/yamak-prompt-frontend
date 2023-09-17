import HeadingArea from './HeadingArea';
import { Tabs } from 'components/common';
import SearchArea from './SearchArea';
import { CardConst } from 'utils/constants';
import { HiMenu, HiOutlineHeart } from 'react-icons/hi';

const Header = () => {
  return (
    <div className="shadow">
      <HeadingArea />
      <Tabs
        tab1={CardConst.All}
        tab2={CardConst.Favourite}
        icon1={<HiMenu />}
        icon2={<HiOutlineHeart />}
        className="border-b-2 border-gray50 py-4 px-6"
      />
      <SearchArea />
    </div>
  );
};

export default Header;
