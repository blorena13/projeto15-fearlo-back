import bcrypt from "bcrypt";
import { db } from "../database/database.connection.js";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {

    const { name, pet, image, email, password } = req.body;

    try {
        const user = await db.collection("registered").findOne({ email });
        if (user) return res.status(409).send("E-mail já cadastrado!");

        const hash = bcrypt.hashSync(password, 10);

        await db.collection("registered").insertOne({ name, pet, image, email, password: hash });
        res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err.message);

    }
}

export async function signIn(req, res) {

    const { email, password } = req.body;

    try {
        const user = await db.collection("registered").findOne({ email });
        if (!user) {
            return res.status(404).send("Usuário não cadastrado!");
        }

        const correctPassword = bcrypt.compareSync(password, user.password);
        if (!correctPassword) {
            return res.status(401).send("Senha incorreta");
        }

        const token = uuid();
       
        await db.collection("userOn").insertOne({ token, id: user._id, name: user.name, pet: user.pet });
        res.status(200).send({ token, id: user._id, pet: user.pet, name: user.name, image: user.image });

    } catch (err) {

        res.status(500).send(err.message);

    }
}