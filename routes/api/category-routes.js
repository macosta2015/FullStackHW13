const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{model: Product}]
    })
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

// find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', (req, res) => {
  try{
    const categoryData = await Category.findByPk(req.params.id,{
      include: [{model: Product}]
    });

    if(!categoryData){
      res.status(404).json({message: "No Category Found With This ID!!!"});
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// create a new category
router.post('/', (req, res) => {
  try{
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err){
    res.status(400).json(err)
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  const categoryData = await Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
    return res.json(categoryData);
  });

// delete a category by its `id` value
router.delete('/:id', async(req, res) => {
  try{
    const categoryData = await Category.destroy({
      where: { 
        id: req.params.id
      }
    })

    if (!categoryData){
      res.status(404).json({message: "No category with this ID"})
      return;
    }

    res.status(200).json(categoryData)
  } catch (err){
    res.status(500).json(err);
  }
});

module.exports = router;
