import { db } from "../database/database.connection.js";
import dayjs from "dayjs";


export async function payment(req, res) {
  const {name, token, id, text, quant, price, total, cep} = req.body

  try {
    const session = await db.collection("userOn").findOne({token: token})
      const orderData = {
        name, 
        token,
        id, 
        text, 
        quant, 
        price, 
        total,
        cep,
        date: dayjs().format('DD/MM/YYYY - HH:mm'),
        userId: session.userId
    }
    await db.collection("orders").insertOne(orderData)
    res.sendStatus(200)

  } catch (err) {
    res.status(500).send(err.message)
  }
}
