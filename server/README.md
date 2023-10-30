<h1 align="center">
  Proyek PAW Book Store Cashier-App -- Backend
</h1><br>
Sebuah repository untuk Book Store Cashier-App berbasis Website Application yang dibuat oleh kelompok 10 untuk proyek mata kuliah Pengembangan Aplikasi Web. Kelompok ini beranggotakan : <br>
1. Laily Medha Nur Ihsanti <br>
2. Muhammad Al Ghifari Fausta <br>
3. Muhammad Ismail Azmi <br>
4. Rhafif Prasetyo <br>
5. Thoriqutsani Anastyo Rasnan <br>

## ⁉ How to use?
1. Clone the repo<br>
   use this command : <br>
   ``````````
   git clone https://github.com/lilypon246/proyekpaw-backend
   ``````````
2. Install NPM Package
   command :
   ````
   npm install
   ````
3. Run the application with
   command :
   ````
   npm start
   ````

## 📝List of Feature and How to Access with The Endpoint
1. Input a New Book to Catalog <br>
   menambahkan buku ke daftar katalog<br>
   Endpoint : <br>
   ``````
   POST /books
   ``````
   <br>
3. Find All the Available Book <br>
   mencari daftar buku yang tersedia pada katalog buku. Disini tersedia opsi untuk melakukan sorting berdasarkan genre, mencari buku berdasarkan id buku, mencari buku berdasarkan judul, melakukan filter buku berdasarkan genre. <br>
   Endpoint : <br>
   ``````````
   GET /books
   ``````````
   Endpoint for Finding Book by ID :<br>
   ``````````
   GET /books/:bookID
   ``````````
   Endpoint for Finding Book by Title :<br>
   ``````````
   GET /books/search then specify the title (format as json) { "title": "book title"}
   ``````````
   Endpoint for Sort by Genre :<br>
   ``````````
   GET /books/sort/genre
   ``````````
   Endpoint for Filter by Genre :<br>
   ``````````
   GET /books/genre/:genre
   ``````````
5. Update the Book Data based on bookID<br>
   Melakukan perubahan (update) terhadap data buku sesuai id yang ingin diubah.<br>
   Endpoint :<br>
   ``````````
   PUT /books/:bookID
   ``````````
6. Delete the Book Data based on bookID<br>
   Menghapus buku dari katalog sesuai id yang diinginkan.<br>
   Endpoint :<br>
   ``````````
   DELETE /books/:bookID
   ``````````
8. Input a New Transaction <br>
   Kasir dapat menambahkan transaksi baru dengan menginputkan buku dan jumlah buku yang dibeli oleh customer. <br>
   Endpoint :
   ``````````
   POST /transactions
   ``````````
9. Find All the Available Transaction from Record <br>
   Mendapatkan seluruh data transaksi yang telah terekam sebelumnya <br>
   Endpoint :<br>
   ``````````
   GET /transactions
   ``````````
10. Update the Transaction based on Transaction ID (Soon will be update the feature logic to avoid transaction manipulation)
    Melakukan update transaksi berdasarkan id transaksi, mengubah buku yang dibeli dan jumlahnya.<br>
    Endpoint :
    ``````````
    PUT /transactions/:transactionID
    ``````````
12. Delete the Transaction from Record based on Transaction ID
    Menghapus transaksi dari record berdasarkan id transaksi.<br>
    Endpoint :<br>
    ``````````
    DELETE /transactions/:transactionID
    ``````````
