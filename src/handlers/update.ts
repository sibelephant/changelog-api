import prisma from "../db"

export const getOneUpdate = async (req, res) => {
    const update = await prisma.update.findUnique({
        where: { id: req.params.id }
    });
    res.json({data:update})
}

export const getUpdates = async (req, res) => {

    cosnt products = await prisma.product.
    const updates = await prisma.update.findMany({
        where:{

        }
    })
}

export const createUpdate = async (req, res) => {

}

export const updateUpdate = async (req, res) => {

}

export const deleteUpdate = async (req, res) => {

}