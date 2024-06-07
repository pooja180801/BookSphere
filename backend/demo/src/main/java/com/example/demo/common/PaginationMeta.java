package com.example.demo.common;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

@Component
public class PaginationMeta {

    private long totalElements;
    private Integer pageSize;
    private Integer noOfPages;
    private boolean isFirst;
    private boolean isLast;

    public long getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(long totalElements) {
        this.totalElements = totalElements;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Integer getNoOfPages() {
        return noOfPages;
    }

    public void setNoOfPages(Integer noOfPages) {
        this.noOfPages = noOfPages;
    }

    public boolean getIsFirst() {
        return isFirst;
    }

    public void setFirst(boolean first) {
        isFirst = first;
    }

    public boolean getIsLast() {
        return isLast;
    }

    public void setLast(boolean last) {
        isLast = last;
    }

    public <T> PaginationMeta toPaginationMeta(Page<T> page){
        PaginationMeta paginationMeta=new PaginationMeta();

        paginationMeta.setFirst(page.isFirst());
        paginationMeta.setLast(page.isLast());
        paginationMeta.setTotalElements(page.getTotalElements());
        paginationMeta.setPageSize(page.getSize());
        paginationMeta.setNoOfPages(page.getTotalPages());

        return paginationMeta;
    }
}
