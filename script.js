async function checkPhishing() {
  const url = document.getElementById("urlInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (url === "") {
    resultDiv.innerHTML = "<p style='color:orange;'>⚠️ Please enter a URL!</p>";
    return;
  }

  resultDiv.innerHTML = "<p>🔍 Checking...</p>";

  try {
    // Replace this backend URL with your Flask/FastAPI endpoint
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: url }),
    });

    const data = await response.json();

    if (data.prediction === "phishing") {
      resultDiv.innerHTML = "<p class='phishing'>⚠️ This website is PHISHING!</p>";
    } else if (data.prediction === "legitimate") {
      resultDiv.innerHTML = "<p class='safe'>✅ This website is SAFE!</p>";
    } else {
      resultDiv.innerHTML = "<p style='color:gray;'>❓ Unable to classify.</p>";
    }
  } catch (error) {
    resultDiv.innerHTML = "<p style='color:red;'>❌ Error connecting to server.</p>";
    console.error(error);
  }
  const loader = document.getElementById("loader");
loader.style.display = "block";
resultDiv.innerHTML = "";


// After getting response
loader.style.display = "none";
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  // Change icon 🌙 ↔ ☀️
  if (document.body.classList.contains("light-mode")) {
    themeToggle.textContent = "☀️";
  } else {
    themeToggle.textContent = "🌙";
  }
});


}
