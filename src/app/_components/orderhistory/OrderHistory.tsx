import OrderHistoryCard from "@/src/app/_components/orderhistory/OrderHistoryCard";
import OrderPagination from "@/src/app/_components/orderhistory/OrderPagination";
import { getOrderHistory } from "@/src/app/_lib/services/history/order-history";
import { getUser } from "@/src/app/_lib/utils";

export default async function OrderHistory({
  page,
}: {
  page: string | undefined;
}) {
  const user = await getUser();
  const { data: orderHistory, count } = await getOrderHistory(user?.id, page);

  console.log(orderHistory, "order");

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {orderHistory?.map((order) => (
          <OrderHistoryCard key={order?.id} order={order} />
        ))}
      </div>

      <OrderPagination
        totalOrders={count}
        rangeOrderDataLength={orderHistory?.length}
      />
    </div>
  );
}
