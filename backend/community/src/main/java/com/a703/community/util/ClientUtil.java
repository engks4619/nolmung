package com.a703.community.util;

import com.a703.community.dto.response.connection.DogInfoDto;
import com.a703.community.dto.response.connection.UserInfoDto;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;

@RequiredArgsConstructor
@Component
public class ClientUtil {


    public UserInfoDto requestUserInfo(String token) throws Exception {

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

        // Response 파싱
//        ObjectMapper objectMapper = new ObjectMapper();
//        objectMapper.configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true);
//        UserInfoDto userInfoDto = objectMapper.readValue(response.getBody(), UserInfoDto.class);

        return response.getBody();
    }

    public List<Long> requestSearchDogInfo(int breedCode) throws Exception {

        String url = "http://localhost:8080/api/v1/test";
        RestTemplate restTemplate = new RestTemplate();

        // Header set
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        // Body set
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("breedCode", String.valueOf(breedCode));

        // Message
        HttpEntity<?> requestMessage = new HttpEntity<>(body, httpHeaders);

        // Request
        Long[] response = restTemplate.getForObject(url,Long[].class);

        // Response 파싱
//        ObjectMapper objectMapper = new ObjectMapper();
//        objectMapper.configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true);
        List<Long> dogIdxList = Arrays.asList(response);

        return dogIdxList;
    }

    public List<DogInfoDto> requestDogInfo(List<Long> dogIdx) throws Exception {

        String url = "http://localhost:8080/api/v1/test";
        RestTemplate restTemplate = new RestTemplate();

        // Header set
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        // Body set
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("dogIdx", String.valueOf(dogIdx));

        // Message
        HttpEntity<?> requestMessage = new HttpEntity<>(body, httpHeaders);

        // Request
        DogInfoDto[] response = restTemplate.getForObject(url,DogInfoDto[].class);


        // Response 파싱
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true);
        List<DogInfoDto> dogInfoDto = Arrays.asList(response);

        return dogInfoDto;
    }

    //목록 보여줄 때 유저인덱스 하나씩 보내서 통신하는 것보다 리스트로 받는게 좋을 것 같음
    public String getUserName(int userIdx) throws Exception {

        String url = "http://localhost:8080/api/v1/test";
        RestTemplate restTemplate = new RestTemplate();

        // Header set
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        // Body set
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("userIdx", String.valueOf(userIdx));

        // Message
        HttpEntity<?> requestMessage = new HttpEntity<>(body, httpHeaders);

        // Request
        String response = restTemplate.getForObject(url,String.class);

        // Response 파싱
//        ObjectMapper objectMapper = new ObjectMapper();
//        objectMapper.configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true);
        String userName = response;

        return userName;
    }

    public void saveImage(MultipartFile file,String savePath) throws Exception {

        String url = "http://localhost:8000/api/image";
        RestTemplate restTemplate = new RestTemplate();

        // Header set
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.MULTIPART_FORM_DATA);

        // Body set
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
//        body.add("file",new ByteArrayResource(file.getBytes()));
        body.add("file",file);
        body.add("savePath",savePath);


        // Message
        HttpEntity<?> requestMessage = new HttpEntity<>(body, httpHeaders);

        // Request
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, requestMessage, String.class);

        // Response 파싱
//        ObjectMapper objectMapper = new ObjectMapper();
//        objectMapper.configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true);
//        UserInfoDto userInfoDto = objectMapper.readValue(response.getBody(), UserInfoDto.class);

    }

}
