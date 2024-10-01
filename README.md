# IP-RMT52
> Tuliskan API Docs kamu di sini

# Events API Documentation
## Endpoints

List of Available Endpoints:
1. GET /pub/events
2. GET /pub/events/:id
3. POST /login
4. POST /login/google
5. POST /new-user
6. POST /pub/events/:id/generate-description

Endpoint di bawah ini memerlukan authentication:

7. GET /events
8. GET /events/:id
9. GET /categories
10. GET /categories/:id
11. PATCH /events/:id/buy
12. POST /events/:id/generate-description

Endpoint di bawah ini memerlukan authorization:
Hanya Admin yang bisa mengakses

13. POST /events
14. PUT /events/:id
15. DELETE /events/:id
16. POST /categories
17. PUT /categories/:id
18. DELETE /categories/:id
19. PATCH /events/imgUrl

=======================================================================================

1. GET /pub/events
Deskripsi:
Mendapatkan daftar event publik dengan stok tiket tersedia.

Response:
Success (200 - OK):
```json
{
  "data": [
    {
      "id": "number",
      "eventName": "string",
      "venue": "string",
      "price": "number",
      "stock": "number"
    }
  ]
}
```
Error (500 - Internal Server Error):
```json
{
  "message": "Internal Server Error"
}
```

2. GET /pub/events/:id
Deskripsi:
Mendapatkan detail dari satu event berdasarkan ID.

Request:
Params:

id: ID event.
Response:
Success (200 - OK):
```json
{
  "event": {
    "id": "number",
    "eventName": "string",
    "venue": "string",
    "price": "number",
    "stock": "number",
    "category": {
      "id": "number",
      "name": "string"
    }
  }
}
```
Error (404 - Not Found):
```json
{
  "message": "Event id:<id> not found"
}
```

3. POST /login
Deskripsi:
Login pengguna dan memberikan akses token.

Request:
Body:
```json
{
  "email": "string",
  "password": "string"
}
```
Response:
Success (200 - OK):
```json
{
  "access_token": "string"
}
```
Error (400 - Bad Request):
```json
{
  "message": "Email is required"
}

```
```json
{
  "message": "Password is required"
}
```
Error (401 - Unauthorized):
```json
{
  "message": "Invalid email/password"
}
```

4. POST /login/google
Deskripsi:
Login menggunakan Google dan memberikan akses token.

Request:
Body:
```json
{
  "googleToken": "string"
}
```
Response:
Success (200 - OK):
```json
{
  "access_token": "string"
}
```
Error (401 - Unauthorized):
```json
{
  "message": "Invalid Google token"
}
```

5. POST /new-user
Deskripsi:
Mendaftarkan pengguna baru.

Request:
Body:
```json
{
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string",
  "role": "string"
}
```
Response:
Success (201 - Created):
```json
{
  "id": "number",
  "email": "string",
  "role": "string",
  "createdAt": "string",
  "updatedAt": "string"
}
```
Error (500 - Internal Server Error):
```json
{
  "message": "Internal Server Error"
}
```

6. POST /pub/events/generate-description
Deskripsi:
Menghasilkan deskripsi event berdasarkan nama event menggunakan AI.

Request:
Params:

id: ID event.
Response:
Success (200 - OK):
```json
{
  "eventName": "string",
  "description": "string"
}
```
Error (404 - Not Found):
```json
{
  "message": "Event id:<id> not found"
}
```

7. GET /events
Deskripsi:
Mendapatkan daftar event lengkap (termasuk yang stoknya habis).

Response:
Success (200 - OK):
```json
{
  "data": [
    // array of event objects
  ]
}
```
Error (500 - Internal Server Error):
```json
{
  "message": "Internal Server Error"
}
```

8. GET /events/:id
Deskripsi:
Mendapatkan detail event berdasarkan ID.

Response:
Success (200 - OK):
```json
{
  "id": "number",
  "eventName": "string",
  "venue": "string",
  "imgUrl": "string",
  "price": "number",
  "stock": "number",
  "category": {
    "id": "number",
    "name": "string"
  }
}
```
Error (404 - Not Found):
```json
{
  "message": "Event id:<id> not found"
}
```

9. GET /categories
Deskripsi: Mendapatkan daftar kategori yang ada.
Response (200 - OK):
```json
{
  "categories": [
    {
      "id": "number",
      "name": "string"
    }
  ]
}
```

