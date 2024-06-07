package com.example.demo.services;

import com.example.demo.common.APIresponse;
import com.example.demo.dto.BookDto;
import com.example.demo.entity.Book;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Set;

public interface BookService {

    ResponseEntity<APIresponse> viewAllBooks();

    public ResponseEntity<APIresponse> addBooks(Book book,int gid);

    public Book viewById(int bid);

    Book updateBook(Book book);

    String deleteBook(int bid);

    public ResponseEntity<APIresponse>searchProductsByBookName(String bookName);

    ResponseEntity<APIresponse> filterByGenre();

    List<Book> findBooksByNameOrderedByPrice(String genre);

    Book toEntity(BookDto bookDto);

    BookDto toDto(Book book);

    ResponseEntity<APIresponse> pagination(Pageable pageable);
}
