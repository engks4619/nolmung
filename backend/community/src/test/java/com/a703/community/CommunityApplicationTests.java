package com.a703.community;

import com.a703.community.util.WeatherUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;

@SpringBootTest
class CommunityApplicationTests {

	@Autowired
	WeatherUtil weatherUtil;

	@Test
	void contextLoads() throws IOException {
		weatherUtil.lookUpWeather();
	}

}
