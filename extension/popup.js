const button = document.getElementById("saveLink");
const loginForm = document.getElementById("loginForm");
const currentUrlEl = document.getElementById("currentUrl");
const linkFields = document.getElementById("linkFields");

async function checkSession() {
    const session = await chrome.storage.local.get("key");

    if (session.key) {
        loginForm.style.display = "none";
        button.style.display = "flex";
        linkFields.style.display = "flex";
        showCurrentTab();
    } else {
        loginForm.style.display = "flex";
        button.style.display = "none";
        linkFields.style.display = "none";
        currentUrlEl.textContent = "";
    }
}

async function showCurrentTab() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    currentUrlEl.textContent = tab.url;
}

checkSession();

button.addEventListener("click", async () => {
    const session = await chrome.storage.local.get("key");
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const currentUrl = tab.url;

    const description = document.getElementById("description").value;
    const note = document.getElementById("note").value;
    const tagsRaw = document.getElementById("tags").value;

    const tags = tagsRaw
        .split(",")
        .map(t => t.trim())
        .filter(t => t.length > 0);

    button.textContent = "Saving...";

    try {
        const response = await fetch("http://localhost:3000/links-add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${session.key}`
            },
            body: JSON.stringify({
                url: currentUrl,
                description,
                note,
                tags
            })
        });

        const data = await response.json();
        console.log("SAVE RESPONSE:", data);

        button.textContent = "✓ Saved!";
        button.classList.add("saved");

        document.getElementById("description").value = "";
        document.getElementById("note").value = "";
        document.getElementById("tags").value = "";

        setTimeout(() => {
            button.textContent = "Save This Link";
            button.classList.remove("saved");
        }, 1500);

    } catch (err) {
        console.log("SAVE ERROR:", err);
        button.textContent = "Failed — try again";
        setTimeout(() => {
            button.textContent = "Save This Link";
        }, 1500);
    }
});