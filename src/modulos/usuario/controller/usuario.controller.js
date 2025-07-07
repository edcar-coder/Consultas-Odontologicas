const { where } = require("sequelize");
const Aluno = require("../models/usuarioModel");
const bcrypt =require('bcryptjs')
class UsuarioController {
  static async cadastrar(req, res) {
    try {
      const { nome, email } = req.body;
      if (!nome || !email ){
        return res
          .status(400)
          .json({ msg: "Todos os campos devem serem preenchidos!" });
      }
      // criptografando a senha
      const senhaCriptografada = await bcrypt.hash(senha, 15);
      await Usuario.create({ nome, email: senhaCriptografada });
      res.status(200).json({ msg: 'Usuario criado com sucesso' });
    } catch (error) {
        res.status(500).json({msg: 'Erro do servidor. Tente novamente mais tarde!', erro: error.message})
    }
  }
  static async perfil(req, res) {
    try {
      const { nome } = req.usuario
      const usuario = await Usuario.findOne({
        where: {nome},
        attributes: ['nome', 'email']
      });
      if (!usuario) {
        return res.status(401).json({ msg: "Não existe usuario cadastrado!"});
      }
      res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({msg: 'Erro do servidor. Tente novamente mais tarde!', erro: error.message })
    }
  }
}

module.exports = UsuarioController