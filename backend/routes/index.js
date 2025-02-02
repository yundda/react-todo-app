const express = require("express");
const router = express.Router();
const controller = require("../controller/Cmain");

router.get("/", controller.getIndex);
router.get("/user", controller.getUser);

// todo 전체 조회
router.get("/todos", controller.getTodos);

// todo 추가
router.post("/todo", controller.addTodo);

// todo.done 수정
router.patch("/todoDone/:todoId", controller.patchDoneState);

// todo 수정
router.patch("/todo/:todoId", controller.patchTodo);

// todo 삭제
router.delete("/todo/:todoId", controller.deleteTodo);
module.exports = router;
