package com.example.demo.security.jwt;

import com.example.demo.repo.UserRepository;
import com.example.demo.security.ApplicationConfig;
import com.example.demo.security.SecurityConfig;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

//as we want to execute this for our evert requests
@Component
@RequiredArgsConstructor //to create constrictor for final variables
public class JWTRequestFilter extends OncePerRequestFilter {

    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ApplicationConfig applicationConfig;


    //request-contains all the info about the client req such as header,parameter
    //response-contains response that will be sent back to the client
    //filter chain-invoke the next filter in the chain
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,@NonNull HttpServletResponse response,@NonNull FilterChain filterChain) throws ServletException, IOException {

        String tokenHeader = request.getHeader("Authorization");
        System.out.println("Authorization header: " + tokenHeader);

        final String userEmail;
        final String jwtToken;
        if (tokenHeader == null || !tokenHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);

            return;

        }

        jwtToken=tokenHeader.substring(7);
        userEmail=jwtUtils.getUsername(jwtToken);



        if(userEmail!=null &&
                SecurityContextHolder.getContext().getAuthentication()==null ){  //to check whether the user is already authenticated
            UserDetails userDetails= applicationConfig.userDetailsService().loadUserByUsername(userEmail);

            if(jwtUtils.isTokenValid(jwtToken,userDetails)){
                SecurityContext securityContext=SecurityContextHolder.createEmptyContext();
                UsernamePasswordAuthenticationToken token=new UsernamePasswordAuthenticationToken(
                        userDetails,null,userDetails.getAuthorities()
                );
                token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                securityContext.setAuthentication(token);
                SecurityContextHolder.setContext(securityContext);

            }
        }
        filterChain.doFilter(request,response);
    }
}