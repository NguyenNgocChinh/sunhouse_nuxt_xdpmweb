# Hướng dẫn cài đặt
1. Chạy `npm install` để cài đặt các package cần thiết
2. Chạy `npm run dev` để start dự án ở port `localhost:3000`
# User
* username: admin | password: password
* username: user  | password: password 
# Đường dẫn (URL)
* Tìm kiếm: `http://localhost:3000/timkiem`
* Đăng nhập: `http://localhost:3000/login`
# Asset
* Component : `/components`
* Các views : `/pages`
* Eviroment : `/.env`
* Config Nuxt: `/nuxt.config.js` 
## Component Tìm kiếm: 
`/components/DSBaiDang`
## Component Login: 
`/pages/Login/index.vue`

# API:
* Tìm kiếm:
    * Default: `http://127.0.0.1:8000/api/timkiem`
    * Giá: `http://127.0.0.1:8000/api/timkiem?gia1=4000&gia2=5000`
    * Diện tích: `http://127.0.0.1:8000/api/timkiem?dientich1=500&dientich2=2000`
    * Loại: `http://127.0.0.1:8000/api/timkiem?type=thue`
    * Số phòng ngủ: `http://127.0.0.1:8000/api/timkiem?sophongngu=3`
    * Số phòng tắm: `http://127.0.0.1:8000/api/timkiem?sophongtam=3`
    * ...
