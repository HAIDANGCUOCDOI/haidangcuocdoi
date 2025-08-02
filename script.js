// script.js

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", async function(e) {
        e.preventDefault(); // không cho submit mặc định

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("https://YOUR-WEBHOOK-URL-HERE", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert("Đã gửi thành công. Cảm ơn bạn.");
                form.reset();
            } else {
                alert("Gửi thất bại. Vui lòng thử lại.");
            }
        } catch (error) {
            console.error(error);
            alert("Có lỗi xảy ra. Vui lòng thử lại.");
        }
    });
});
