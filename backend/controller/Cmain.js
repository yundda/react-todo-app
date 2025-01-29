const { Todo, sequelize } = require("../models");

exports.getIndex = (req, res) => {
  res.send("response from api-server : [GET /api-server]");
};

exports.getUser = (req, res) => {
  res.send("response from api-server:[GET /api-server/user]");
};

/* todo API 작성 */
// 전체 조회 GET /todos
exports.getTodos = async (req, res) => {
  try {
    const todoAll = await Todo.findAll();
    console.log(todoAll);
    res.send(todoAll);
  } catch (err) {
    console.log("server err", err);
    res.status(500).send("server err");
  }
};

// todo 하나 추가 POST /todo
exports.addTodo = async (req, res) => {
  try {
    const { text } = req.body;
    await Todo.create({
      text,
    });
    res.send({ isSuccess: true });
  } catch (err) {
    console.log("server err", err);
    res.status(500).send("server err");
  }
};
// todo.done 값 변경 PATCH /todoDone/:todoId
exports.patchDoneState = async (req, res) => {
  try {
    const { todoId } = req.params;
    const [isUpdate] = await Todo.update(
      { done: sequelize.literal("NOT done") }, // 바꿀 값 // Sql 문법 그대로 쓰는 메서드 literal
      { where: { id: todoId } } // 찾을 조건
    );
    // [0], [1]
    Boolean(isUpdate)
      ? res.send({ isSuccess: true })
      : res.send({ isSuccess: false }); // 없는 id에 대해 수정하려고 할 때
  } catch (err) {
    console.log("server err", err);
    res.status(500).send("server err");
  }
};

// todo 수정 PATCH /todo/:todoId
exports.patchTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const { text } = req.body;
    const [isUpdate] = await Todo.update(
      {
        text,
      },
      {
        where: { id: todoId },
      }
    );
    Boolean(isUpdate)
      ? res.send({ isSuccess: true })
      : res.send({ isSuccess: false });
  } catch (err) {
    console.log("server err", err);
    res.status(500).send("server err");
  }
};
// todo 삭제 DELETE /todo/:todoId
exports.deleteTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const isDelete = await Todo.destroy({
      where: { id: todoId },
    });
    console.log(isDelete);
    Boolean(isDelete)
      ? res.send({ isSuccess: true })
      : res.send({ isSuccess: false });
  } catch (err) {
    console.log("server err", err);
    res.status(500).send("server err");
  }
};
