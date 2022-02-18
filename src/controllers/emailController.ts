import { Request, Response } from 'express'; 
import nodemailer from 'nodemailer';

export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
}

export const contato = async (req: Request, res: Response) => {

    // 1- Configurar o transporter (configurar o servidor smtp)
    // 1.1 - Será utilizado um servidor fake - mailtrap

    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "00c900a7ce9b24",
          pass: "270f19d6cc83c1"
        }
      });

    // 2- Configurar a mensagem
    let message = {
        // from: 'Roberto Silva <roberto@hotmail.com>',
        // to: 'teste@hotmail.com',
        // subject: 'Assunto legal',
        // html: 'Opa <strong> Teste </strong>, como vai?',
        // text:'Opa Teste, como vai?'

        //pegando da requisição
        // DICA: usar um e-mail não-responda
        from: 'nao-responda@mimo.com.br', //req.body.from,
        to: 'mimorubber@gmail.com',
        replyTo: req.body.from,
        subject: req.body.subject,
        html: req.body.email,
        text: req.body.email,
    }

    // 3- Enviar a mensagem
    let info = await transport.sendMail(message);

    console.log('Info', info);


    res.json({pong: true});
}

