const passport = require("passport");
const FacebookTokenStrategy = require("passport-facebook-token");

passport.use(
  new FacebookTokenStrategy(
    {
      clientID: 1134390881723150, // Thay bằng App ID của bạn
      clientSecret: '9d023eaf35b6d6ff065da37484fdb654', // Thay bằng App Secret của bạn
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Xử lý người dùng Facebook
        const user = {
          facebookId: profile.id,
          name: profile.displayName,
          email: profile.emails ? profile.emails[0].value : null,
          picture: profile.photos ? profile.photos[0].value : null,
        };

        // Lưu hoặc tìm người dùng trong cơ sở dữ liệu của bạn nếu cần
        // Ví dụ: Tìm người dùng từ cơ sở dữ liệu hoặc tạo mới
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

module.exports = passport;
