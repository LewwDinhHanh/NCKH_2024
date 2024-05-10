const dropzoneBox = document.getElementsByClassName("dropzone-box")[0];
const background_testElement = document.querySelector("#background_test")
const inputFiles = document.querySelectorAll(
  ".dropzone-area input[type='file']"
);

const inputElement = inputFiles[0];

const dropZoneElement = inputElement.closest(".dropzone-area");

inputElement.addEventListener("change", (e) => {
  if (inputElement.files.length) {
    updateDropzoneFileList(dropZoneElement, inputElement.files[0]);
  }
});

dropZoneElement.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZoneElement.classList.add("dropzone--over");
});

["dragleave", "dragend"].forEach((type) => {
  dropZoneElement.addEventListener(type, (e) => {
    dropZoneElement.classList.remove("dropzone--over");
  });
});

dropZoneElement.addEventListener("drop", (e) => {
  e.preventDefault();

  if (e.dataTransfer.files.length) {
    inputElement.files = e.dataTransfer.files;
    console.log("FILE:", e.dataTransfer.files[0]);
    updateDropzoneFileList(dropZoneElement, e.dataTransfer.files[0]);
  }

  dropZoneElement.classList.remove("dropzone--over");
});

const updateDropzoneFileList = (dropzoneElement, file) => {
  let dropzoneFileMessage = dropzoneElement.querySelector(".file-info");

  dropzoneFileMessage.innerHTML = `${file.name}, ${file.size} bytes`;
};

dropzoneBox.addEventListener("reset", (e) => {
  let dropzoneFileMessage = dropZoneElement.querySelector(".file-info");

  dropzoneFileMessage.innerHTML = `Chưa có File`;
});

dropzoneBox.addEventListener("submit", (e) => {
  e.preventDefault();
  const myFiled = document.getElementById("upload-file");
  const formData = new FormData();
  formData.append("file", inputElement.files[0])
  console.log(myFiled.files[0]);
  fetch("http://127.0.0.1:5000/api/detect", {
    method: "post",
    mode: "cors",
    // body: JSON.stringify({"file": getBase64(inputElement.files[0])}),
    body: formData

  }).then(res => {
    return res.json()
  }).then(res => {
    const data = res.data;
    const image = `http://localhost:5000/${data?.image}`
    const imageElement = document.createElement("img");
    imageElement.style.width = '256px';
    imageElement.style.height = '256px';
    imageElement.src = image;
    background_testElement.innerHTML = '';
    const detectContainer = document.createElement('div');
    detectContainer.id = 'detect';
    
    const wrapDetectElement = document.createElement("div");
    const txt1 = document.createElement('p');
    const txt2 = document.createElement('p');
    
    txt1.innerHTML = `<b>confidence</b>: ${data?.result?.[0]?.confidence}`;
    txt1.style.fontSize = '30px'; // Thay đổi kích thước chữ ở đây
    txt2.innerHTML = `<b>class</b>: ${data?.result?.[0]?.class}`;
    txt2.style.fontSize = '30px'; // Thay đổi kích thước chữ ở đây
    
    wrapDetectElement.appendChild(txt1);
    wrapDetectElement.appendChild(txt2);

    detectContainer.appendChild(wrapDetectElement);
    detectContainer.appendChild(imageElement);
    background_testElement.appendChild(detectContainer)
  })
});

