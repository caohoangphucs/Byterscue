const apiUrl = "https://40b6-14-169-37-146.ngrok-free.app/api"
function printResult(response, outputID) {
    console.log("Server Respone:", response);
    document.getElementById(outputID).innerText = JSON.stringify(response, null, 2);
}
function sendDataAndPrintRes(url, _method, _data, dataReceiverID) {
        fetch(url, {method : _method, body: _data})
            .then(response => response.json())
                .then(data => printResult(data, dataReceiverID))
                    .catch(error => console.error("Lỗi ròu", error));
}

function inputImage(dataID) {
    const fileInput = document.getElementById(dataID);
    const file = fileInput.files[0];
    if (!file) {
        alert("File is not supported");
        return null;
    }
    const formData = new FormData();
    formData.append("image", file);
    return formData;
}

function inputText(dataID) {
    const textInput = document.getElementById(dataID);
    const text = textInput.value;
    if (!text) {
        alert("Text is empty");
        return null;
    }
    const formData = new FormData();
    formData.append("text", text);
    return formData;
}
function handleRequest(dataID, dataReceiverID, dataType) {
    let formData = new FormData();
    if (dataType == "image") formData = inputImage(dataID);
    if (dataType == "text") formData = inputText(dataID);
    sendDataAndPrintRes(apiUrl, "POST", formData, dataReceiverID);
}