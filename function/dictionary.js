document.addEventListener("DOMContentLoaded", function() {
    var button = document.querySelector("button[type='submit']");
    var overlay = document.createElement("div");
    overlay.classList.add("overlay");

    // Nội dung hiển thị là một trang HTML với hình ảnh và nút X
    var content = "<div class='content'>";
    content += "<h2>Tiêu đề</h2>";
    content += "<p>Nội dung trang HTML.</p>";
    content += "<img src='path/to/image.jpg' alt='Hình ảnh'>";
    content += "<button class='close-button'>X</button>"; // Thêm nút X
    content += "</div>";
    overlay.innerHTML = content;

    button.addEventListener("click", function() {
        document.body.appendChild(overlay);

        var closeButton = overlay.querySelector(".close-button");
        closeButton.addEventListener("click", function() {
            document.body.removeChild(overlay); // Tắt box hiển thị
        });
    });
});