10. GET /categories/
Deskripsi: Mendapatkan detail kategori berdasarkan ID.
Params:
id: ID dari kategori yang ingin diambil.
Response (200 - OK):
```json
{
  "category": {
    "id": "number",
    "name": "string"
  }
}
```

11. PATCH /events/:id/buy
Deskripsi: Membeli tiket event. Mengurangi stok tiket event.
Params:
id: ID event yang ingin dibeli tiketnya.
Response (200 - OK):
```json
{
  "message": "Ticket purchased successfully",
  "eventId": "number",
  "remainingStock": "number"
}
```

12. POST /events/:id/generate-description
Deskripsi: Menghasilkan deskripsi event menggunakan AI (untuk pengguna terautentikasi).
Params:
id: ID dari event yang akan diambil deskripsinya.
Response (200 - OK):
```json
{
  "eventName": "string",
  "description": "string"
}
```

13. POST /events (Requires Authorization)
Deskripsi: Menambahkan event baru. Hanya bisa diakses oleh admin.
Request Body
```json
{
  "eventName": "string",
  "venue": "string",
  "imgUrl": "string",
  "price": "number",
  "categoryId": "number",
  "userId": "number",
  "stock": "number"
}
```
Response (201 - Created):
```json
{
  "id": "number",
  "eventName": "string",
  "venue": "string",
  "imgUrl": "string",
  "price": "number",
  "categoryId": "number",
  "userId": "number",
  "stock": "number"
}
```

14. PUT /events/:id
(Requires Authorization)
Deskripsi: Mengupdate detail event. Hanya bisa diakses oleh admin.
Params:
id: ID event yang akan diupdate.
Request Body:
```json
{
  "eventName": "string",
  "venue": "string",
  "imgUrl": "string",
  "price": "number",
  "categoryId": "number",
  "userId": "number",
  "stock": "number"
}
```
Response (200 - OK):
```json
{
  "message": "Event updated successfully",
  "event": {
    "id": "number",
    "eventName": "string",
    "venue": "string",
    "imgUrl": "string",
    "price": "number",
    "categoryId": "number",
    "userId": "number",
    "stock": "number"
  }
}
```

15. DELETE /events/:id
(Requires Authorization)
Deskripsi: Menghapus event berdasarkan ID. Hanya bisa diakses oleh admin.
Params:
id: ID event yang akan dihapus.
Response (200 - OK):
```json
{
  "message": "Event deleted successfully"
}
```

16. POST /categories (Requires Authorization)
Deskripsi: Menambahkan kategori baru. Hanya bisa diakses oleh admin.
Request Body:
```json
{
  "name": "string"
}
```
Response (201 - Created):
```json
{
  "id": "number",
  "name": "string"
}
```

17. PUT /categories/:id
(Requires Authorization)
Deskripsi: Mengupdate kategori berdasarkan ID. Hanya bisa diakses oleh admin.
Params:
id: ID kategori yang akan diupdate.
Request Body:
```json
{
  "name": "string"
}
```
Response (200 - OK):
```json
{
  "message": "Category updated successfully",
  "category": {
    "id": "number",
    "name": "string"
  }
}
```

18. DELETE /categories/:id
(Requires Authorization)
Deskripsi: Menghapus kategori berdasarkan ID. Hanya bisa diakses oleh admin.
Params:
id: ID kategori yang akan dihapus.
Response (200 - OK):
```json
{
  "message": "Category deleted successfully"
}
```

19. PATCH /events/imgUrl
Deskripsi:
Mengupdate gambar utama (cover) dari sebuah event berdasarkan ID menggunakan Cloudinary. Endpoint ini memerlukan autentikasi dan otorisasi (hanya dapat diakses oleh admin).

Request:
Headers:

Authorization: Bearer <access_token> (diperlukan)
Params:

id: ID dari event yang ingin diupdate gambar utamanya.
Body:

imgUrl: File gambar baru (menggunakan multipart/form-data untuk upload file).
Response:
Success (200 - OK):
```json
{
  "message": "Image url has been updated"
}
```
Error (404 - Not Found):
```json
{
  "message": "Event id:<id> not found"
}
```
Error (500 - Internal Server Error):
```json
{
  "message": "Internal Server Error"
}
```
