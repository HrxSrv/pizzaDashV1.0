import { pizzaOrders, PizzaOrder } from "@/lib/data"

// This function handles the chat with order data context
export async function chatWithOrderData(message: string): Promise<string> {
  try {
    // Prepare the order data context
    const orderContext = generateOrderContext(pizzaOrders)
    
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        context: orderContext
      }),
    })

    if (!response.ok) {
      throw new Error('Chat API request failed')
    }

    const data = await response.json()
    return data.response
  } catch (error) {
    console.error('Error in chat service:', error)
    throw error
  }
}

// Generate structured context from pizza orders
function generateOrderContext(orders: PizzaOrder[]): string {
  const totalOrders = orders.length
  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const pizzaTypeCounts = orders.reduce((acc, order) => {
    acc[order.pizzaType] = (acc[order.pizzaType] || 0) + order.quantity
    return acc
  }, {} as Record<string, number>)

  const totalRevenue = orders.reduce((sum, order) => {
    // Assuming average price per pizza for demo purposes
    const pricePerPizza = getPizzaPrice(order.pizzaType)
    return sum + (order.quantity * pricePerPizza)
  }, 0)

  const recentOrders = orders
    .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
    .slice(0, 5)

  return `
Pizza Order Data Analysis Context:

SUMMARY STATISTICS:
- Total Orders: ${totalOrders}
- Total Revenue: $${totalRevenue.toFixed(2)}
- Average Order Value: $${(totalRevenue / totalOrders).toFixed(2)}

ORDER STATUS BREAKDOWN:
${Object.entries(statusCounts)
  .map(([status, count]) => `- ${status}: ${count} orders`)
  .join('\n')}

PIZZA TYPE POPULARITY:
${Object.entries(pizzaTypeCounts)
  .sort(([,a], [,b]) => b - a)
  .map(([type, count]) => `- ${type}: ${count} pizzas sold`)
  .join('\n')}

RECENT ORDERS (Last 5):
${recentOrders
  .map(order => `- ${order.id}: ${order.customerName} ordered ${order.quantity}x ${order.pizzaType} (${order.status})`)
  .join('\n')}

DETAILED ORDER DATA:
${orders.map(order => 
  `Order ${order.id}: Customer: ${order.customerName}, Pizza: ${order.pizzaType}, Quantity: ${order.quantity}, Date: ${order.orderDate}, Status: ${order.status}`
).join('\n')}

You are an AI assistant helping analyze this pizza restaurant's order data. Answer questions about trends, customer behavior, popular items, order statuses, and provide insights based on this data.
`
}

// Helper function to get pizza prices (you can customize these)
function getPizzaPrice(pizzaType: string): number {
  const prices: Record<string, number> = {
    'Margherita': 12.99,
    'Pepperoni': 14.99,
    'Veggie Supreme': 16.99,
    'Hawaiian': 15.99,
    'BBQ Chicken': 17.99,
    'Meat Lovers': 19.99,
    'Buffalo': 16.99,
    'Cheese': 11.99,
    'Supreme': 18.99,
    'Mushroom': 13.99,
  }
  return prices[pizzaType] || 15.99 // default price
}