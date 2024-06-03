package com.example.demo.data;

import com.example.demo.common.PaginationMeta;
import com.example.demo.entity.Book;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class BookPagination {

    private List<Book> books=new ArrayList<>();
    private PaginationMeta paginationMeta;

    public List<Book> getBooks() {
        return books;
    }

    public void setBooks(List<Book> books) {
        this.books = books;
    }

    public PaginationMeta getPaginationMeta() {
        return paginationMeta;
    }

    public void setPaginationMeta(PaginationMeta paginationMeta) {
        this.paginationMeta = paginationMeta;
    }




}
