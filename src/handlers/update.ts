import prisma from "../db";

export const getOneUpdate = async (req, res) => {
  const update = await prisma.update.findUnique({
    where: { id: req.params.id },
  });
  res.json({ data: update });
};

export const getUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allupdates, product) => {
    return [...allupdates, ...product.updates];
  }, []);

  res.json({ data: updates });
};

export const createUpdate = async (req, res) => {
    const  product = await prisma.product.findUnique({
        where:{
            id:req.body.id
        }
    });

    if (!product){
      //if product does not belong to the user
        res.json({messsage:"you don't have a product"})
    };

    const update = await prisma.update.create({
          data:req.body
    })

    res.json({data:update})

};

export const updateUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []); 

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    //hanmdler
    res.json({message:"update not found"})
  }

  const updated = await prisma.update.update({
    where:{
      id:req.params.id
    },
    data: {
      ...req.body
    }
  });

  res.json({data:updated}) 
};

export const deleteUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []); 

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    //hanmdler
    res.json({message:"update not found"})
  }

  const deleted = await prisma.update.delete({
    where:{
      id:req.params.id
    }
  })

  res.json({data:deleted})
};
