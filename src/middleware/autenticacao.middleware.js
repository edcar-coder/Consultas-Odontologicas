const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();
const Usuario = require("../modulos/usuario/models/usuario.model");


// Definindo variaveis de ambiente para TEMPO_ACESS_TOKEN e TEMPO_REFRESH_TOKEN
const tempo_acess_token = process.env.TEMPO_ACESS_TOKEN;
const tempo_refresh_token = process.env.TEMPO_REFRESH_TOKEN;

class AutenticacaoController {
  // gerando o token
  static gerarTokenAcesso(dadosConsulta) {
    return jwt.sign(dadosConsulta, process.env.SECRET_KEY, {
      expiresIn: tempo_acess_token,
    });
  }
  // refress token
  static gerarRefressToken(dadosConsulta) {
    return jwt.sign(dadosConsulta, process.env.SECRET_KEY, {
      expiresIn: tempo_refresh_token,
    });
  }

  static async login(req, res) {
    try {
      const { nome, email, senha } = req.body;
      if (!nome || !email || !senha) {
        return res
          .status(400)
          .json({ msg: "É necessario informar nome e email para login" });
      }
      const usuario = await Usuario.findOne({
        where: { nome, email, senha } // Verifica nome e email
      });
      if (!usuario) {
        return res.status(401).json({ msg: "Usuario não encontrado!" });
      }
      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
      if (!senhaCorreta) {
        return res.status(400).json({ msg: "E-mail ou senha incorreto!" });
      }
      const dadosConsulta= {
        nome: usuario.nome,
        email: usuario.email, // Adicione isso
        senha: usuario.senha, // Adicione isso se necessário para o token
        papel: "consulta",
      };

      // gerando os tokens
      const tokenAcesso = AutenticacaoController.gerarTokenAcesso(dadosConsulta);
      const refreshToken = AutenticacaoController.gerarRefressToken(dadosConsulta);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV,
        sameStrict: "strict",
        maxAge: 1 * 24, // 1 dia
      });
      res.status(200).json({
        msg: "Usuario logado com sucesso",
        tokenAcesso,
        nome: usuario.nome,
        papel: "consulta",
      });
    } catch (error) {
      res.status(500).json({
        msg: "Erro interno do servidor. Por favor tente mais tarde.",
        erro: error.message,
      });
    }
  }
  // Método para renovar o refresh token
  static refreshToken(req, res) {
    // busca o refreshToken na req
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(403).json({ msg: "Refresh token invalido!" });
    }
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET,
      (erro, usuario) => {
        if (erro) {
          return res.status(403).json({ msg: "Refresh Token invalido!" });
        }
        const dadosConsulta = {
          nome: usuario.nome,
          email: usuario.email, // Adicione isso
          senha: usuario.senha, 
          papel: "consulta",
        };

        // gerando o novo token
        const novoTokenAcesso = this.gerarTokenAcesso(dadosConsulta);
        // atualizando o token antigo para o novo
        res.status(200).json({ tokenAcesso: novoTokenAcesso });
      }
    );
  }
  static async sair(req, res) {
    try {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "development",
        sameSite: "strict",
      });
      res.status(200).json({ msg: "Logout realizado com sucesso" });
    } catch (error) {
      res.status(500).json({
        msg: "Erro interno do servidor. Por favor, tente mais tarde.",
        erro: error.message,
      });
    }
  }
}

module.exports = AutenticacaoController;