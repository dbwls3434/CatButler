const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const getuser = require('../../middleware/getuser');
const User = require('../../models/User');
const Board = require('../../models/Board');
const Paging = require('../../utils/Paging');

/* 게시판 등록 : /api/board/regist */
router.post(
  '/regist',
  getuser,
  [
    check('title', 'Title is required')
      .not()
      .isEmpty(),
    check('content', 'Content is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let { writer, title, content } = req.body;
      let user = null;
      let userId = null;

      if (req.user && req.user.id) {
        userId = req.user.id;
        user = await User.findById(userId);
      }

      if (user) {
        writer = user.name;
      }

      let board = new Board({ user: userId, writer, title, content });

      await board.save();

      res.json({ message: 'Success' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

/* 게시판 글 리스트 가져오기 : /api/board/list */
router.get('/list', async (req, res) => {
  try {
    const { curPage, title } = req.query;
    let query = {};

    if (title) {
      query['title'] = { $regex: title, $options: 'i' };
    }

    const totRows = await Board.countDocuments(query);

    Paging.calculate(curPage, totRows);

    const skipRowNoForQuery = Paging.skipRowNoForQuery;
    const rowsPerPage = Paging.rowsPerPage;
    const list = await Board.find(query)
      .sort({ date: -1 })
      .skip(skipRowNoForQuery)
      .limit(rowsPerPage);

    res.json({ list: list, paging: Paging });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

/* 게시판 글 하나 가져오기 : /api/board/detail/:id */
router.get('/detail/:id', async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);

    if (!board)
      return res.status(400).json({ msg: 'The article is not found' });

    res.json(board);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

/* 게시판 글 하나 수정 : /api/board/delete/:id */
router.post('/update/:id', getuser, async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);

    if (!board)
      return res.status(400).json({ msg: 'The article is not found' });

    if (board.user && req.user && board.user._id == req.user.id) {
      let { title, content } = req.body;
      await Board.updateOne({ _id: req.params.id }, { title, content });

      return res.json({ msg: 'The article updated' });
    }

    res.status(400).json({ msg: "The article didn't be updated" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

/* 게시판 글 하나 삭제 : /api/board/delete/:id */
router.delete('/delete/:id', getuser, async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board)
      return res.status(400).json({ msg: 'The article is not found' });

    if (board.user && req.user && board.user._id == req.user.id) {
      await board.remove();

      return res.json({ msg: 'The article removed' });
    }

    return res.status(400).json({ msg: "The article didn't be removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
