package com.a703.user.util;

import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JwtUtil {
    private final Environment env;

    public Long jwtToUserIdx(String jwt){
        return Long.parseLong(Jwts.parser()
                .setSigningKey(env.getProperty("token.secret"))
                .parseClaimsJws(jwt.replace("Bearer ", ""))
                .getBody()
                .getSubject());
    }

}
