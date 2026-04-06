interface GoodsHeaderProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  goodsHeaderData: Array<{
    id: string;
    image: string;
    label: string;
    link: string;
  }>;
}

const GoodsHeader = ({ activeFilter, onFilterChange, goodsHeaderData }: GoodsHeaderProps) => {
  return (
    <div className="goods-header">
      <div className="goods-header-items">
        {goodsHeaderData.map((filter) => (
          <div
            key={filter.id}
            className={`good-head-item ${activeFilter === filter.id ? "active" : ""}`}
            onClick={() => onFilterChange(filter.id)}
          >
            <div 
              className="good-item-image" 
              style={{ backgroundImage: `url(${filter.image})` }}
            />
            <p>{filter.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoodsHeader;