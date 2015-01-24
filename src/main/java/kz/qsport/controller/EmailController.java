package kz.qsport.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;

@Controller
@RequestMapping("/email")
public class EmailController {

    @Autowired
    private MailSender javaMailSender;

    @RequestMapping(method = RequestMethod.POST)
    public String sendEmail( @RequestParam("email") String email, @RequestParam("emailBody") String emailBody) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setCc("qsportkz@mail.ru");
        message.setFrom("qsportkz@mail.ru");
        message.setSubject(new Date().toString());
        message.setText(emailBody);
        javaMailSender.send(message);

        return "../index.html";
    }
}
