export interface PizzaOrder {
  id: string
  customerName: string
  pizzaType: string
  quantity: number
  orderDate: string
  status: string
}

export const pizzaOrders: PizzaOrder[] = [
  {
    id: "PZA001",
    customerName: "John Doe",
    pizzaType: "Margherita",
    quantity: 2,
    orderDate: "2023-05-15 14:30",
    status: "delivered",
  },
  {
    id: "PZA002",
    customerName: "Jane Smith",
    pizzaType: "Pepperoni",
    quantity: 1,
    orderDate: "2023-05-15 15:45",
    status: "preparing",
  },
  {
    id: "PZA003",
    customerName: "Robert Johnson",
    pizzaType: "Veggie Supreme",
    quantity: 3,
    orderDate: "2023-05-15 16:20",
    status: "pending",
  },
  {
    id: "PZA004",
    customerName: "Emily Davis",
    pizzaType: "Hawaiian",
    quantity: 2,
    orderDate: "2023-05-15 17:10",
    status: "out-for-delivery",
  },
  {
    id: "PZA005",
    customerName: "Michael Wilson",
    pizzaType: "BBQ Chicken",
    quantity: 1,
    orderDate: "2023-05-15 18:05",
    status: "delivered",
  },
  {
    id: "PZA006",
    customerName: "Sarah Brown",
    pizzaType: "Meat Lovers",
    quantity: 2,
    orderDate: "2023-05-16 12:30",
    status: "pending",
  },
  {
    id: "PZA007",
    customerName: "David Miller",
    pizzaType: "Buffalo",
    quantity: 1,
    orderDate: "2023-05-16 13:15",
    status: "cancelled",
  },
  {
    id: "PZA008",
    customerName: "Jennifer Taylor",
    pizzaType: "Cheese",
    quantity: 4,
    orderDate: "2023-05-16 14:00",
    status: "preparing",
  },
  {
    id: "PZA009",
    customerName: "James Anderson",
    pizzaType: "Supreme",
    quantity: 2,
    orderDate: "2023-05-16 15:20",
    status: "out-for-delivery",
  },
  {
    id: "PZA010",
    customerName: "Lisa Thomas",
    pizzaType: "Mushroom",
    quantity: 1,
    orderDate: "2023-05-16 16:45",
    status: "delivered",
  },
]
