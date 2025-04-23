// routes/category.js
const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Thêm danh mục
router.post('/add', async (req, res) => {
    try {
        const lastCategory = await Category.findOne().sort({ idCategory: -1 }).limit(1);
        const newIdCategory = lastCategory?.idCategory ? lastCategory.idCategory + 1 : 1;

        const newCategory = new Category({
            idCategory: newIdCategory,
            name: req.body.name,
            image: req.body.image,
        });

        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi server khi thêm category' });
    }
});

// Lấy tất cả danh mục
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi server', error: err.message });
    }
});

// ✅ Cập nhật danh mục theo idCategory
router.put('/:idCategory', async (req, res) => {
  try {
      const { name, image } = req.body;
      const { idCategory } = req.params;

      const updatedCategory = await Category.findOneAndUpdate(
          { idCategory: parseInt(idCategory) },
          { name, image },
          { new: true }
      );

      if (!updatedCategory) {
          return res.status(404).json({ message: 'Không tìm thấy danh mục với idCategory này' });
      }

      res.json(updatedCategory);
  } catch (err) {
      console.error('Lỗi khi cập nhật category:', err);
      res.status(500).json({ message: 'Lỗi server khi cập nhật category' });
  }
});
// ❌ Xoá category theo idCategory
router.delete('/:idCategory', async (req, res) => {
  const id = parseInt(req.params.idCategory);
  try {
    const deleted = await Category.findOneAndDelete({ idCategory: id });
    if (!deleted) {
      return res.status(404).json({ message: 'Không tìm thấy category để xoá' });
    }
    res.json({ message: 'Xoá category thành công', category: deleted });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server khi xoá category', error: err.message });
  }
});

module.exports = router;
// {
//     "response_code": 0,
//     "results": [{ 
      
        
//             "category": "Entertainment: Books",
//             "question": "Who wrote the novel &#039;Fear And Loathing In Las Vegas&#039;?",
//             "correct_answer": "Hunter S. Thompson",
//             "incorrect_answers": [
//                 "F. Scott Fitzgerald",
//                 "Henry Miller",
//                 "William S. Burroughs"
//             ]
//         }, ]
// } 