import { db } from "../database/database.connection.js";

export async function showCards(req, res) {
    const authorization = req.headers.authorization;
    let token = "";
    if(authorization !== undefined){
        const aux = authorization.replace("Bearer ", "");
        token = aux;
    }


    try{
        console.log(token);
        const account = await db.collection("userOn").findOne({token: token});
        const products = await db.collection("products").find().toArray();
        if(!account){
            return res.send(products)
        } else{
            const id = account.id;
            const user = await db.collection("registered").findOne(id);
            const obj = {
                pet: user.pet,
                name: user.name, 
                image: user.image,
                email: user.email
            }
            const sent = {
                obj: obj,
                products: products
            }
            return res.send(sent);
        }

    } catch{
        return res.sendStatus(500);
    }
}