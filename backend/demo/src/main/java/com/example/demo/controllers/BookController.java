package com.example.demo.controllers;

import com.example.demo.common.APIresponse;
import com.example.demo.dto.BookDto;
import com.example.demo.entity.Book;
import com.example.demo.services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @PostMapping("/addBook/{gid}")
    public ResponseEntity<APIresponse> addBook(@RequestBody Book book, @PathVariable int gid) {

        return bookService.addBooks(book,gid) ;

    }

    @GetMapping("/viewAll")
    public ResponseEntity<APIresponse> viewAll() { //to view books by genre and not mandotary to pass genre thats why false
        return   bookService.viewAllBooks();
    }
    @GetMapping("/viewById/{bid}")
    public Book viewById(@PathVariable("bid") int bid){
        return bookService.viewById(bid);
    }

    @PutMapping("/update")
    public Book updateBook(@RequestBody Book book){
        return bookService.updateBook(book);
    }

    @DeleteMapping("/delete/{bid}")
    public String deleteById(@PathVariable("bid") int bid){
        return bookService.deleteBook(bid);
    }



    @GetMapping("/filter")
    public ResponseEntity<APIresponse> filterBooksByGenre() {
        return bookService.filterByGenre();
    }

    @GetMapping("/search/{searchKey}")
    public ResponseEntity<APIresponse> searchBook(@PathVariable("searchKey") String bookname){
        System.out.println(bookname);
        return bookService.searchProductsByBookName(bookname);

    }

    @GetMapping("/bookpriceAsnc")
    public List<Book> findBooksByGenreOrderedByPrice(@RequestParam(value = "bookgenre") String genre){
        return bookService.findBooksByNameOrderedByPrice(genre);
    }

    @GetMapping("/paging")
    public ResponseEntity<APIresponse> pagination(@SortDefault(sort = "bookid",direction = Sort.Direction.DESC) Pageable pageable) {
        return bookService.pagination(pageable);
    }

}
