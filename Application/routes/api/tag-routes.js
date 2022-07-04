const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

  // find all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll ({
      include:[{model: Product}]
    })
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
});

  // find a single tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk (req.params.id, {
      include:[{model: Product}]
    })

    if(!tagData) {
      res.status(404).json({message: "No Tag found with this ID!!!"});
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
});

  // create a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err)
  }
});

  // update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(tagData => {
    if (!tagData) {
      res.status(404).json({message: "No Tag found with this ID!!!"})
      return;
    }
    res.json(tagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

  // delete on tag by its `id` value
router.delete('/:id',  (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(tagData => {
      if (!tagData) {
        res.status(404).json({message: "No Tag found with this ID!!!"})
        return;
      }
      res.json(tagData);
    })
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});



module.exports = router;