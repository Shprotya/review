const API = "https://7gtc39943a.execute-api.eu-west-1.amazonaws.com/prod";

async function uploadFile() {
    const file = document.getElementById("fileInput").files[0];

    const res = await fetch(API + "/upload-url");
    const data = await res.json();

    await fetch(data.uploadURL, {
    method: "PUT",
    body: file,
    headers: {
        "Content-Type": "application/json"
    }
});

    alert("Uploaded!");
}

async function loadStats() {
    const res = await fetch(API + "/reviews");
    const data = await res.json();
    const counts = JSON.parse(data.body);

    let html = "";
    for (let k in counts) {
        html += `<div class="card">${k}: ${data[k]}</div>`;
    }

    document.getElementById("summary").innerHTML = html;
}

async function getPositive() {
    const res = await fetch(API + "/reviews?sentiment=POSITIVE");
    const data = await res.json();
    const reviews = JSON.parse(data.body);  // ✅ parse the body string
    let html = "";
    reviews.forEach(r => {                  // ✅ loop over reviews, not data
        html += `<div class="card">${r.review}</div>`;
    });
    document.getElementById("results").innerHTML = html;
}
