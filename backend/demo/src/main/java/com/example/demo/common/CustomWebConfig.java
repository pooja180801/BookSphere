package com.example.demo.common;


import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.data.web.PageableHandlerMethodArgumentResolverSupport;
import org.springframework.data.web.SortHandlerMethodArgumentResolver;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
public class CustomWebConfig implements WebMvcConfigurer {

    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {

        SortHandlerMethodArgumentResolver sortResolver = new SortHandlerMethodArgumentResolver();
        sortResolver.setSortParameter("order_by");  // to rename the sort parameter


        PageableHandlerMethodArgumentResolver pageResolver=new PageableHandlerMethodArgumentResolver();
        pageResolver.setPageParameterName("page_name");
        pageResolver.setSizeParameterName("page_size");
        pageResolver.setOneIndexedParameters(true); //to set the starting index at 1


        Pageable defaultPagable= PageRequest.of(0, 5);
        pageResolver.setFallbackPageable(defaultPagable);

        resolvers.add(pageResolver);
        resolvers.add(sortResolver);
    }
}
