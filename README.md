Project Microservices ini dirancang sebagai service yang akan diintegrasikan ke dalam aplikasi PresensiV2, yang merupakan versi terbaru dari aplikasi Presensi SPJT. Dalam pembaruan ini, kami menambahkan fitur penting yang memungkinkan presensi dilakukan berdasarkan lokasi yang telah ditetapkan oleh admin. Dengan implementasi Microservices ini, setiap komponen dari fitur presensi akan beroperasi secara mandiri namun tetap terkoordinasi, sehingga memperkuat fleksibilitas dan skalabilitas aplikasi dalam menangani kebutuhan presensi berbasis lokasi yang lebih kompleks.

Sebelum menjalankan aplikasi alangkah lebih baiknya melakukan instalasi dependensi dengan perintah berikut: 

~ npm install

Setelah melakukan instalasi dependensi, jangan lupa untuk membuat file .env dengan format berikut: 

PORT=

DB_DATABASE=database_name

DB_USERNAME=database_username

DB_PASSWORD=database_password

DB_HOST=localhost

Jalankan server dan silahkan dicoba menggunakan API berikut: 

https://documenter.getpostman.com/view/25757044/2sAXqs6Msd
