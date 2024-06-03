//package com.example.demo.security.jwt;
//
//import com.example.demo.entity.User;
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.security.Keys;
//import jakarta.annotation.PostConstruct;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//import io.jsonwebtoken.SignatureAlgorithm;
//
//import java.security.Key;
//import java.util.Date;
//
//@Service
//public class JwtUtils {
//
//    @Value("${jwt.algorithm.key}")
//    private String algorithmKey;
//    @Value("${jwt.issuer}")
//    private String issuer;
//    @Value("${jwt.expiryInSeconds}")
//    private Integer expiryInSeconds;
//    private SignatureAlgorithm algorithm;
//    private static final String USERNAME_KEY="USERNAME";
//
//    @PostConstruct
//    public void postConstruct(){
//
//        algorithm = SignatureAlgorithm.HS256;
//
//    }
//
//    public String generateJWT(User user){
//
//
//        Claims claims = Jwts.claims()
//                .setIssuer(issuer)
//                .setIssuedAt(new Date(System.currentTimeMillis()))
//                .setExpiration(new Date(System.currentTimeMillis() + (1000*expiryInSeconds)));
//
//        claims.put(USERNAME_KEY,user.getUsername());
//
//        // generating key instance from key bytes
//       Key key = Keys.hmacShaKeyFor(algorithmKey.getBytes());
//
//        return Jwts.builder()
//                .setClaims(claims)
//                .signWith(algorithm,key)
//                .compact();
//        //compact is to convert to string
//    }
//
//
//    //if the token is invalidated then to take the username from the token
//    //and then assign it to the security session
//    public String getUsername(String token){
//        Claims claims = Jwts.parserBuilder().build().parseClaimsJws(token).getBody();
//
//        // Retrieve the username from claims
//        return claims.get("USERNAME", String.class);
//    }
//
//
//    }
//





package com.example.demo.security.jwt;

import com.example.demo.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

import static org.springframework.security.config.Elements.JWT;

@Component
public class JwtUtils {


    @Value("${jwt.algorithm.key}")
    private String algorithmKey;

    @Value("${jwt.issuer}")
    private String issuer;

    @Value("${jwt.expiryInSeconds}")
    private long expiryInSeconds;

    private SecretKey Key;

//    private SignatureAlgorithm algorithm;
//    private static final String EMAIL_KEY = "EMAIL";
//
//    @PostConstruct
//    public void postConstruct() {
//        algorithm = SignatureAlgorithm.HS256;
//    }
//
//    private Key key() {
//        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(algorithmKey));
//    }

    @PostConstruct
    public void init() {
        byte[] keyBytes = Base64.getDecoder().decode(algorithmKey.getBytes(StandardCharsets.UTF_8));
        this.Key = Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateJWT(UserDetails user) {
        return Jwts.builder()
                .setSubject(user.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+(expiryInSeconds*1000)))
                .signWith(Key,SignatureAlgorithm.HS256)
                .compact();

    }


    private <T> T extractClaims(String token, Function<Claims,T>claimsTFunction){
        return claimsTFunction.apply(Jwts.parserBuilder().setSigningKey(Key).build().parseClaimsJws(token).getBody());

    }
    public String getUsername(String token) {
        return extractClaims(token,Claims::getSubject);

    }

    public boolean isTokenValid(String token, UserDetails user){
        final String username=getUsername(token);
        return (username.equals(user.getUsername())&&!isTokenExpired(token));
    }

    public boolean isTokenExpired(String token){
        return extractClaims(token,Claims::getExpiration).before(new Date());
    }
}
