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
import java.util.ArrayList;
import java.util.List;


@Slf4j
@Component
public class WeatherUtil {
    private String type = "json";    //조회하고 싶은 type(json, xml 중 고름)

    public WeatherDto lookUpWeather(double lat,double lng) throws IOException, JSONException {

        List<Integer> xy = latlngChange(lat,lng);
        String x = String.valueOf(xy.get(0));
        String y = String.valueOf(xy.get(1));


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
        urlBuilder.append("&" + URLEncoder.encode("nx", "UTF-8") + "=" + URLEncoder.encode(x, "UTF-8")); //경도 x lng
        urlBuilder.append("&" + URLEncoder.encode("ny", "UTF-8") + "=" + URLEncoder.encode(y, "UTF-8")); //위도 y lat
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

    private List<Integer> latlngChange(double lat, double lng){
        List<Integer> xy = new ArrayList<>();
        double RE = 6371.00877; // 지구 반경(km)
        double GRID = 5.0; // 격자 간격(km)
        double SLAT1 = 30.0; // 투영 위도1(degree)
        double SLAT2 = 60.0; // 투영 위도2(degree)
        double OLON = 126.0; // 기준점 경도(degree)
        double OLAT = 38.0; // 기준점 위도(degree)
        double XO = 43; // 기준점 X좌표(GRID)
        double YO = 136; // 기1준점 Y좌표(GRID)

        double re = RE/GRID;
        double DEGRAD = Math.PI / 180.0;
        double RADDEG = 180.0 / Math.PI;


        double slat1 = SLAT1 * DEGRAD;
        double slat2 = SLAT2 * DEGRAD;
        double olon = OLON * DEGRAD;
        double olat = OLAT * DEGRAD;
        double sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
        sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
        double sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
        sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
        double ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
        ro = re * sf / Math.pow(ro, sn);

        double ra = Math.tan(Math.PI * 0.25 + (lat) * DEGRAD * 0.5);
        ra = re * sf / Math.pow(ra, sn);
        double theta = lng * DEGRAD - olon;
        if (theta > Math.PI) theta -= 2.0 * Math.PI;
        if (theta < -Math.PI) theta += 2.0 * Math.PI;
        theta *= sn;
        xy.add((int) Math.floor(ra * Math.sin(theta) + XO + 0.5));
        xy.add((int) Math.floor(ro - ra * Math.cos(theta) + YO + 0.5));
        return xy;
    }

}
