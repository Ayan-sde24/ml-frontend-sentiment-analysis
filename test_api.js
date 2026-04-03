async function run() {
  console.log("Testing POST /predict ...");
  try {
    const r1 = await fetch("https://ml-backend-sentiment-analysis.onrender.com/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({text: "I love this app, it is amazing!"})
    })
    console.log("Status:", r1.status);
    console.log("Response:", await r1.text());
  } catch(e) {
    console.log("Failed:", e.message)
  }

  console.log("\nTesting POST / ...");
  try {
     const r2 = await fetch(`${import.meta.env.VITE_API_URL}/predict`, {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({text: "I love this app, it is amazing!"})
     })
     console.log("Status:", r2.status);
     console.log("Response:", await r2.text());
  } catch(e) {
    console.log("Failed:", e.message)
  }
}
run();
