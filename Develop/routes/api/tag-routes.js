const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const getAllTags = await Tag.findAll({
      attributes :[ 
        'tag_name'
      ], 
      include:[{
        model: Product, 
        attributes:['id', 'category_id', 'product_name', 'price', 'stock']
      }]
    })
    res.status(200).json(getAllTags)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const findOneTag = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include:[{
        model:Product, 
        attributes:['id', 'category_id', 'product_name', 'price', 'stock']
      }]
    })
    res.status(200).json(findOneTag)
  } catch (err) {
    res.status(500).json(err)
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
