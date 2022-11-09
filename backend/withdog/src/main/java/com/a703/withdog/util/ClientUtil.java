package com.a703.withdog.util;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@Component
public class ClientUtil {

    public void saveImage(MultipartFile file, String savePath) throws IOException {

//        String url = "http://nolmung.kr/api/image";
        String url = "http://localhost:51041/api/image";
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();

        ByteArrayResource contentsAsResource = new ByteArrayResource(file.getBytes()){
            @Override
            public String getFilename(){
                return file.getOriginalFilename();
            }
        };

        body.add("file",contentsAsResource);
        body.add("savePath",savePath);

        // Message
        HttpEntity<MultiValueMap<String,Object>> requestMessage = new HttpEntity<>(body, httpHeaders);

        // Request
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, requestMessage, String.class);

    }
}
