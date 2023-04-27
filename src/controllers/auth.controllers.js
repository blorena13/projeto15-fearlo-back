import bcrypt from "bcrypt";
import { db } from "../database/database.connection.js";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {

    const { name, image, email, password } = req.body;

    try {
        const user = await db.collection("registered").findOne({ email });
        if (user) return res.status(409).send("E-mail já cadastrado!");

        const hash = bcrypt.hashSync(password, 10);

        await db.collection("registered").insertOne({ name, image, email, password: hash });
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
        const obj = { image: user.image }
        await db.collection("userOn").insertOne({ token, id: user._id });
        res.status(200).send({ token, userName: user.name, userImage: user.image });

    } catch (err) {

        res.status(500).send(err.message);

    }
}