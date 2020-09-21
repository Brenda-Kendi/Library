//Book Class: Represents a Book
class Book{
    constructor(title,author,pages){
        this.title=title;
        this.author=author;
        this.pages=pages;
    }
}

//UI Class: Handle UI Tasks
 class UI{
     static displayBooks(){
       
         const books = Store.getBooks();
         books.forEach((book)=> UI.addBookToList(book));
     }
     static addBookToList(book){
         const list= document.querySelector('#book-list');

         const row= document.createElement('tr');

         row.innerHTML=`
         <td>${book.title}</td>
         <td>${book.author}</td>
         <td>${book.pages}</td>
         <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
         `;
         list.appendChild(row);
     }
     static deleteBook(el) {
         if(el.classList.contains('delete')) {
             el.parentElement.parentElement.remove();
         }
     }
     //static showAlert(message, className){
      //   const div=document.createElement('div');
       //  div.class=`alert alert-${className}`;
        // div.appendChild(document.createTextNode(message));
    // }
     static clearFields(){
         document.querySelector('#title').value='';
         document.querySelector('#author').value='';
         document.querySelector('#no-of-pages').value='';

     }
 }

//Store Class: Handles Storage
class Store{
    static getBooks(){
        let books;
        if (localStorage.getItem('books')===null) {
            books=[];
        } else{
            books=JSON.parse(localStorage.getItem('books'));
        }
        return books; 
    }
    static addBook(book){
        const books= Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));

    }
    static removeBook(pages){
        const books= Store.getBooks();

        books.forEach((book, index)=>{
            if(book.pages===pages){
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));

    }

}

//Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event: Add a Book
document.querySelector('#book-form').addEventListener('submit',(e)=> {
    //Prevent actual submit
    e.preventDefault();

    //Get form values
    const title=document.querySelector('#title').value;
    const author=document.querySelector('#author').value;
    const pages=document.querySelector('#no-of-pages').value;

    //Validate
    if(title==='' || author==='' || pages===''){
        alert('Please fill in all the fields');
    } else{
        //Instantiate book
        const book = new Book(title, author, pages);

        //Add book to UI
        UI.addBookToList(book);

        //Add book to store
        Store.addBook(book);
    
        //Clear fields
        UI.clearFields();
    }
});

//Event: Remove a Book
document.querySelector('#book-list').addEventListener('click',(e)=> {
    UI.deleteBook(e.target)
});