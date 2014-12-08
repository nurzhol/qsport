package kz.qsport.controller;

import kz.qsport.model.Comment;
import kz.qsport.model.Video;
import kz.qsport.repository.CommentRepository;
import kz.qsport.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.Calendar;
import java.util.List;


@Controller
@RequestMapping("/video")
public class VideoController {

    @Autowired
    VideoRepository videoRepository;


    @RequestMapping(value = "/start",method = RequestMethod.POST)
    public @ResponseBody
    int startTime(HttpServletRequest request) {

        List<Video>  videoList =  videoRepository.findAll();

        int startTime = 0;

        int lastVideoId = 0;

        for(Video video: videoList){
            if(video.getId()>lastVideoId)
                lastVideoId = video.getId();

        }

        if(lastVideoId != 0){
            Video video = videoRepository.findOne(lastVideoId);
            startTime = video.getStartTime() + video.getDuration();
        }

        return startTime;
    }


    @RequestMapping(value = "/elem",method = RequestMethod.POST)
    public @ResponseBody
    String playVideoId(HttpServletRequest request) {

        List<Video>  videoList =  videoRepository.findAll();

        Calendar now = Calendar.getInstance();
        int hour = now.get(Calendar.HOUR_OF_DAY);
        int minute = now.get(Calendar.MINUTE);
        int second = now.get(Calendar.SECOND);

        int currentTimeSeconds = second + minute * 60 + hour * 60 * 60;

        int foundStartTime = 0;

        Video foundVideo = null;

        for(Video video: videoList){
            if(video.getStartTime()>currentTimeSeconds)
                continue;

            if(video.getStartTime()> foundStartTime){
                foundStartTime = video.getStartTime();
                foundVideo = video;
            }

        }


        if(foundVideo==null)
            return  "";

        int seek = currentTimeSeconds-foundVideo.getStartTime();

        if(seek>foundVideo.getDuration())
            return "";

        return foundVideo.getYoutubeVideoId()+";"+seek;
    }
}
