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

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagCreate = await Tag.create({
      where: {
        tag_name: req.body.tag_name
      }

    })
    res.status(200).json(tagCreate)
  } catch (err) {
    res.status(500).json(err)
  }
  
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagUpdate = await Tag.update({
      where: {
        id: req.params.id
      }

    })
    res.status(200).json(tagUpdate)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagDestroy = await Tag.destroy({
      where: {
        id: req.params.id
      }

    })
    res.status(200).json(tagDestroy)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
