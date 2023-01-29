const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const getAllCategories = await Category.findAll({
      attributes:[
        'id', 'category_name'
      ], 
      include:[{
        model: Product, 
        attributes:['id', 'category_id', 'product_name', 'price', 'stock']
      }]
    })
    if(!getAllCategories){
      res.status(404).json({message: 'No such category with that id!'})
      return
    }
    res.status(200).json(getAllCategories)
  } catch (err) {
    res.status(500).json(err);
  }

  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const findOneCategory = await Category.findOne({
      where: {
        id: req.params.id
      },
      include:[{ model:Product, 
          attributes:['id', 'category_id', 'product_name', 'price', 'stock']
      }]
    })
    res.status(200).json(findOneCategory)
  } catch (err) {
    res.status(500).json(err)
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryCreate = await Category.create({
        category_name: req.body.category_name

    })
    res.status(200).json(categoryCreate)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryUpdate = await Category.update({
        id: req.params.id

    })
    res.status(200).json(categoryUpdate)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(categoryDelete => {
    if (!categoryDelete) {
      res.status(404).json({message: 'An error occurred'});
      return;
    }
    res.json(categoryDelete);
  }).catch(err =>{
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
