import CardsPage from "@/app/share/cardsPage";
import GoodCard from "@/app/share/goodCard";
import { products } from "@/data/prroducts.data";
import "../../styles/share/areaInPages.scss";
import useSortedStockGoods from "@/hooks/useSortedStockGoods";

const HighRating = () => {
  const data = useSortedStockGoods(products.filter(product => product.rating > 4.7));
  
  return (
    <section id="in-stock" className="template-area-sections">
      <div className="area-in-pages">
        <CardsPage>
          {data.map((good, index) => {
            return (
                <GoodCard
                  key={index}
                    id={good.id?.toString() || index.toString()}
                    title={good.title}
                    subTitle={good.subTitle}
                    image={good.image}
                    priceWithoutDiscount={Number(good.priceWithoutDiscount)}
                    isDiscount={good.isDiscount}
                    discount={good.discount}
                    isStock={good.isStock}
                    doodCount={good.doodCount}
                    rating={good.rating}
                    isBuyMostOften={good.isBuyMostOften}
                    isGreatDeals={good.isGreatDeals}
                    isRecommend={good.isRecommend}
                />
              )
            })}
        </CardsPage>
      </div>
    </section>
  )
}

export default HighRating;