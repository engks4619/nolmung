package com.a703.withdog.util;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@Component
public class ClientUtil {

    private final RestTemplate restTemplate;

    public void saveImage(MultipartFile file, String savePath) throws IOException {
        RestTemplate restTemplate = new RestTemplate();
//        String url = "http://IMAGE/api/image";
        String url = "http://nolmung.kr/api/image";

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

        try {
            // Request
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, requestMessage, String.class);
        } catch (HttpStatusCodeException e) {
            ResponseEntity.status(e.getRawStatusCode()).headers(e.getResponseHeaders())
                    .body(e.getResponseBodyAsString());
        }

    }
}
