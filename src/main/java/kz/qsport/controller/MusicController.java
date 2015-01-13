package kz.qsport.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@Controller
@RequestMapping("/music")
public class MusicController {
    @RequestMapping(method = RequestMethod.POST)
    public void uploadFile(HttpServletRequest request, @RequestParam("musicId") String musicFileName, @RequestParam("music") MultipartFile musicFile) {

        String contextPath = request.getServletContext().getRealPath(File.separator);
        try {
            writeFile(musicFile.getBytes(), contextPath  +  "music" + File.separator + musicFileName);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void writeFile(byte[] content, String filename) throws IOException {
        File file = new File(filename);
        if (!file.exists()) {
            file.createNewFile();
        }
        FileOutputStream fop = new FileOutputStream(file);
        fop.write(content);
        fop.flush();
        fop.close();
    }

}
