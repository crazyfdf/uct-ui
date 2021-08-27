export default function wxLogin(e) {
  return new Promise((resolve, reject) => {
    if (e.detail.errMsg === "getUserInfo:ok") {
      uni.login({
        success: function(info) {
          resolve(info.code);
        },
        fail: function(err) {
          reject(err);
        },
      });
    }
  });
}
