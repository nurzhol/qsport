package kz.qsport.controller;

import kz.qsport.repository.CommentRepository;
import net.tanesha.recaptcha.ReCaptchaImpl;
import net.tanesha.recaptcha.ReCaptchaResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;


@Controller
@RequestMapping("/recaptcha")
public class ReCaptchaController {


    @RequestMapping(method = RequestMethod.POST)
    public @ResponseBody
    boolean activate(HttpServletRequest request, @RequestParam("challenge") String challenge, @RequestParam("response") String response) {

        ReCaptchaImpl reCaptcha = new ReCaptchaImpl();
        reCaptcha.setPrivateKey("6LcR7f4SAAAAABRqS-Iv6LiAVyWA1FhLf5BIAQxQ");

        ReCaptchaResponse reCaptchaResponse = reCaptcha.checkAnswer(request.getRemoteAddr(), challenge, response);
        if (reCaptchaResponse.isValid()) {
            return  true;
        }


        return false;
    }

}
