document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorEl = document.getElementById("loginError");
    errorEl.style.display = "none";

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok || !data.jwt) {
            errorEl.style.display = "block";
            return;
        }

        await chrome.storage.local.set({ key: data.jwt });

        document.getElementById("loginForm").style.display = "none";
        document.getElementById("saveLink").style.display = "flex";
        document.getElementById("linkFields").style.display = "flex";

        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        document.getElementById("currentUrl").textContent = tab.url;

    } catch (err) {
        console.log("LOGIN ERROR:", err);
        errorEl.textContent = "Something went wrong — try again";
        errorEl.style.display = "block";
    }
});