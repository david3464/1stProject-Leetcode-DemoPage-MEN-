var express = require('express');
var router = express.Router();
Category = require('../models/Category');
// app.use('/category', categoryRouter);

//router address localhost:4121/category
//descriptions: Demo All Category
//comments: show all category and search function for specific category
router.get('/', async (req, res, next)=> {
  let searchOptions = {}
  if (req.query.category_name != null && req.query.category_name !== '') {
    searchOptions.category_name = new RegExp(req.query.category_name, 'i')
  }
  if (req.query.type_name != null && req.query.type_name !== '') {
      searchOptions.type_name = new RegExp(req.query.type_name, 'i')
  }
  try {
    console.log(searchOptions)
    const categories = await Category.find(searchOptions).sort({category_name:'asc',type_name:'asc'});
    // console.log(categories)
    res.render('category/homepage', { 
      categories : categories,
      searchOptions : req.query
    })
  }
  catch(err) {
              console.log('err during during 4121/category '+err);
              res.redirect('/')
  }
});

//router address localhost:4121/category/new
//descriptions: Register Demo Page
//comments: show register demo form
router.get('/new', (req, res, next)=> {
  res.render('category/register_type', { category: new Category() });
});


//router address behind the scene(localhost:4121/category/new)
//descriptions: Obtain Registered Demo Information
//comments: get all required infromation
router.post('/new', async (req, res, next)=> {
  let category = new Category ({
        category_name: req.body.category_name,
        type_name: req.body.type_name
  })
  try {  
        const newCategory = await category.save()
        res.redirect('/category')
  } 
  catch(err) {
        console.log('err during during 4121/category/new create new category '+err);
        res.render('category/register_type', {
        category: category,
        error: 'Error in Creating Author'
        })
  }
});

//router address localhost:4121/category/:id
//descriptions: Show Detail Question Information
//comments: Show detail information of a Question
router.get('/:id', (req, res, next)=> {
  res.send('Show Category' + req.params.id)
});

//router address localhost:4121/category/:id/edit
//descriptions: Show Detail Category
//comments: Show detail type of a Category
router.get('/:id/edit', async (req, res, next)=> {
  try {
    let category = await Category.findById(req.params.id)
    res.render('category/edit_type', { category: category });
  } catch(err) {
    console.log('err during during 4121/category '+err);
    res.redirect('/')

  }

});

//router address localhost:4121/question/:id (Behind the Scene)
//descriptions: Update Detail Category-Type Information
//comments: Change detail information of a Type
router.put('/:id', (req, res, next)=> {
  res.send('Update Category' + req.params.id)
});

//router address localhost:4121/question/:id (Behind the Scene)
//descriptions: Delete Specific Category-Type
//comments: Detail this type from Category database
router.delete('/:id', (req, res, next)=> {
  res.send('Delete Category' + req.params.id)
});

//router address localhost:4121/category/:category_name/:type_name
//descriptions: Show Specific Category
//comments:demo all the question belong to this category
// router.get('/:category_name/:type_name', (req, res, next)=> {
//   res.render('question/question_list');
// });
module.exports = router;
