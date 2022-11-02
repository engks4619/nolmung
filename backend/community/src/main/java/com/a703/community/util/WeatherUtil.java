package com.a703.community.util;


import com.a703.community.dto.request.WeatherRequest;
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

    public WeatherDto lookUpWeather(WeatherRequest weatherRequest) throws IOException, JSONException {

        String lat = String.valueOf(weatherRequest.getLat());

        String lng = String.valueOf(weatherRequest.getLng());

        LocalDateTime nowDate = LocalDateTime.now(); // 현재시간전
        LocalDateTime ThreeHoursAgo = nowDate.minusHours(3).minusMinutes(11); // 3시간 11분전

        String baseDate = ThreeHoursAgo.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String nowbaseTime = ThreeHoursAgo.format(DateTimeFormatter.ofPattern("HHmm"));

        //시간계산
        String baseTime = timeChange(nowbaseTime);

        System.out.println("baseTime" + baseTime);
        System.out.println("baseDate" + baseDate);

//		참고문서에 있는 url주소
        String apiUrl = "  http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
//         홈페이지에서 받은 키
        String serviceKey = "OzWCxEsMH4G8v45bFLXzMJbColEip5MwX1jJGCRAqVqOoQFZ8qqp%2Frvl55aQ909a%2BHQjxZVhFoIqWDPkjGnTsQ%3D%3D";

        StringBuilder urlBuilder = new StringBuilder(apiUrl);
        urlBuilder.append("?" + URLEncoder.encode("ServiceKey", "UTF-8") + "=" + serviceKey);
        urlBuilder.append("&" + URLEncoder.encode("nx", "UTF-8") + "=" + URLEncoder.encode(lng, "UTF-8")); //경도 x lng
        urlBuilder.append("&" + URLEncoder.encode("ny", "UTF-8") + "=" + URLEncoder.encode(lat, "UTF-8")); //위도 y lat
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
        log.info("날씨 정보 : {}", jsonArray);
        JSONObject tmp = jsonArray.getJSONObject(0);
        JSONObject sky = jsonArray.getJSONObject(5);
        JSONObject pty = jsonArray.getJSONObject(6);
        log.info("기온 : {}, 구름 : {}, 날씨 : {}", tmp, sky, pty);


        WeatherDto weatherDto = new WeatherDto();

        switch (sky.getString("fcstValue")) {
            case "1":
                weatherDto.setWeather("맑음");
                break;
            case "3":
                weatherDto.setWeather("구름많음");
                break;
            case "4":
                weatherDto.setWeather("흐림");
        }
        switch (pty.getString("fcstValue")) {
            case "1":
                weatherDto.setWeather("비");
                break;
            case "2":
                weatherDto.setWeather("비눈");
                break;
            case "3":
                weatherDto.setWeather("눈");
        }

        weatherDto.setTemperature(Integer.valueOf(tmp.getString("fcstValue")));

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

    public String timeChange(String nowBaseTime) {
        // 현재 시간에 따라 데이터 시간 설정(3시간 마다 업데이트) //
        int time = Integer.parseInt(nowBaseTime);

        String newTime;
        if (time >= 2300) {
            newTime = "2300";
        } else if (time >= 2000) {
            newTime = "2000";
        } else if (time >= 1700) {
            newTime = "1700";
        } else if (time >= 1400) {
            newTime = "1400";
        } else if (time >= 1100) {
            newTime = "1100";
        } else if (time >= 800) {
            newTime = "0800";
        } else if (time >= 500) {
            newTime = "0500";
        } else {
            newTime = "0200";
        }
        return newTime;
    }


}
