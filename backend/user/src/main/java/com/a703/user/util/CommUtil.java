package com.a703.user.util;

import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class CommUtil {

    private final RestTemplate restTemplate;
    private final Environment env;

    public void saveImage(MultipartFile file, String savePath) throws IOException {
        String url = env.getProperty("image.url");
        assert url != null;
        //header 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        //body 설정
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        ByteArrayResource byteFile = new ByteArrayResource(file.getBytes()){
            @Override
            public String getFilename(){
                return file.getName();
            }
        };
        body.add("file", byteFile);
        body.add("savePath", savePath);
        //http통신
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST,
                new HttpEntity<>(body, headers), String.class);
    }

    public String extractExt(String originalFilename) {
        int pos = originalFilename.lastIndexOf(".");
        return originalFilename.substring(pos + 1);
    }
}
