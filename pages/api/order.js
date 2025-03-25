import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";

export default async function handler(req, res) {
  await mongooseConnect();

  res.json(await Order.find().sort({ createdAt: -1 }));

  if (req.method === "GET") {
    try {
      const orders = await Order.find().sort({ createdAt: -1 });
      const orderCount = await Order.countDocuments(); // Get total order count
      res.json({ orders, orderCount });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
