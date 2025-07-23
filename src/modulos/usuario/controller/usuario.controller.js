const bcrypt = require("bcryptjs");
const User = require("../models/usuario.model");

class UsuarioController {
  static async cadastrar(req, res) {
    try {
      const { id, nome, papel, email, senha } = req.body;

      // Verificar se todos os campos obrigatórios foram preenchidos
      if (!id || !nome || !email || !senha || !papel) {
        return res
          .status(400)
          .json({ msg: "Todos os campos devem ser preenchidos!" });
      }

      // Verificar se o tipo de papel é válido
      const tiposValidos = ["dentista", "administrador", "paciente"];
      if (!tiposValidos.includes(papel.toLowerCase())) {
        return res
          .status(400)
          .json({ msg: "O tipo deve ser 'dentista', 'administrador' ou 'paciente'." });
      }

      // Verificar se o email já está cadastrado
      const emailExistente = await User.findOne({ where: { email } });
      if (emailExistente) {
        return res
          .status(400)
          .json({ msg: "O email já está cadastrado!" });
      }

      // Criptografar a senha
      const senhaCriptografada = await bcrypt.hash(senha, 10);

      // Criar o usuário
      await User.create({
        id,
        nome,
        email,
        senha: senhaCriptografada,
        tipo: papel.toLowerCase(),
      });

      res.status(201).json({ msg: "Usuário criado com sucesso!" });
    } catch (error) {
      res.status(500).json({
        msg: "Erro do servidor. Tente novamente mais tarde!",
        erro: error.message,
      });
    }
  }

  static async perfil(req, res) {
    try {
      const { id } = req.usuario;

      // Buscar o usuário pelo ID
      const usuario = await User.findOne({
        where: { id },
        attributes: ["nome", "email", "tipo"],
      });

      if (!usuario) {
        return res.status(404).json({ msg: "Usuário não encontrado!" });
      }

      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({
        msg: "Erro do servidor. Tente novamente mais tarde!",
        erro: error.message,
      });
    }
  }
}

module.exports = UsuarioController;
