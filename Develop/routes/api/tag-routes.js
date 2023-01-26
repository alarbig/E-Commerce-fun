const router = require('express').Router();
const { response } = require('express');
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
        tag_name: req.body.tag_name
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
        id: req.params.id

    })
    res.status(200).json(tagUpdate)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(deleteTag => {
    if (!deleteTag) {
      res.status(404).json({message: 'An error occurred'});
      return;
    }
    res.json(deleteTag);
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
