import { Pagination } from 'antd';

interface PaginationProps {
  defaultCurrentPage: number;
  totalItems: number;
}

const index: React.FC<PaginationProps> = ({
  defaultCurrentPage,
  totalItems,
}) => {
  return (
    <div className="self-center py-4">
      <Pagination defaultCurrent={defaultCurrentPage} total={totalItems} />
    </div>
  );
};

export default index;
