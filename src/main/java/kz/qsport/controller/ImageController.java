package kz.qsport.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.*;

@Controller
@RequestMapping("/picture")
public class ImageController {
    @RequestMapping(method = RequestMethod.POST)
    public void uploadFile(HttpServletRequest request, @RequestParam("pictureId") String imageFileName, @RequestParam("picture") MultipartFile imageFile) {

        String contextPath = request.getServletContext().getRealPath(File.separator);

        try {
            writeFile(imageFile.getBytes(), contextPath  +  "images" + File.separator +imageFileName);
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
