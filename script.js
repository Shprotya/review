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
    console.log("raw data:", data);        // 👈 add this temporarily
    console.log("data.body:", data.body);  // 👈 and this
    
    // Try this — if body exists parse it, otherwise use data directly
    const counts = data.body ? JSON.parse(data.body) : data;
    
    let html = "";
    for (let k in counts) {
        html += `<div class="card">${k}: ${counts[k]}</div>`;
    }
    document.getElementById("summary").innerHTML = html;
}

async function getPositive() {
    const res = await fetch(API + "/reviews?sentiment=POSITIVE");
    const data = await res.json();
    console.log("positive raw data:", data); // 👈 add this

    const reviews = data.body ? JSON.parse(data.body) : data;

    let html = "";
    reviews.forEach(r => {
        html += `<div class="card">${r.review}</div>`;
    });
    document.getElementById("results").innerHTML = html;
}
