const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Joi = require("joi");



const createNewProfile = async (req, res) => {
    const schema = Joi.object({
        sexe: Joi.string().required(),
        pays: Joi.string().required(),
        ville: Joi.string().required(),
    });
    try {
        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const userId = req.user.id;
        const existingProfile = await prisma.Profil.findFirst({
            where: {
                userId: req.params.id
            },
        });
        if (existingProfile) {
            res.json({ message: "you eardy have an acount" });
        } else {
            const newProfile = await prisma.Profil.create({
                data: {
                    sexe: req.body.sexe,
                    pays: req.body.pays,
                    ville: req.body.ville,
                    userId: userId,
                },
            });
            return res.status(201).json(newProfile);
        }


    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ error: "An error occurred while creating a profile" });
    }
};
const editProfile = async (req, res) => {

    const schema = Joi.object({
        sexe: Joi.string().optional(),
        pays: Joi.string().optional(),
        ville: Joi.string().optional(),
    }).or('sexe', 'pays', 'ville');
    try {
        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const userId = req.user.id;
        const existingProfile = await prisma.Profil.findFirst({
            where: {
                userId: userId
            },
        });
        if (!existingProfile) {
            res.json({ message: "You don't have an profile go and creat one" });
        } else {
            const newProfile = await prisma.Profil.update({
                where: {
                    userId: userId
                },
                data: req.body
            });
            return res.status(201).json(newProfile);
        }


    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ error: "An error occurred while creating a profile" });
    }
};

module.exports = { createNewProfile, editProfile };
