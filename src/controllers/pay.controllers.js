import { db } from "../database/database.connection.js";
import dayjs from "dayjs";


export async function payment(req, res) {
  const {name, token, selected, total, cep} = req.body

  try {
    const session = await db.collection("userOn").findOne({token: token})
      const orderData = {
        name, 
        token,
        selected, 
        total, 
        cep, 
        date: dayjs().format('DD/MM/YYYY - HH:mm')
      }
    await db.collection("orders").insertOne(orderData)
    res.sendStatus(200)

  } catch (err) {
    res.status(500).send(err.message)
  }
}
