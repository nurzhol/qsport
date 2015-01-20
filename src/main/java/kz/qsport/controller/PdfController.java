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
@RequestMapping("/pdf")
public class PdfController {
    @RequestMapping(method = RequestMethod.POST)
    public void uploadFile(HttpServletRequest request, @RequestParam("pdfId") String pdfFileName, @RequestParam("pdf") MultipartFile pdfFile) {

        String contextPath = request.getServletContext().getRealPath(File.separator);
        try {
            writeFile(pdfFile.getBytes(), contextPath  +  "pdf" + File.separator + pdfFileName);

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
