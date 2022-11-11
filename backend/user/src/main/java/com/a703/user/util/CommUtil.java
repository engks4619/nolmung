package com.a703.user.util;

import com.a703.user.vo.request.Message;
import com.a703.user.vo.request.RequestSms;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.binary.Base64;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.yaml.snakeyaml.util.UriEncoder;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Component
@RequiredArgsConstructor
@Slf4j
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
        ByteArrayResource byteFile = new ByteArrayResource(file.getBytes()) {
            @Override
            public String getFilename() {
                return file.getOriginalFilename();
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

    public HttpStatus sendSms(String phone, String cert) throws JsonProcessingException {
        String baseUrl = env.getProperty("sms.base-url");
        String additionalUrl = String.format(env.getProperty("sms.additional-url"), UriEncoder.encode(env.getProperty("sms.service-id")));
        //header 설정
        HttpHeaders headers = new HttpHeaders();
        String timestamp = "" + System.currentTimeMillis();
        String accessKey = env.getProperty("sms.access-key");
        assert accessKey != null;
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-ncp-apigw-timestamp", timestamp);
        headers.set("x-ncp-iam-access-key", accessKey);
        headers.set("x-ncp-apigw-signature-v2", makeSignature(additionalUrl, timestamp, accessKey));
        //body 설정
        List<Message> messages = new ArrayList<>();
        Message message = Message.builder()
                .to(phone.replace("-", ""))
                .build();
        messages.add(message);
        RequestSms requestSms = RequestSms.builder()
                .type("SMS")
                .from(env.getProperty("sms.my-number"))
                .content(String.format(Objects.requireNonNull(env.getProperty("sms.content")), cert))
                .messages(messages)
                .build();
        ObjectMapper mapper = new ObjectMapper();
        String body = mapper.writeValueAsString(requestSms);
        log.info(body);
        HttpEntity<String> httpEntity = new HttpEntity<>(body, headers);
//        ResponseEntity<String> response = restTemplate.exchange(baseUrl + additionalUrl, HttpMethod.POST, httpEntity, String.class);
//        return response.getStatusCode();
        return HttpStatus.ACCEPTED;
    }

    public String makeSignature(String url, String timestamp, String accessKey) {
        String space = " ";                    // one space
        String newLine = "\n";                    // new line
        String method = "POST";                    // method
        String secretKey = env.getProperty("sms.secret-key");            // access key id (from portal or Sub Account)

        String message = method +
                space +
                url +
                newLine +
                timestamp +
                newLine +
                accessKey;

        assert secretKey != null;
        SecretKeySpec signingKey = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(signingKey);
            byte[] rawHmac = mac.doFinal(message.getBytes(StandardCharsets.UTF_8));

            return Base64.encodeBase64String(rawHmac);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
