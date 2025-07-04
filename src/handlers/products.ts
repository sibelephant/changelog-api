import prisma from "../db"

//get all products
export const getProducts = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            products: true
        }
    })

    res.json({
        data: user.products
    })
};

//get a product
export const getProduct = async (req, res) => {
    const id = req.params.id;

    const product = await prisma.product.findFirst({
        where: {
            id,
            belongsToId: req.user.id,
        
        }
    })
    res.json({data:product})
}

//create product

export const createProduct = async (req, res) => {
    const product = await prisma.product.create({
        data: {
            name: req.body.name,
            belongsToId: req.user.id
        }
    })

    res.json({
        data: product
    })
}


//update product
export const updateProduct = async (req, res) => {
    const updated = await prisma.product.update({
        where: {
            id: req.params.id,
            belongsToId:req.user.id
        },
        data: {
            name: req.body.name
        }
    });

    res.json({data:updated})
}
//delete

export const deleteProduct = async (req,res)=>{
    const deleted = await prisma.product.delete({
        where:{
            id:req.params.id,
            belongsToId:req.user.id
        }
    })
}


