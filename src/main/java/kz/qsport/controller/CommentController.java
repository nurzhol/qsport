package kz.qsport.controller;

import kz.qsport.model.Comment;
import kz.qsport.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;


@Controller
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    CommentRepository commentRepository;

    @RequestMapping(method = RequestMethod.POST)
    public String activate(HttpServletRequest request, @RequestParam("commentId") String commentId) {
        commentRepository.activate(Integer.valueOf(commentId));

        return "../#comments";
    }


    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public String delete(HttpServletRequest request, @RequestParam("commentId") String commentId) {
        commentRepository.delete(Integer.valueOf(commentId));

        return "../../#comments";
    }


    @RequestMapping(value = "/count",method = RequestMethod.POST)
    public @ResponseBody
    int count(HttpServletRequest request) {

        List<Comment>  comments =  commentRepository.findAll();

        int counter = 0;

        for(Comment comment: comments){
            if(comment.getActive() == 0)
                counter++;
        }

        return counter;
    }
}
