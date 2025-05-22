import { OrdersTable } from "@/components/orders/orders-table"
import { pizzaOrders } from "@/lib/data"

export default function OrdersPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Pizza Orders</h2>
      </div>
      <OrdersTable orders={pizzaOrders} />
    </div>
  )
}
