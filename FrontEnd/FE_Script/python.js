apiUrl = "http://localhost:5000/api"
const data = {
    formExists: false,
    formInfo: {},
  };
function printResult(response, dataReceiverID) {
    console.log("Server Respone:", response);
    document.getElementById(dataReceiverID).innerText = JSON.stringify(response, null, 2);
}
function sendDataAndPrintRes(url, _method, _data, dataReceiverID) {
        fetch(url, {method : _method, body: _data})
            .then(response => response.json())
                .then(data => printResult(data, dataReceiverID))
                    .catch(error => console.error("Lỗi ròu", error));
}

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let formData = new FormData(this);
    let formObject = Object.fromEntries(formData.entries())
    let jsonData = JSON.stringify(formObject)
    console.log(jsonData)
    sendDataAndPrintRes(apiUrl, "POST", jsonData, "loginResult")
})
