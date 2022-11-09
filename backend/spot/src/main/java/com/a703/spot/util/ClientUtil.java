package com.a703.spot.util;

import com.a703.spot.dto.response.connection.UserInfoDto;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Component
public class ClientUtil {

    public UserInfoDto requestUserInfo(String token) {

        String url = "http://nolmung.kr/api/user/my-info";
        RestTemplate restTemplate = new RestTemplate();

        // Header set
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        httpHeaders.set(HttpHeaders.AUTHORIZATION,token);

        // Body set

        // Messag
        HttpEntity<?> requestMessage = new HttpEntity<>(httpHeaders);

        // Request
        ResponseEntity<UserInfoDto> response = restTemplate.exchange(url, HttpMethod.GET, requestMessage, UserInfoDto.class);

        return response.getBody();
    }


    public UserInfoDto requestOtherUserInfo(Long userIdx) {

        String url = String.format("http://nolmung.kr/api/user/info/%d", userIdx);
        RestTemplate restTemplate = new RestTemplate();

        // Header set
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        // Messag
        HttpEntity<?> requestMessage = new HttpEntity<>(httpHeaders);

        // Request
        ResponseEntity<UserInfoDto> response = restTemplate.exchange(url, HttpMethod.GET, requestMessage, UserInfoDto.class);

        return response.getBody();
    }

    public void saveImage(MultipartFile file, String savePath) throws IOException {

        String url = "http://localhost:8000/api/image";
        RestTemplate restTemplate = new RestTemplate();

        // Header set
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.MULTIPART_FORM_DATA);

        // Body set
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();

        ByteArrayResource contentsAsResource = new ByteArrayResource(file.getBytes()){
            @Override
            public String getFilename(){
                return file.getOriginalFilename();
            }
        };
//        body.add("file",new ByteArrayResource(file.getBytes()));
//        body.add("file",file);
        body.add("file",contentsAsResource);
        body.add("savePath",savePath);


        // Message
        HttpEntity<MultiValueMap<String,Object>> requestMessage = new HttpEntity<>(body, httpHeaders);

        // Request
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, requestMessage, String.class);

    }

}
