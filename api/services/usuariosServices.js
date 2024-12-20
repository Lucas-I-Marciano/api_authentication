const db = require("../database/models/index.js");
const { createHashPassword } = require("../utils/HashPass.js");
const uuid = require("uuid");

const userDb = db.usuarios;

class UsuarioService {
  async createUser(dto) {
    const { hashPass, randomB } = createHashPassword(dto["senha"]);
    return await userDb.create({
      id: uuid.v4(),
      nome: dto["nome"],
      email: dto["email"],
      senha: hashPass,
      salt: randomB,
    });
  }

  async getAllUser() {
    const users = await userDb.findAll();
    return users;
  }

  async getUserById(id) {
    const user = await userDb.findAll({
      where: {
        id: id,
      },
    });
    return user;
  }

  async updateUser(id, dto) {
    const userUpdated = await userDb.update(dto, {
      where: {
        id: id,
      },
    });
    return userUpdated;
  }

  async deleteUser(id) {
    const userDeleted = await userDb.destroy({
      where: {
        id: id,
      },
    });
    return userDeleted;
  }
}

module.exports = UsuarioService;
