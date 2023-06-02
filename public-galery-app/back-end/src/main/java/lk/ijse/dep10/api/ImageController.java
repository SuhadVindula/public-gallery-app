package lk.ijse.dep10.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.Part;
import java.awt.*;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/images")
public class ImageController {
    @Autowired
    private ServletContext servletContext;
    @GetMapping
    public List<String> getAllImages(UriComponentsBuilder uriBuilder){
        ArrayList<String> imageFileList = new ArrayList<>();
        String imgDirPath = servletContext.getRealPath("/images");
        File imgDir = new File(imgDirPath);
        String[] imageFilenames = imgDir.list();
        for (String imageFileName : imageFilenames){
            UriComponentsBuilder cloneBuilder = uriBuilder.cloneBuilder();
            String url = cloneBuilder.
                    pathSegment("images",imageFileName).toUriString();
            imageFileList.add(url);
        }
        return imageFileList;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public List<String> saveImages(@RequestPart("images") List<javax.servlet.http.Part> imageFiles,
                                   UriComponentsBuilder uriBuilder) {

        List<String> imgUrlList = new ArrayList<>();

        if (imageFiles != null) {
            String imageDirPath = servletContext.getRealPath("/images");
            for (Part imageFile : imageFiles) {
               String imageFilePath = new File(imageDirPath, imageFile.getSubmittedFileName()).getAbsolutePath();


                try {
                     imageFile.write(imageFilePath);
                    UriComponentsBuilder cloneBuilder = uriBuilder.cloneBuilder();
                    String imgUrl = cloneBuilder.
                            pathSegment("images", imageFile.getSubmittedFileName()).toUriString();
                    imgUrlList.add(imgUrl);

                } catch (IOException e) {
                    throw new RuntimeException(e);
                }


            }
        }
        return imgUrlList;



    }
}
