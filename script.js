// Phần 1: Gửi tin nhắn qua webhook
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const responseDiv = document.getElementById("response");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = form.elements["message"].value.trim();
    if (!message) {
      responseDiv.textContent = texts.empty;
      return;
    }

    try {
      const res = await fetch("https://webhook.lighthousesoul.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (res.ok) {
        responseDiv.textContent = texts.success;
        form.reset();
      } else {
        responseDiv.textContent = texts.error;
      }
    } catch (err) {
      responseDiv.textContent = texts.error;
    }
  });
});

// Phần 2: Ngôn ngữ tự động theo trình duyệt
const lang = navigator.language.startsWith("ja")
  ? "ja"
  : navigator.language.startsWith("en")
  ? "en"
  : "vi";

const textsByLang = {
  vi: {
    heading: "Hải Đăng Cuộc Đời",
    sub: "Nơi bạn có thể gửi một lời nhắn nhẹ nhàng, ẩn danh.",
    placeholder: "Viết điều bạn muốn chia sẻ...",
    button: "Gửi",
    success: "Đã gửi thành công.",
    error: "Có lỗi xảy ra. Vui lòng thử lại.",
    empty: "Bạn chưa nhập nội dung.",
    stopMusic: "Tắt nhạc",
    playMusic: "Mở nhạc",
  },
  en: {
    heading: "Lighthouse of Life",
    sub: "A quiet place to leave an anonymous message.",
    placeholder: "Write what you feel...",
    button: "Send",
    success: "Message sent successfully.",
    error: "Something went wrong. Please try again.",
    empty: "Message is empty.",
    stopMusic: "Stop Music",
    playMusic: "Play Music",
  },
  ja: {
    heading: "人生の灯台",
    sub: "匿名でメッセージを送れる静かな場所です。",
    placeholder: "伝えたいことを書いてください...",
    button: "送信",
    success: "メッセージが送信されました。",
    error: "エラーが発生しました。もう一度お試しください。",
    empty: "メッセージが空です。",
    stopMusic: "音楽を停止",
    playMusic: "音楽を再生",
  },
};

const texts = textsByLang[lang];

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("h1").textContent = texts.heading;
  document.querySelector("p").textContent = texts.sub;
  document.querySelector("textarea").placeholder = texts.placeholder;
  document.querySelector("button[type='submit']").textContent = texts.button;
  document.getElementById("toggleMusic").textContent = texts.stopMusic;
});

// Phần 3: Phát nhạc nền tự động
const tracks = ["A.mp3", "B.mp3", "C.mp3"];
let currentTrack = 0;
const audio = new Audio();
audio.src = tracks[currentTrack];
audio.autoplay = true;
audio.loop = false;
audio.volume = 0.5;

audio.addEventListener("ended", () => {
  currentTrack = (currentTrack + 1) % tracks.length;
  audio.src = tracks[currentTrack];
  audio.play();
});

window.addEventListener("load", () => {
  audio.play().catch((e) => {
    console.log("Autoplay bị chặn:", e);
  });
});

// Phần 4: Nút bật/tắt nhạc
const toggleBtn = document.getElementById("toggleMusic");
let isPlaying = true;

toggleBtn.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    toggleBtn.textContent = texts.playMusic;
  } else {
    audio.play();
    toggleBtn.textContent = texts.stopMusic;
  }
  isPlaying = !isPlaying;
});
