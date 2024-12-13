import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '/public/css/tintuc.css';

export default function Tintuc() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [trendingNews, setTrendingNews] = useState([]);
  const [visibleNews, setVisibleNews] = useState(6);

  // Thêm useEffect để theo dõi scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Thêm tin tức xu hướng (top 3 tin có lượt xem cao nhất)
  useEffect(() => {
    const trendingArticles = [
      {
        title: "Australia cấm trẻ dưới 16 tuổi sử dụng mạng xã hội",
        description: "Australia thông qua luật được đánh giá nghiêm ngặt nhất thế giới về mạng xã hội, trong đó cấm hoàn toàn trẻ dưới 16 tuổi sử dụng TikTok, Facebook...",
        image: "https://i1-sohoa.vnecdn.net/2024/11/28/R6UJUNCF6JJWJOJI2ZPJCTXMQY-1403-1732808151.jpg",
        link: "https://vnexpress.net/australia-cam-tre-duoi-16-tuoi-su-dung-mang-xa-hoi-4821668.html",
        pubDate: new Date("2024-03-21T10:00:00"),
        category: 'tech',
        views: 1500,
        comments: 45
      },
      {
        title: "Số phận những trào lưu thiết kế điện thoại 'điên rồ'",
        description: "Điện thoại màn hình cong tràn hai cạnh, camera thò thụt... không còn xuất hiện và nhường chỗ cho thiết kế dạng thanh đơn thuần.",
        image: "https://i1-sohoa.vnecdn.net/2024/12/02/a1-1526-1733113986.jpg",
        link: "https://vnexpress.net/so-phan-nhung-trao-luu-thiet-ke-dien-thoai-dien-ro-4822009.html",
        pubDate: new Date("2024-03-21T09:30:00"),
        category: 'mobile',
        views: 1200,
        comments: 32
      },
      {
        title: "Yaber đoạt giải máy chiếu thông minh được yêu thích nhất",
        description: "Máy chiếu Yaber K3/K3 Pro nhận được nhiều lượt bình chọn nhất trong số cuối cùng của chương trình Sản phẩm tôi yêu 2024",
        image: "https://i1-sohoa.vnecdn.net/2024/12/02/Yaber-K3-Projector-8761-1733111545.jpg",
        link: "https://vnexpress.net/yaber-doat-giai-may-chieu-thong-minh-duoc-yeu-thich-nhat-4822725.html",
        pubDate: new Date("2024-03-21T09:00:00"),
        category: 'tech',
        views: 1000,
        comments: 25
      }
    ];
    
    setTrendingNews(trendingArticles);
  }, []);

  const categories = [
    { id: 'all', name: 'Tất cả', icon: 'bi-grid-fill' },
    { id: 'tech', name: 'Công nghệ', icon: 'bi-cpu-fill' },
    { id: 'mobile', name: 'Điện thoại', icon: 'bi-phone-fill' },
    { id: 'laptop', name: 'Laptop', icon: 'bi-laptop-fill' },
    { id: 'gaming', name: 'Game', icon: 'bi-controller' },
    { id: 'accessories', name: 'Thiết bị', icon: 'bi-headphones' }
  ];

  const news = [
    {
      title: "Nvidia bắt đầu tuyển dụng kỹ sư ở Việt Nam",
      description: "Nvidia đăng tin tuyển dụng kỹ sư, quản lý cấp cao ở Hà Nội, liên quan đến sản xuất, phát triển sản phẩm GPU.",
      image: "https://i1-sohoa.vnecdn.net/2024/12/09/a1-9279-1733734479.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=wmqlI8L8ka2p6amlonYdZA",
      link: "https://vnexpress.net/nvidia-bat-dau-tuyen-dung-ky-su-o-viet-nam-4825643.html",
      pubDate: new Date("2024-03-21T10:00:00"),
      category: 'tech',
      views: 1500,
      comments: 45
    },
    {
      title: "Galaxy S25 có thể tăng giá",
      description: "Samsung dự kiến phải tăng giá các mẫu smartphone năm 2025, như Galaxy S25, trong khi Apple vẫn duy trì mức khởi điểm ổn định.",
      image: "https://i1-sohoa.vnecdn.net/2024/12/02/dsc8163-1675229703-jpeg-168719-7723-3172-1733155783.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=l2z0VLtffzjFtlY3Mzhtrw",
      link: "https://vnexpress.net/galaxy-s25-co-the-tang-gia-4823028.html",
      pubDate: new Date("2024-03-21T09:30:00"),
      category: 'mobile',
      views: 1200,
      comments: 32
    },
    {
      title: "Digiworld hợp tác MSI phân phối laptop tại Việt Nam",
      description: "Hợp tác đánh dấu bước phát triển mới của hai bên cùng kỳ vọng mang tới thay đổi tích cực cho thị trường công nghệ Việt nói chung và thị trường laptop nói riêng.",
      image: "https://i1-kinhdoanh.vnecdn.net/2024/12/07/Picture1-1801-1733547211.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=l_rIpL9BR1ZKGgs9vaROcA",
      link: "https://vnexpress.net/digiworld-hop-tac-msi-phan-phoi-laptop-tai-viet-nam-4825031.html",
      pubDate: new Date("2024-03-21T09:00:00"),
      category: 'laptop',
      views: 1300,
      comments: 45
    },
    {
      title: "Nữ game thủ U70",
      description: "Trong giới game thủ Liên Minh Huyền Thoại, cái tên Thưng Lạc bà bà rất nổi tiếng nhưng ít người biết rằng chủ tài khoản đó là bà Trương Phụng Cầm, 69 tuổi.",
      image: "https://i1-giadinh.vnecdn.net/2024/11/08/2-2794-1731024774.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=4kLN3ODA5c4okMXGRD_UxQ",
      link: "https://vnexpress.net/nu-game-thu-u70-4812990.html",
      pubDate: new Date("2024-03-20T16:45:00"),
      category: 'gaming',
      views: 1400,
      comments: 55
    },
    {
      title: "Thiết bị phát hiện động đất đầu tiên trên thế giới",
      description: "Địa động nghi - thiết bị phát hiện động đất đầu tiên trên thế giới ra đời hơn 1.800 năm trước nhưng đến nay cơ chế hoạt động chính xác của nó vẫn là điều bí ẩn với các nhà nghiên cứu.",
      image: "https://i1-vnexpress.vnecdn.net/2024/11/26/VNE-Sei-8433-1732615132.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=Rls4rJRkR02kBKkp5bIgOg",
      link: "https://vnexpress.net/thiet-bi-phat-hien-dong-dat-dau-tien-tren-the-gioi-4820312.html",
      pubDate: new Date("2024-03-20T16:00:00"),
      category: 'accessories',
      views: 1050,
      comments: 42
    },
    {
      title: "Hành trình Jensen Huang 'thâu tóm thế giới AI'",
      description: "Từ startup chip đồ họa với ba người vào những năm 1990, Nvidia của Jensen Huang dần lớn mạnh và dẫn đầu thế giới về bộ xử lý AI.",
      image: "https://i1-sohoa.vnecdn.net/2024/12/09/Jensen-Huang-CEO-Nvidia-Comput-1757-9144-1733715339.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=VWSsNIQJoXqiE2cEy94n0Q",
      link: "https://vnexpress.net/hanh-trinh-jensen-huang-thau-tom-the-gioi-ai-4825468.html",
      pubDate: new Date("2024-03-20T15:30:00"),
      category: 'tech',
      views: 1200,
      comments: 38
    },
    {
      title: "iPhone 17 Pro có thể được nâng cấp mạnh về màn hình",
      description: "iPhone 17 Pro được cho là sẽ trang bị công nghệ hiển thị mới, giúp cải thiện thời lượng sử dụng và độ bền màn hình.",
      image: "https://i1-sohoa.vnecdn.net/2024/12/04/iPhone-17-Generic-Feature-8773-1733327568.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=H68lvvC06KjeJLq47JhJKA",
      link: "https://vnexpress.net/iphone-17-pro-co-the-duoc-nang-cap-manh-ve-man-hinh-4823957.html",
      pubDate: new Date("2024-03-20T15:00:00"),
      category: 'mobile',
      views: 1100,
      comments: 40
    },
    {
      title: "Laptop gaming có màn hình 240 Hz",
      description: "Lenovo Legion Pro 5i Gen8 được trang bị màn hình 240 Hz, chip xử lý Intel thế hệ 13 ti ưu cho chơi game, cùng thiết kế cải tiến.",
      image: "https://i1-sohoa.vnecdn.net/2023/09/28/Lenovo-Legion-Pro5i-Gen8VnExpress-08900-1695844563.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=fMWYrwuOecbPXFgn2RPNUg",
      link: "https://vnexpress.net/laptop-gaming-co-man-hinh-240-hz-4657358.html",
      pubDate: new Date("2024-03-20T14:30:00"),
      category: 'laptop',
      views: 890,
      comments: 28
    },
    {
      title: "Tìm kiếm qua ChatGPT tăng, Google giảm",
      description: "Tỷ lệ người dùng ChatGPT để tìm kiếm trên mạng đang tăng lên, trong khi số người sử dụng Google Search suy giảm dù chưa đáng kể.",
      image: "https://i1-sohoa.vnecdn.net/2024/12/08/chatgpt-5-4914-1733634196.png?w=1020&h=0&q=100&dpr=1&fit=crop&s=APWu0tUGmpUbSkfg7-qR-w",
      link: "https://vnexpress.net/tim-kiem-qua-chatgpt-tang-google-giam-4825281.html",
      pubDate: new Date("2024-03-19T14:15:00"),
      category: 'tech',
      views: 950,
      comments: 30
    },
    {
      title: "Người dùng ChatGPT hàng tuần đạt 300 triệu",
      description: "CEO OpenAI Sam Altman cho biết ChatGPT hiện thu hút hơn 300 triệu người dùng hàng tuần, tăng từ 200 triệu cuối tháng 8.",
      image: "https://i1-sohoa.vnecdn.net/2024/12/05/33zd88h-highres-1699931805-450-8227-9172-1733365618.png?w=1020&h=0&q=100&dpr=1&fit=crop&s=QhJDfkVRarHIiRsW1q_z6w",
      link: "https://vnexpress.net/nguoi-dung-chatgpt-hang-tuan-dat-300-trieu-4824026.html",
      pubDate: new Date("2024-03-18T11:20:00"),
      category: 'tech',
      views: 850,
      comments: 25
    },
    {
      title: "Yann Lecun: Lợi thế của Việt Nam là không sợ công nghệ mới",
      description: "Giám đốc khoa học AI của Meta Yann Lecun cho rằng người Việt có thái độ tích cực với AI, khác tâm lý lo sợ ở nhiều thị trường khác.",
      image: "https://i1-sohoa.vnecdn.net/2024/12/05/26209e83-d388-4c29-ad0e-5e8545-6296-7322-1733339563.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=gfypDDzv6k0IHBv9D44zOw",
      link: "https://vnexpress.net/yann-lecun-loi-the-cua-viet-nam-la-khong-so-cong-nghe-moi-4823971.html",
      pubDate: new Date("2024-03-17T09:45:00"),
      category: 'tech',
      views: 780,
      comments: 20
    },
    {
      title: "Chatbot Google 'lăng mạ' sinh viên nhờ làm bài tập",
      description: "Gemini, chatbot AI của Google, đã có lời lẽ xúc phạm một sinh viên 29 tuổi khi người này nhờ giải bài tập.",
      image: "https://i1-sohoa.vnecdn.net/2024/11/18/DSC03470-JPG-8873-1731910151.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=5ombTwUHev6I7ze_LlSLwQ",
      link: "https://vnexpress.net/chatbot-google-lang-ma-sinh-vien-nho-lam-bai-tap-4817243.html",
      pubDate: new Date("2024-03-16T13:30:00"),
      category: 'tech',
      views: 750,
      comments: 18
    },
    {
      title: "FPT Shop bán độc quyền Xiaomi 14T Pro bản 1 TB",
      description: "Xiaomi 14T Pro phiên bản bộ nhớ trong 1 TB đồng bán độc quyền tại chuỗi cửa hàng FPT Shop từ 1/12 với giá ưu đãi 16,99 triệu đồng.",
      image: "https://i1-sohoa.vnecdn.net/2024/12/06/XAM-3884-1733481167.png?w=1020&h=0&q=100&dpr=1&fit=crop&s=pUaqaPISvt4BmUxEgcICOw",
      link: "https://vnexpress.net/fpt-shop-ban-doc-quyen-xiaomi-14t-pro-ban-1-tb-4824799.html",
      pubDate: new Date("2024-03-15T10:30:00"),
      category: 'mobile',
      views: 950,
      comments: 28
    },
    {
      title: "Galaxy S24 FE - smartphone đáng chú ý phân khúc cận cao cấp",
      description: "Samsung trang bị chip Exynos 2400e cho tác vụ nặng, nâng cấp camera, cùng nhiều tính năng Galaxy AI hỗ trợ tiếng Việt, trên Galaxy S24 FE.",
      image: "https://i1-sohoa.vnecdn.net/2024/12/05/S34-2948-1733388158.png?w=1020&h=0&q=100&dpr=1&fit=crop&s=gFBXztsQyOfUyONAfPomug",
      link: "https://vnexpress.net/galaxy-s24-fe-smartphone-dang-chu-y-phan-khuc-can-cao-cap-4824282.html",
      pubDate: new Date("2024-03-14T14:20:00"),
      category: 'mobile',
      views: 880,
      comments: 35
    },
    {
      title: "7 nâng cấp dự kiến có trên iPhone 17 Pro",
      description: "Hai mẫu iPhone 17 Pro và 17 Pro Max dự kiến có thiết kế mới, dùng khung nhôm thay cho titan, trang bị chip Wi-Fi 7 do Apple thiết kế.",
      image: "https://i1-sohoa.vnecdn.net/2024/11/28/iPhone-17-Pro-Dual-Tone-Rectan-5437-2950-1732807344.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=Z_HCv26aSYGfzhhvenfCoQ",
      link: "https://vnexpress.net/7-nang-cap-du-kien-co-tren-iphone-17-pro-4821672.html",
      pubDate: new Date("2024-03-13T11:15:00"),
      category: 'mobile',
      views: 820,
      comments: 30
    },
    {
      title: "Apple bắt đầu phát triển iPhone gập",
      description: "iPhone Flip được cho đã bước vào quá trình phát triển chính thức với sự hợp tác của các nhà cung cấp màn hình LG Display hoặc Samsung Display.",
      image: "https://i1-sohoa.vnecdn.net/2024/11/28/iphoneflip4-1280x720-800-resiz-9308-6777-1732804706.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=ApezLIareTMj1UafLd4saw",
      link: "https://vnexpress.net/apple-bat-dau-phat-trien-iphone-gap-4821664.html",
      pubDate: new Date("2024-03-12T09:40:00"),
      category: 'mobile',
      views: 750,
      comments: 25
    },
    {
      title: "ROG Strix Scar - laptop gaming mạnh nhất thế giới",
      description: "Asus nâng cấp ROG Strix Scar, dòng laptop gaming mạnh nhất của hãng, với màn hình miniLED, chip Core i9-14980HX, GPU RTX 4090 16 GB và RAM 64 GB.",
      image: "https://i1-sohoa.vnecdn.net/2024/01/09/DSC9773-1704795553-1704812903.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=nH5Rts0syV95tyEVzvygOQ",
      link: "https://vnexpress.net/rog-strix-scar-laptop-gaming-manh-nhat-the-gioi-4698858.html",
      pubDate: new Date("2024-03-11T15:30:00"),
      category: 'laptop',
      views: 1300,
      comments: 45
    },
    {
      title: "Nhiều sinh viên chuộng laptop gaming",
      description: "Laptop gaming mang cấu hình mạnh, xử lý tốt phần mềm đồ họa, lập trình cho học tập và cả giải trí, hiện giảm giá tại Thế Giới Di Động, hút nhiều sinh viên mua sắm.",
      image: "https://i1-sohoa.vnecdn.net/2023/08/04/Image-502588282-ExtractWord-1-4715-3522-1691141583.png?w=1020&h=0&q=100&dpr=1&fit=crop&s=vLDstZimhvkEscbz91GVEw",
      link: "https://vnexpress.net/nhieu-sinh-vien-chuong-laptop-gaming-4637461.html",
      pubDate: new Date("2024-03-10T13:20:00"),
      category: 'laptop',
      views: 890,
      comments: 28
    },
    {
      title: "HP Victus Gaming Laptop dành cho game thủ",
      description: "HP Victus Gaming Laptop 16-r0127TX/r0129TX sở hữu cấu hình mạnh mẽ, thiết kế hiện đại, giá cả hợp lý, mang đến cho game thủ trải nghiệm chơi game trọn vẹn.",
      image: "https://i1-sohoa.vnecdn.net/2023/12/18/image001-9747-1702871979.png?w=1020&h=0&q=100&dpr=1&fit=crop&s=0P7TZq7N6FGMOaAjbsuWlA",
      link: "https://vnexpress.net/hp-victus-gaming-laptop-danh-cho-game-thu-4690167.html",
      pubDate: new Date("2024-03-09T11:45:00"),
      category: 'laptop',
      views: 920,
      comments: 32
    },
    {
      title: "Laptop Acer Gaming Aspire dành cho học sinh, sinh viên",
      description: "Dòng laptop gaming phổ thông mới nhất của Acer dành cho học sinh, sinh viên hay người đi làm, sở hữu cấu hình mạnh, trong tầm giá 20 triệu đồng.",
      image: "https://i1-sohoa.vnecdn.net/2023/10/20/image003-4558-1697787396.png?w=1020&h=0&q=100&dpr=1&fit=crop&s=kPgYOs5eF9HERCtnI8lUzA",
      link: "https://vnexpress.net/laptop-acer-gaming-aspire-danh-cho-hoc-sinh-sinh-vien-4665428.html",
      pubDate: new Date("2024-03-08T10:15:00"),
      category: 'laptop',
      views: 850,
      comments: 30
    },
    {
      title: "Laptop gaming đắt nhất của Acer",
      description: "Hai mẫu Acer Predator Helios 16 và Helios 18 có cấu hình mạnh mẽ nhờ vi xử lý Intel thế hệ 13 mới nhất GPU RTX 40, màn hình tỷ lệ 16:10.",
      image: "https://i1-sohoa.vnecdn.net/2023/02/22/Image-446873271-ExtractWord-0-6479-4139-1677060952.png?w=1020&h=0&q=100&dpr=1&fit=crop&s=RANmaKc8kl5yNeBpBzIeSw",
      link: "https://vnexpress.net/laptop-gaming-dat-nhat-cua-acer-4573732.html",
      pubDate: new Date("2024-03-07T14:30:00"),
      category: 'laptop',
      views: 980,
      comments: 38
    },
    {
      title: "Laptop gaming phiên bản Mercedes của MSI",
      description: "MSI Stealth 16 lấy cảm hứng thiết kế từ mẫu xe đua Mercedes-AMG GT2, được trang bị cấu hình mạnh và số lượng bán ra giới hạn.",
      image: "https://i1-sohoa.vnecdn.net/2023/05/31/Stealth-16-MSI-AMG-VnExpress15-1685542778.png?w=1200&h=0&q=100&dpr=1&fit=crop&s=zIGBKN3G4evJVeweG28w5A",
      link: "https://vnexpress.net/laptop-gaming-phien-ban-mercedes-cua-msi-4612089.html",
      pubDate: new Date("2024-03-06T12:20:00"),
      category: 'laptop',
      views: 820,
      comments: 25
    },
    {
      title: "VNG sắp đóng game bài",
      description: "Các game sử dụng hình ảnh lá bài trên ZingPlay sẽ được đóng trong những ngày tới nhằm đáp ứng nghị định 147, có hiệu lực từ 25/12.",
      image: "https://i1-sohoa.vnecdn.net/2024/11/15/LQ-00235-9242-1731638752.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=4TytFIBX4edJNUJtpUMw6g",
      link: "https://vnexpress.net/vng-sap-dong-game-bai-4816058.html",
      pubDate: new Date("2024-03-05T16:45:00"),
      category: 'gaming',
      views: 1600,
      comments: 70
    },
    {
      title: "'Squid Game 2' nhận đề cử Quả Cầu Vàng dù chưa ra mắt",
      description: "Phim Hàn 'Squid Game 2' được đề cử Phim truyền hình chính kịch hay nhất trước ngày phát hành ba tuần.",
      image: "https://i1-giaitri.vnecdn.net/2024/12/10/squidgame-unit-204-n064080-e17-8927-9307-1733792189.png?w=1020&h=0&q=100&dpr=1&fit=crop&s=L0JA0YlHEAAEJitxsy3w7w",
      link: "https://vnexpress.net/squid-game-2-nhan-de-cu-qua-cau-vang-du-chua-ra-mat-4825847.html",
      pubDate: new Date("2024-03-04T15:30:00"),
      category: 'gaming',
      views: 1600,
      comments: 70
    },
    {
      title: "Khách sạn chơi game bùng nổ ở châu Á",
      description: "Người trẻ Trung Quốc và châu Á dần từ bỏ quán game truyền thống để đổi sang mô hình khách sạn kết hợp phòng chơi game hiện đại, chi phí hợp lý.",
      image: "https://i1-dulich.vnecdn.net/2024/11/28/tai-xuong-32-4402-1732767035.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=M3hj8O2FLP6HqDvXfyra_w",
      link: "https://vnexpress.net/khach-san-choi-game-bung-no-o-chau-a-4821348.html",
      pubDate: new Date("2024-03-03T13:20:00"),
      category: 'gaming',
      views: 950,
      comments: 40
    },
    {
      title: "Các nước quản lý thời gian chơi game thế nào?",
      description: "Một số nơi trên thế giới như Trung Quốc, Hàn Quốc giới hạn thời gian chơi game nghiêm ngặt, đặc biệt với trẻ vị thành niên.",
      image: "https://i1-sohoa.vnecdn.net/2024/11/13/DSCF1304-1673336479-2835-1731490088.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=EVRVWc0z0b6SfFAB4mADJQ",
      link: "https://vnexpress.net/cac-nuoc-quan-ly-thoi-gian-choi-game-the-nao-4815604.html",
      pubDate: new Date("2024-03-02T11:45:00"),
      category: 'gaming',
      views: 1100,
      comments: 45
    },
    {
      title: "Phần lớn game tại Việt Nam có nguồn gốc Trung Quốc",
      description: "Trò chơi điện tử có nguồn gốc Trung Quốc đang chiếm hơn 80% game được cấp phép, gấp 6 lần game tự phát triển trong nước.",
      image: "https://i1-sohoa.vnecdn.net/2024/11/28/72490be394ec34b26dfd-6988-1716-2491-2531-1732779797.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=2Nju0Nj4IzufbsN1BPMhyQ",
      link: "https://vnexpress.net/phan-lon-game-tai-viet-nam-co-nguon-goc-trung-quoc-4821473.html",
      pubDate: new Date("2024-03-01T10:30:00"),
      category: 'gaming',
      views: 880,
      comments: 35
    },
    {
      title: "Ngạo Kiếm Vô Song Origin sắp ra mắt game thủ",
      description: "Nhà phát hành Gosu làm mới lại dòng game kiểm hiệp trên PC từng gắn với thế hệ 8x - 9x, kết hợp ban nhạc MTV và streamer nổi tiếng ở lễ ra mắt hôm 23/8.",
      image: "https://i1-sohoa.vnecdn.net/2024/08/22/1-6638-1724314770.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=ieHya6uqGYhwHeAhSLhPGg",
      link: "https://vnexpress.net/ngao-kiem-vo-song-origin-sap-ra-mat-game-thu-4784506.html",
      pubDate: new Date("2024-02-29T14:15:00"),
      category: 'gaming',
      views: 820,
      comments: 30
    },
    {
      title: "Bà Rịa - Vũng Tàu sử dụng app dịch vụ công trên thiết bị di động",
      description: "Chính quyền đưa vào sử dụng ứng dụng dịch vụ công trên hai nền tảng IOS và Android nhằm nâng cao hiệu quả phục vụ người dân và doanh nghiệp.",
      image: "https://i1-vnexpress.vnecdn.net/2024/11/25/DSC06066-JPG-6269-1732527062.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=Z9i7SlEZ-z33RqvT9jc3Vw",
      link: "https://vnexpress.net/ba-ria-vung-tau-su-dung-app-dich-vu-cong-tren-thiet-bi-di-dong-4820218.html",
      pubDate: new Date("2024-02-28T15:45:00"),
      category: 'accessories',
      views: 1050,
      comments: 42
    },
    {
      title: "Nhu cầu mua sắm thiết bị gia dụng làm mới nhà cuối năm​",
      description: "Không mua được nhà mới theo kế hoạch, chị Nguyễn Đài Trang (Cầu Giấy, Hà Nội) quyết định cải tạo căn hộ đang ở và thay một số thiết bị gia dụng để làm mới không gian sống.",
      image: "https://i1-giadinh.vnecdn.net/2024/11/27/Picture1-5571-1732696595.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=Z96Gg4MLLV_eI1Sk9pw-dQ",
      link: "https://vnexpress.net/nhu-cau-mua-sam-thiet-bi-gia-dung-lam-moi-nha-cuoi-nam-4821054.html",
      pubDate: new Date("2024-02-27T13:30:00"),
      category: 'accessories',
      views: 780,
      comments: 28
    },
    {
      title: "Thiết bị phát hiện ung thư giá 70.000 đồng",
      description: "Đại học Texas tại El Paso (UTEP) phát triển thiết bị phát hiện ung thư nhanh chóng, cho kết quả trong một giờ với giá chỉ 3 USD, song cần thêm thời gian nghiên cứu để được giới chức chấp thuận.",
      image: "https://i1-suckhoe.vnecdn.net/2024/10/31/li-ph-d-created-low-92696180-j-7961-9710-1730344928.png?w=1020&h=0&q=100&dpr=1&fit=crop&s=AVxFIitQselfPgs3nLB8UA",
      link: "https://vnexpress.net/thiet-bi-phat-hien-ung-thu-gia-70-000-dong-4810549.html",
      pubDate: new Date("2024-02-26T11:20:00"),
      category: 'accessories',
      views: 850,
      comments: 32
    },
    {
      title: "Thiết bị rẻ nhất có Apple Intelligence bắt đầu bán tại Việt Nam",
      description: "iPad mini 7, máy rẻ nhất hỗ trợ Apple Intelligence, bắt đầu lên kệ tại thị trường Việt Nam với giá 13,9 triệu đồng.",
      image: "https://i1-sohoa.vnecdn.net/2024/11/18/a1-9316-1731926840.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=HXExgNnLfd4hmPVgavkxfg",
      link: "https://vnexpress.net/thiet-bi-re-nhat-co-apple-intelligence-bat-dau-ban-tai-viet-nam-4817522.html",
      pubDate: new Date("2024-02-25T10:15:00"),
      category: 'accessories',
      views: 720,
      comments: 25
    },
    {
      title: "60 năm phát triển thiết bị nghe nhạc của Bose",
      description: "Bose công bố nghiên cứu mới về âm nhạc và ra mắt các sản phẩm mới, nhân kỷ niệm 60 năm thành lập thương hiệu.",
      image: "https://i1-sohoa.vnecdn.net/2024/10/18/1-2636-1729248740.png?w=1020&h=0&q=100&dpr=1&fit=crop&s=oF2bBOJMgoK3L_LVugRZmQ",
      link: "https://vnexpress.net/60-nam-phat-trien-thiet-bi-nghe-nhac-cua-bose-4805855.html",
      pubDate: new Date("2024-02-24T14:30:00"),
      category: 'accessories',
      views: 890,
      comments: 35
    },
    {
      title: "10 thiết bị được yêu thích trong Sản phẩm tôi yêu 2024",
      description: "Hàng chục nghìn lượt bình chọn của độc giả giúp tìm ra các mẫu máy được yêu thích nhất trong nhiều hạng mục về thiết bị điện tử, gia dụng của Sản phẩm tôi yêu 2024.",
      image: "https://i1-sohoa.vnecdn.net/2024/12/06/Xiaomi-2-6888-1722311545-7494-1733473941.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=Ia0e7qRJdjIX4ycbeSdOJA",
      link: "https://vnexpress.net/10-thiet-bi-duoc-yeu-thich-trong-san-pham-toi-yeu-2024-4824707.html",
      pubDate: new Date("2024-02-23T12:45:00"),
      category: 'accessories',
      views: 950,
      comments: 38
    }
  ];

  // Lọc tin tức theo danh mục và số lượng hiển thị
  const filteredNews = news
    // Sắp xếp theo thời gian mới nhất
    .sort((a, b) => b.pubDate - a.pubDate)
    // Lọc theo danh mục nếu không phải 'all'
    .filter(item => {
      return activeCategory === 'all' || item.category === activeCategory;
    })
    // Giới hạn số lượng hiển thị
    .slice(0, visibleNews);

  // Hàm xử lý nút "Xem thêm"
  const handleLoadMore = () => {
    // Lấy tổng số tin tức theo category hiện tại
    const totalNewsInCategory = news.filter(item => 
      activeCategory === 'all' || item.category === activeCategory
    ).length;
    
    // Set visibleNews thành tổng số tin tức
    setVisibleNews(totalNewsInCategory);
  };

  // Kiểm tra xem còn tin tức để hiển thị không
  const hasMoreNews = filteredNews.length < news.filter(item => 
    activeCategory === 'all' || item.category === activeCategory
  ).length;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="news-container">
      {/* Header Section */}
      <div className="news-header">
        <h1>Tin tức & Sự kiện</h1>
      </div>
      {/* Trending News Section */}
      <div className="trending-section">
        <h2 className="section-title">
          <i className="bi bi-graph-up-arrow"></i> Xu hướng
        </h2>
        <div className="trending-news">
          {trendingNews.map((item, index) => (
            <a key={index} href={item.link} className="trending-item" target="_blank" rel="noopener noreferrer">
              <span className="trending-number">{index + 1}</span>
              <div className="trending-content">
                <h3>{item.title}</h3>
                <div className="trending-meta">
                  <span>
                    {item.pubDate.toLocaleDateString('vi-VN', { 
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                  </span>
                  <span>
                    <i className="bi bi-eye-fill"></i>
                    {item.views}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="news-categories">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            <i className={`bi ${category.icon}`}></i>
            {category.name}
          </button>
        ))}
      </div>

      {/* Featured Posts Section */}
      <div className="featured-posts">
        <h2 className="section-title">
          <i className="bi bi-star-fill"></i> Tin Nổi Bật
        </h2>
        <div className="featured-posts-grid">
          {/* Tin lớn bên trái */}
          <a 
            href="https://vnexpress.net/sieu-tri-tue-nhan-tao-agi-dang-dan-hien-dien-4825386.html" 
            className="featured-post-card main-post"
            target="_blank" 
            rel="noopener noreferrer"
          >
            <div className="featured-post-image">
              <img src="https://i1-sohoa.vnecdn.net/2024/12/09/ai-1733705153-2647-1733705181.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=SL8knNval641XInnA1gF2w" alt="Apple Vision Pro" />
            </div>
            <div className="featured-post-overlay">
              <span className="featured-post-category">Công nghệ</span>
              <div className="featured-post-content">
                <h3 className="featured-post-title">Siêu trí tuệ nhân tạo AGI 'đang dần hiện diện'</h3>
                <p className="featured-post-description">ChatGPT-o1 của OpenAI được một số chuyên gia nhận định là mô hình tiệm cận với siêu trí tuệ AGI.</p>
                <div className="featured-post-meta">
                  <span>
                    {new Date().toLocaleDateString('vi-VN', { 
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                  </span>
                  <span>
                    <i className="bi bi-eye-fill"></i>
                    1800
                  </span>
                </div>
              </div>
            </div>
          </a>

          {/* 2 tin nhỏ bên phải */}
          <div className="side-posts">
            <a 
              href="https://vnexpress.net/vivo-v40-5g-smartphone-dong-v-dau-tien-co-ong-kinh-zeiss-4825110.html" 
              className="featured-post-card side-post"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <div className="featured-post-image">
                <img src="https://i1-sohoa.vnecdn.net/2024/12/07/DSC2455-1733559417.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=iuUfw-pfR2e6yfhhUNrw3w" alt="iPhone 16 Pro Max" />
              </div>
              <div className="featured-post-overlay">
                <span className="featured-post-category">Điện thoại</span>
                <div className="featured-post-content">
                  <h3 className="featured-post-title">Vivo V40 5G - smartphone dòng V đầu tiên có ống kính Zeiss</h3>
                  <div className="featured-post-meta">
                    <span>
                      {new Date().toLocaleDateString('vi-VN', { 
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </span>
                    <span>
                      <i className="bi bi-eye-fill"></i>
                      1200
                    </span>
                  </div>
                </div>
              </div>
            </a>

            <a 
              href="https://vnexpress.net/choi-game-co-phai-nghe-tuong-lai-4760128.html" 
              className="featured-post-card side-post"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <div className="featured-post-image">
                <img src="https://i1-vnexpress.vnecdn.net/2024/06/19/img-2032-vsco-jpg-1718771632-2767-1718772011.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=1x_RF14-_Unbc7KAnO9Mfg" alt="AI Phone" />
              </div>
              <div className="featured-post-overlay">
                <span className="featured-post-category">Game</span>
                <div className="featured-post-content">
                  <h3 className="featured-post-title">'Chơi game' có phải nghề tương lai?</h3>
                  <div className="featured-post-meta">
                    <span>
                      {new Date().toLocaleDateString('vi-VN', { 
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </span>
                    <span>
                      <i className="bi bi-eye-fill"></i>
                      1000
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Latest News Section */}
      <div className="latest-section">
        <h2 className="section-title">
          <i className="bi bi-clock-history"></i> Tin mới nhất
        </h2>
        <div className="news-grid">
          {filteredNews.map((item, index) => (
            <a key={index} href={item.link} target="_blank" rel="noopener noreferrer" className="news-link">
              <div className="news-item">
                <div className="news-image">
                  <img src={item.image} alt={item.title} />
                  <div className="news-category">
                    {categories.find(c => c.id === item.category)?.name}
                  </div>
                </div>
                <div className="news-content">
                  <h3 className="news-title">{item.title}</h3>
                  <p className="news-summary">{item.description}</p>
                  <div className="news-meta">
                    <span className="news-date">
                      <i className="bi bi-calendar3"></i>
                      {item.pubDate.toLocaleDateString('vi-VN', { 
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </span>
                    <span className="news-views">
                      <i className="bi bi-eye-fill"></i>
                      {item.views}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
        
        {/* Nút "Xem thêm" */}
        {hasMoreNews && (
          <div className="load-more">
            <button className="load-more-btn" onClick={handleLoadMore}>
              <i className="bi bi-plus-circle"></i> Xem tất cả
            </button>
          </div>
        )}
      </div>

      {/* Newsletter Subscription */}
      <div className="newsletter-section">
        <div className="newsletter-content">
          <i className="bi bi-envelope-paper"></i>
          <h3>Đăng ký nhận tin</h3>
          <p>Nhận thông báo về những tin tức công nghệ mới nhất</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Nhập email của bạn" />
            <button className="subscribe-btn">Đăng ký</button>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button className="scroll-top" onClick={scrollToTop}>
          <i className="bi bi-arrow-up"></i>
        </button>
      )}
    </div>
  );
}
