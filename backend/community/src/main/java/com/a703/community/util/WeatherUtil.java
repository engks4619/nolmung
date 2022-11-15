package com.a703.community.util;


import com.a703.community.dto.response.WeatherDto;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


@Slf4j
@Component
public class WeatherUtil {
    private String type = "json";    //조회하고 싶은 type(json, xml 중 고름)

    public WeatherDto lookUpWeather(int lat,int lng) throws IOException, JSONException {

        LocalDateTime nowDate = LocalDateTime.now(); // 현재시간전
        LocalDateTime ThreeHoursAgo = nowDate.minusHours(1).minusMinutes(41); // 3시간 11분

        String baseDate = ThreeHoursAgo.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String nowbaseTime = ThreeHoursAgo.format(DateTimeFormatter.ofPattern("HH"));

        //시간계산
        String baseTime = nowbaseTime+"00";


        System.out.println("baseTime" + baseTime);
        System.out.println("baseDate" + baseDate);

//		참고문서에 있는 url주소
        String apiUrl = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst";
//         홈페이지에서 받은 키
        String serviceKey = "OzWCxEsMH4G8v45bFLXzMJbColEip5MwX1jJGCRAqVqOoQFZ8qqp%2Frvl55aQ909a%2BHQjxZVhFoIqWDPkjGnTsQ%3D%3D";

        StringBuilder urlBuilder = new StringBuilder(apiUrl);
        urlBuilder.append("?" + URLEncoder.encode("ServiceKey", "UTF-8") + "=" + serviceKey);
        urlBuilder.append("&" + URLEncoder.encode("nx", "UTF-8") + "=" + URLEncoder.encode(String.valueOf(lng), "UTF-8")); //경도 x lng
        urlBuilder.append("&" + URLEncoder.encode("ny", "UTF-8") + "=" + URLEncoder.encode(String.valueOf(lat), "UTF-8")); //위도 y lat
        urlBuilder.append("&" + URLEncoder.encode("base_date", "UTF-8") + "=" + URLEncoder.encode(baseDate, "UTF-8")); /* 조회하고싶은 날짜*/
        urlBuilder.append("&" + URLEncoder.encode("base_time", "UTF-8") + "=" + URLEncoder.encode(baseTime, "UTF-8")); /* 조회하고싶은 시간 AM 02시부터 3시간 단위 */
        urlBuilder.append("&" + URLEncoder.encode("dataType", "UTF-8") + "=" + URLEncoder.encode(type, "UTF-8"));    /* 타입 */

        /*
         * GET방식으로 전송해서 파라미터 받아오기
         */
        URL url = new URL(urlBuilder.toString());

        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        System.out.println("Response code: " + conn.getResponseCode());

        BufferedReader rd;
        if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }

        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }

        rd.close();
        conn.disconnect();
        String result = sb.toString();

        //=======이 밑에 부터는 json에서 데이터 파싱해 오는 부분이다=====//
        JSONObject jsonObj_1 = new JSONObject(result);
        JSONObject response = jsonObj_1.getJSONObject("response").getJSONObject("body").getJSONObject("items");
        JSONArray jsonArray = response.getJSONArray("item");

        JSONObject tmp = jsonArray.getJSONObject(3);
        JSONObject pty = jsonArray.getJSONObject(0);

        WeatherDto weatherDto = new WeatherDto();

        switch (pty.getString("obsrValue")) {
            case "0":
                weatherDto.setWeather("맑음");
                break;
            case "1":
                weatherDto.setWeather("비");
                break;
            case "2":
                weatherDto.setWeather("비눈");
                break;
            case "3":
                weatherDto.setWeather("눈");
        }

        weatherDto.setTemperature(Double.valueOf(tmp.getString("obsrValue")));

        if (weatherDto.getTemperature() >= 7) {
            weatherDto.setDescription("오늘 산책가기 좋은 날씨다멍");
        } else if (weatherDto.getTemperature() >= -1) {
            weatherDto.setDescription("오늘 산책가기 절적한 날씨다멍");
        } else if (weatherDto.getTemperature() >= -9) {
            weatherDto.setDescription("오늘 산책가기 조금 추운 날씨다멍");
        } else {
            weatherDto.setDescription("오늘 산책가기 추운 날씨다멍");
        }

        return weatherDto;
    }

}
