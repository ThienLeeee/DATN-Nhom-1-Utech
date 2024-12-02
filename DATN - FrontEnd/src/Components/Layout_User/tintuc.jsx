import React from 'react';
import { Link } from 'react-router-dom';
import '/public/css/tintuc.css';

export default function Tintuc() {
  const featuredNews = {
    title: "7 nâng cấp dự kiến có trên iPhone 17 Pro",
    description: "Australia thông qua luật được đánh giá nghiêm ngặt nhất thế giới về mạng xã hội, trong đó cấm hoàn toàn trẻ dưới 16 tuổi sử dụng TikTok, Facebook...",
    image: "https://i1-sohoa.vnecdn.net/2024/11/28/R6UJUNCF6JJWJOJI2ZPJCTXMQY-1403-1732808151.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=ARZQWRIzWFGRS5kfQu3Iow",
    link: "https://vnexpress.net/australia-cam-tre-duoi-16-tuoi-su-dung-mang-xa-hoi-4821668.html",
    pubDate: new Date("2024-03-21T10:00:00")
  };

  const news = [
    {
      title: "Số phận những trào lưu thiết kế điện thoại 'điên rồ' ",
      description: "Điện thoại màn hình cong tràn hai cạnh, camera thò thụt... không còn xuất hiện và nhường chỗ cho thiết kế dạng thanh đơn thuần.",
      image: "https://i1-sohoa.vnecdn.net/2024/12/02/a1-1526-1733113986.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=t6fpXNBPG22mbWBXWXQMaQ",
      link: "https://vnexpress.net/so-phan-nhung-trao-luu-thiet-ke-dien-thoai-dien-ro-4822009.html",
      pubDate: new Date("2024-03-21T09:30:00")
    },
    {
      title: "Yaber đoạt giải máy chiếu thông minh được yêu thích nhất",
      description: "Máy chiếu Yaber K3/K3 Pro nhận được nhiều lượt bình chọn nhất trong số cuối cùng của chương trình Sản phẩm tôi yêu 2024",
      image: "https://i1-sohoa.vnecdn.net/2024/12/02/Yaber-K3-Projector-8761-1733111545.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=vqyIFnMxszYpgChWIeavZg",
      link: "https://vnexpress.net/yaber-doat-giai-may-chieu-thong-minh-duoc-yeu-thich-nhat-4822725.html",
      pubDate: new Date("2024-03-21T09:00:00")
    },
    {
      title: "5 smartphone bán tại Việt Nam tháng 12",
      description: "Smartphone gập mỏng nhất thế giới Magic V3, bộ đôi Find X8 và Vivo V40 nằm trong số các điện thoại bán tại Việt Nam tháng này.",
      image: "https://i1-sohoa.vnecdn.net/2024/11/30/DSC2153-1732957750.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=wufXkIXv3aaZwCnOdk3SuQ",
      link: "https://vnexpress.net/5-smartphone-ban-tai-viet-nam-thang-12-4822297.html",
      pubDate: new Date("2024-03-21T08:30:00")
    },
    {
      title: "Elon Musk muốn ngăn OpenAI thành 'công ty vì lợi nhuận'",
      description: "Elon Musk đã nộp đơn yêu cầu tòa án ngăn OpenAI trở thành công ty vì lợi nhuận hoàn toàn.",
      image: "https://i1-sohoa.vnecdn.net/2024/12/01/2024-03-29T005352Z-276238688-R-8230-8219-1733026820.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=_1LbGZpLog944qZ0u3udcA",
      link: "https://vnexpress.net/elon-musk-muon-ngan-openai-thanh-cong-ty-vi-loi-nhuan-4822438.html",
      pubDate: new Date("2024-03-21T08:00:00")
    },
    {
      title: "Trải nghiệm iPad Mini 7: Khó tìm tablet cỡ nhỏ tốt hơn",
      description: "Cấu hình không xuất sắc nhưng thiết kế gọn nhẹ, trải nghiệm mượt, hỗ trợ bút và Apple Intelligence khiến iPad Mini 7 là lựa chọn tablet cỡ nhỏ hàng đầu hiện tại.",
      image: "https://i1-sohoa.vnecdn.net/2024/11/29/DSCF1771-1732853048.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=-iXS6cgB21BKsyoW7aMDfQ",
      link: "https://vnexpress.net/trai-nghiem-ipad-mini-7-kho-tim-tablet-co-nho-tot-hon-4821854.html",
      pubDate: new Date("2024-03-21T07:30:00")
    },
    {
      title: "Apple bắt đầu phát triển iPhone gập",
      description: "iPhone Flip được cho đã bước vào quá trình phát triển chính thức với sự hợp tác của các nhà cung cấp màn hình LG Display hoặc Samsung Display.",
      image: "https://i1-sohoa.vnecdn.net/2024/11/28/iphoneflip4-1280x720-800-resiz-9308-6777-1732804706.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=ApezLIareTMj1UafLd4saw",
      link: "https://vnexpress.net/apple-bat-dau-phat-trien-iphone-gap-4821664.html",
      pubDate: new Date("2024-03-21T07:00:00")
    }
  ];

  return (
    <div className="news-container">
      <div className="news-header">
        <h1>Tin tức & Sự kiện</h1>
        <div className="breadcrumb">
          <Link to="/">Trang chủ</Link> / <Link to="/tintuc">Tin tức</Link>
        </div>
      </div>

      {/* Featured News */}
      <div className="featured-news">
        <a 
          href={featuredNews.link}
          target="_blank"
          rel="noopener noreferrer"
          className="featured-news-link"
        >
          <div className="featured-news-image">
            <img src={featuredNews.image} alt={featuredNews.title} />
          </div>
          <div className="featured-news-content">
            <h2 className="featured-news-title">{featuredNews.title}</h2>
            <p className="featured-news-description">{featuredNews.description}</p>
            <div className="featured-news-meta">
              <span className="news-time">
                {featuredNews.pubDate.toLocaleTimeString('vi-VN', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
              <span className="bullet">•</span>
              <span className="news-date">
                {featuredNews.pubDate.toLocaleDateString('vi-VN', {
                  day: '2-digit',
                  month: '2-digit'
                })}
              </span>
            </div>
          </div>
        </a>
      </div>

      {/* News Grid */}
      <div className="news-grid">
        {news.map((item, index) => (
          <a 
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="news-link"
          >
            <div className="news-item">
              <div className="news-image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="news-content">
                <h3 className="news-title">{item.title}</h3>
                <p className="news-summary">{item.description}</p>
                <div className="news-meta">
                  <span className="news-time">
                    {item.pubDate.toLocaleTimeString('vi-VN', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                  <span className="bullet">•</span>
                  <span className="news-date">
                    {item.pubDate.toLocaleDateString('vi-VN', {
                      day: '2-digit',
                      month: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
