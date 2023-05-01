import { db } from "../database/database.connection.js";
import dayjs from "dayjs";


export async function payment(req, res) {
  const {productId, quant} = req.body
  const {authorization} = req.headers
  const token = authorization?.replace("Bearer ", "");

  if(!token) return res.sendStatus(401);
  try {
    const session = await db.collection("sessions").findOne({token: token})
      const orderData = {
        productId: productId,
        quant: quant,
        date: dayjs().format('DD/MM/YYYY - HH:mm'),
        userId: session.userId
    }
    await db.collection("orders").insertOne(orderData)
    res.sendStatus(200)

  } catch (err) {
    res.status(500).send(err.message)
  }
}