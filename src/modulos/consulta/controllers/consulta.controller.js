const { Op } = require("sequelize");
const Consulta = require("../models/consulta.model"); // Caminho ajustado conforme sua estrutura

class ConsultaController {
  static async cadastrarconsulta(req, res) {
    try {
      const { nome, email } = req.body;
      if (!nome || !email) {
        return res.status(400).json({ msg: "Todos os campos devem ser preenchidos!" });
      }

      await Consulta.create({ nome, email });
      res.status(200).json({ msg: "Consulta criada com sucesso" });
    } catch (error) {
      res.status(500).json({
        msg: "Erro do servidor. Tente novamente mais tarde!",
        erro: error.message,
      });
    }
  }

  static async usuario(req, res) {
    try {
      const { consultaID } = req.usuario; 
      const consulta = await Consulta.findOne({
        where: { id: consultaID },
        attributes: ["nome", "email"],
      });

      if (!consulta) {
        return res.status(401).json({ msg: "Não existe consulta cadastrada para esse usuário!" });
      }

      res.status(200).json(consulta);
    } catch (error) {
      res.status(500).json({
        msg: "Erro do servidor. Tente novamente mais tarde!",
        erro: error.message,
      });
    }
  }

  static async listarConsultas(req, res) {
    try {
      const consultas = await Consulta.findAll({
        attributes: ["nome", "email"],
        order: [["nome", "ASC"]],
      });

      if (!consultas.length) {
        return res.status(404).json({ msg: "Nenhuma consulta encontrada!" });
      }

      res.status(200).json(consultas);
    } catch (error) {
      res.status(500).json({
        msg: "Erro do servidor. Tente novamente mais tarde!",
        erro: error.message,
      });
    }
  }

  static async consultarPorNome(req, res) {
    try {
      const { nome } = req.query;
      const consultas = await Consulta.findAll({
        where: {
          nome: {
            [Op.like]: `%${nome}%`,
          },
        },
        attributes: ["nome", "email"],
      });

      if (!consultas.length) {
        return res.status(404).json({ msg: "Nenhuma consulta encontrada com esse nome!" });
      }

      res.status(200).json(consultas);
    } catch (error) {
      res.status(500).json({
        msg: "Erro do servidor. Tente novamente mais tarde!",
        erro: error.message,
      });
    }
  }
}

module.exports = ConsultaController;
