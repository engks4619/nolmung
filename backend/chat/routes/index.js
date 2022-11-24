const express = require('express');
const router = express.Router();

const Room = require('../schemas/room');
const Chat = require('../schemas/chat');
const {default: axios} = require('axios');

// 채팅방 목록 조회
router.get('/api/socket/room/:userId', async (req, res) => {
  try {
    const rooms = await Room.find({
      $or: [{ownerIdx: req.params.userId}, {opponentIdx: req.params.userId}],
    }).sort('-createdAt');

    const roomList = [];
    for (var i in rooms) {
      // 최근 메시지
      const recentChat = await Chat.findOne({
        roomId: rooms[i]._id.toString(),
      })
        .sort('-createdAt')
        .limit(1);

      var isWriter = false; // 게시글 작성자(견주)인지 체크
      if (rooms[i].opponentIdx === req.params.userId) {
        isWriter = true;
      }

      roomList.push({
        roomId: rooms[i]._id,
        ownerIdx: rooms[i].ownerIdx,
        opponentIdx: rooms[i].opponentIdx,
        postIdx: rooms[i].postIdx,
        createdAt: rooms[i].createdAt,
        recentChat: recentChat,
        thumbnailUrl: rooms[i].thumbnailUrl,
        ownerImgUrl: rooms[i].ownerImgUrl,
        opponentImgUrl: rooms[i].opponentImgUrl,
        pay: rooms[i].pay,
        subject: rooms[i].subject,
        ownerNickname: rooms[i].ownerNickname,
        opponentNickname: rooms[i].opponentNickname,
        isWriter: isWriter,
      });
    }
    console.log(roomList);
    res.json(roomList);
  } catch (error) {
    console.log(error);
  }
});

// 새로운 채팅방 생성 후 채팅방으로 이동
// router.post('/api/socket/room', async (req, res, next) => {
//   const io = req.app.get('io');
//   io.of('/room').emit('newRoom', newRoom);
//   io.of('/room').emit('join', newRoom);
//   io.of('/chat').emit('join', newRoom);

//   try {
//     const room = await Room.findOne({
//       ownerIdx: data.ownerIdx,
//       postIdx: data.postIdx,
//     });

//     if (room === null) {
//       console.log('해당 방이 없습니다. ');
//       const newRoom = await Room.create({
//         opponentIdx: data.opponentIdx,
//         ownerIdx: data.ownerIdx,
//         postIdx: data.postIdx,
//       });
//     } else {
//       console.log('해당 채팅방이 이미 존재합니다. roomId: ', room._id);
//       socket.emit('newRoomId', room._id);
//     }

//     const io = req.app.get('io');
//     io.of('/room').emit('newRoom', newRoom);
//     // res.redirect(`/room/${newRoom._id}`);
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });

// 해당 채팅방으로 이동. 페이징 함수.
router.get('/api/socket/room/:id/:page/:maxChat', async (req, res, next) => {
  console.log(req.query);

  // 프론트에서 요청하는 페이지번호, 요청하는 최대 채팅내역 숫자
  const page = req.params.page;
  const maxChat = req.params.maxChat; // 한 페이지에 최대 채팅 개수

  const paging = (page, totalChat, maxChat) => {
    const maxPage = maxChat;

    let currentPage = page ? parseInt(page) : 1;
    const hideChat = page === 1 ? 0 : (page - 1) * maxChat;
    const totalPage = Math.ceil(totalChat / maxChat); // 전체 페이지 개수

    if (currentPage > totalPage) {
      currentPage = totalPage;
    }

    const startPage = Math.floor((currentPage - 1).maxPage) * maxPage + 1;
    let endPage = startPage + maxPage - 1;
    if (endPage > totalPage) {
      endPage = totalPage;
    }

    return {startPage, endPage, hideChat, maxChat, totalPage, currentPage};
  };

  // 현재 DB에 존재하는 모든 Chat의 총 개수
  const totalChat = await Chat.countDocuments({_id: req.params.id});
  console.log(totalChat);

  // 페이징 함수 호출
  const {
    startPage,
    endPage,
    hideChat,
    // maxChat,
    totalPage,
    currentPage,
  } = paging(page, totalChat, maxChat);

  try {
    const room = await Room.findOne({_id: req.params.id});
    const io = req.app.get('io');

    // 해당 채팅방의 채팅 검색
    const chats = await Chat.find({room: room._id})
      .skip(maxChat * (currentPage - 1))
      .limit(maxChat)
      .sort('createdAt');

    res.status(200).json({
      status: 'success',
      data: {chats, startPage, endPage, maxChat, totalPage, currentPage},
    });

    // return res.render('chat', {
    //   room,
    //   title: room.title,
    //   chats,
    //   user: req.session.color,
    // });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// DB 저장 후 방에 뿌려줌.
// router.post('/api/socket/room/:id/chat', async (req, res, next) => {
//   try {
//     const chat = await Chat.create({
//       room: req.params.id,
//       user: req.session.color,
//       chat: req.body.chat,
//     });
//     req.app.get('io').of('/chat').to(req.params.id).emit('chat', chat);
//     res.send('ok');
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });

module.exports = router;
