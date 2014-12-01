package kz.qsport.controller;

import kz.qsport.model.dto.Image;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Controller
@RequestMapping("/ckeditorimage")
public class CKEditorImageController {
    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody  Image[] getImageList(HttpServletRequest request) {
        String contextPath = request.getServletContext().getRealPath(File.separator);

        List<String> paths = getFiles( contextPath  +  "images" );

        List<Image> images = new ArrayList<>();

        for(String path: paths){
            Image image = new Image();
            image.setImage("/images/" + path);
            image.setThumb("/images/thumb/"  +path);
            images.add(image);
        }

        return  images.toArray(new Image[images.size()]);
    }


    private List<String> getFiles(String path){

        List<String> fileNames = new ArrayList<>();

        File folder = new File(path);
        File[] listOfFiles = folder.listFiles();

        for (File file : listOfFiles) {
            if (file.isFile()) {
                fileNames.add(file.getName());
            }
        }

        return fileNames;



    }

}
