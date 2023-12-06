<h1 align="center">
  BookByte Web App 💵📚
</h1>

Kelompok 10 Member List :
| No | Nama | NIM | Role |
| --- | --- | --- | --- |
| 1. | [Muhammad Al Ghifari Fausta](https://github.com/mastamaru) | 21/477892/TK/52646 | Project leader + Fullstack Developer | 
| 2. | [Laily Medha Nur Ihsanti](https://github.com/lilypon246) | 21/474650/TK/52363 | UI/UX Designer + Frontend Developer |
| 3. | [Muhammad Ismail Azmi](https://github.com/mailbau) | 21/473264/TK/52149 | Fullstack Developer |
| 4. | [Rhafif Prasetyo](https://github.com/rhafif-p) | 21/477018/TK/52532| Fullstack Developer |
| 5. | [Thoriqutsani Anastyo Rasnan](https://github.com/goodguythor) | 21/479154/TK/52816 | Fullstack Developer|

# Deskripsi Aplikasi
Aplikasi kasir berbasis web yang terintegrasi dengan MongoDB sebagai database. Aplikasi ini ditujukan untuk bisnis toko buku. Dengan memanfaatkan role di toko buku, yakni admin dan kasir aplikasi ini dapat memudahkan urusan manajemen buku dan pemantauan transaksi.

# Tech Stack
- Node.js
- Next.js
- Express.js
- Figma
- Vercel
- Tailwind CSS
- MongoDB
  
# Links
- Frontend Deploy    : https://bookbyte-kelompok10.vercel.app/
- Backend Deploy     : https://book-bytes-kelompok10.vercel.app
- YouTube Video      : https://youtu.be/kIXGy3HsiqM
- Presentation Slide : https://www.canva.com/design/DAFzrJhHuqc/B2jAcayqfcP6EovGCt3DiA/edit?utm_content=DAFzrJhHuqc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

# How to run this project ⁉️
first, u need to clone this repo. use the command below
  `````
  git clone https://github.com/mastamaru/BookBytes-Kelompok10
  `````
## Frontend
1. Go to frontend directory
````
cd frontend
````
2. Install the NPM package

````
npm install
````
3. Run the App

````
npm run dev
````
4. If u not redirected to the landing page, u can open this link with your browser

````
http://localhost:3000/
````
## Backend
1. Go to backend directory
````
cd backend
````
2. Install the NPM package
````
npm install
````
3. Run the App
````
npm start
````
4. This app will running on port 8000. Use the postman app for testing the API, endpoint are provided below.
````
http://localhost:8000/{use the endpoint here}
````
# 📝List of Feature and How to Access with The Endpoint
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
