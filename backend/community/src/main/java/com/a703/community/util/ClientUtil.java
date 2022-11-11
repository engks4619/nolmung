package com.a703.community.util;

import com.a703.community.dto.response.connection.DogInfoDto;
import com.a703.community.dto.response.connection.UserInfoDto;
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
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@RequiredArgsConstructor
@Component
public class ClientUtil {


    public UserInfoDto requestUserInfo(String token) {

        String url = "http://user/api/user/my-info";
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

    public List<Long> requestSearchDogInfo(int breedCode) {

        String url = String.format("http://user/api/user/dog/list/breedcode?breedcode=%d", breedCode);
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

    public List<DogInfoDto> requestDogInfo(List<Long> dogIdx) {

//        String url = String.format("http://nolmung.kr/api/user/dog/info");
//        String url = "http://localhost:8080/api/v1/test";
        String targetUrl= UriComponentsBuilder.fromUriString("http://user/api/user/dog/info")
                .queryParam("dogIdxList", dogIdx)
                .build()
                .encode()
                .toUriString();


        RestTemplate restTemplate = new RestTemplate();

        // Header set
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        // Body set
//        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
//        body.add("dogIdxList", dogIdx);
//        Map<String, Object> params = new HashMap<String, Object>();
//        params.put("dogIdxList",dogIdx);

        // Message
        HttpEntity<?> requestMessage = new HttpEntity<>( httpHeaders);

        // Request
        ResponseEntity<DogInfoDto[]> response = restTemplate.getForEntity(targetUrl,DogInfoDto[].class);
//        ResponseEntity<DogInfoDto[]> response = restTemplate.exchange(url, HttpMethod.GET, requestMessage, DogInfoDto[].class,params);
//        DogInfoDto[] response = restTemplate.getForObject(targetUrl, DogInfoDto[].class);

        // Response 파싱
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true);
        List<DogInfoDto> dogInfoDto = Arrays.asList(response.getBody());
        System.out.println(targetUrl);

        return dogInfoDto;
    }


    public UserInfoDto requestOtherUserInfo(Long userIdx) {

        String url = String.format("http://user/api/user/info/%d", userIdx);
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

    public void saveImage(MultipartFile file,String savePath) throws IOException {

        String url = "http://image/api/image";
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
