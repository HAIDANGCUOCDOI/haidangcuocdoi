// Danh sách các file âm thanh
const tracks = ['A.mp3', 'B.mp3', 'C.mp3'];
let currentTrack = 0;

// Tạo thẻ audio ẩn
const audio = new Audio();
audio.src = tracks[currentTrack];
audio.autoplay = true;
audio.loop = false; // để tự xử lý vòng lặp thủ công
audio.volume = 0.5; // chỉnh nhỏ vừa phải

// Khi kết thúc 1 bài, phát bài tiếp theo
audio.addEventListener('ended', () => {
    currentTrack = (currentTrack + 1) % tracks.length; // vòng lặp A->B->C->A
    audio.src = tracks[currentTrack];
    audio.play();
});

// Tự động phát khi trang load
window.addEventListener('load', () => {
    audio.play().catch(e => {
        // Một số trình duyệt chặn autoplay, chỉ log ra thôi
        console.log('Autoplay bị chặn:', e);
    });
});
