import { IDoods } from "@/data/websiteData";

const useSortedStockGoods = <T extends Pick<IDoods, "isStock">>(arr: T[]): T[] => {
    return [...arr].sort((a, b) => Number(b.isStock) - Number(a.isStock));
}

export default useSortedStockGoods;