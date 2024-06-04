<h1 align="center">
  BookByte Web App (Extended) 💵📚
</h1>

IAI Kelompok Besar 2:
| No | Nama Kelompok Kecil | Anggota Tim Kecil | Jobdesc |
| --- | --- | --- | --- |
| 1. | Kelompok 5 | <li> Nafisa Ramadhania <li> Laily Medha Nur Ihsanti <li> Muhammad Hasnan Regard | Fungsi Stock Management (Inventory) | 
| 2. | Kelompok 6 | <li> Salwa Maharani <li> Siti Hashifah Qatrunnada <li> Dhiyaa Amalia Putri | Fungsi Transaction (Cashier)  |
| 3. | Kelompok 7 | <li> Salma Asma Nadia <li> Annisa Uswa Sufia <li> Qornain Aji | - |
| 4. | Kelompok 8 | <li> Anisa Bintang Maharani <li> Muhammad Azka Adhisetama <li> Adhitya Bayu Pangestu | - |
| 5. | Kelompok 9 | <li> Thoriqutsani Anastyo Rasnan <li> Stephanus Edward Parulian | - |

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
- Frontend Deploy    : -
- Backend Deploy     : -
- Presentation Slide : https://www.canva.com/design/DAGHHpJzI7U/InhkjkN1vLuExUKH_QmM8Q/view?utm_content=DAGHHpJzI7U&utm_campaign=designshare&utm_medium=link&utm_source=editor

# How to run this project ⁉️
first, u need to clone this repo. use the command below
  `````
  git clone https://github.com/mastamaru/BookBytes-Kelompok10
  `````
## Account Login
`````
Admin
username : john_doe
password : password123
Kasir
username : login
password : logindummy
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
