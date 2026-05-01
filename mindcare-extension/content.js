console.log("MindCare Extension Loaded");

/* =========================
   POPUP FUNCTION
========================= */

function showPopup(message, riskLevel) {

    const oldPopup = document.getElementById("mindcare-popup");
    if (oldPopup) {
        oldPopup.remove();
    }

    let color = "#4CAF50";

    if (riskLevel === "Medium")
        color = "#ff9800";

    if (riskLevel === "High")
        color = "#f44336";


    const popup = document.createElement("div");
    popup.id = "mindcare-popup";

    popup.innerHTML = `

    <div style="
    position:fixed;
    bottom:25px;
    right:25px;
    width:340px;
    background:white;
    border-radius:14px;
    padding:20px;
    z-index:9999;
    font-family:Arial, sans-serif;
    box-shadow:0 8px 25px rgba(0,0,0,0.2);
    border-left:6px solid ${color};
    ">

        <h3 style="
        margin:0;
        font-size:18px;
        color:${color};
        display:flex;
        align-items:center;
        gap:6px;
        ">
        🧠 MindCare
        </h3>

        <p style="
        margin-top:12px;
        font-size:14px;
        line-height:1.5;
        color:#444;
        ">
        ${message}
        </p>

        <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-top:18px;
        ">

            <a href="https://mindcare-help.vercel.app"
            target="_blank"
            style="
            text-decoration:none;
            background:${color};
            color:white;
            padding:7px 14px;
            border-radius:6px;
            font-size:13px;
            ">
            Get Help
            </a>

           <button id="closePopup"
style="
background:#eee;
color:#333;
border:none;
padding:7px 14px;
border-radius:6px;
cursor:pointer;
font-size:13px;
display:flex;
align-items:center;
justify-content:center;
">
Close
</button>

        </div>

    </div>
    `;

    document.body.appendChild(popup);

    document.getElementById("closePopup").onclick = function () {
        popup.remove();
    };
}


/* =========================
   TEXT DETECTION
========================= */

let lastText = "";
let typingTimer;

const observer = new MutationObserver((mutations) => {

    mutations.forEach((mutation) => {

        let target = mutation.target;

        if (target.nodeType === Node.TEXT_NODE) {
            target = target.parentElement;
        }

        if (!target || target.nodeType !== Node.ELEMENT_NODE) return;

        const editableElement = target.closest('[contenteditable="true"], textarea, input[type="text"], input[type="search"]');

        if (editableElement && (mutation.type === 'characterData' || mutation.type === 'childList')) {

            let text = editableElement.textContent || editableElement.innerText || "";
            text = String(text).trim();

            if (text.length < 4 || text === lastText) return;

            lastText = text;

            clearTimeout(typingTimer);

            typingTimer = setTimeout(() => {

                console.log("Sending text:", text);

                /* SEND TEXT TO BACKGROUND SCRIPT */

                chrome.runtime.sendMessage(
                    { text: text },
                    function (response) {

                        console.log("Prediction:", response);

                        if (!response) return;

                        if (response.risk === "High") {

                            showPopup(
                                "Your message shows signs of emotional distress. Consider talking to someone you trust.",
                                "High"
                            );

                        }
                        else if (response.risk === "Medium") {

                            showPopup(
                                "You may be feeling stressed. Take care of yourself and reach out if needed.",
                                "Medium"
                            );

                        }

                    }
                );

            }, 1000);
        }

    });

});


observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
});