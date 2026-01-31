// Gestion de l'authentification avec hash
const PASSWORD_HASH = "e73b79a0b10f8cdb6ac7dbe4c0a5e25776e1148784b86cf98f7d6719d472af69";

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const passwordInput = document.getElementById("password").value;
            const hash = await sha256(passwordInput);
            
            if (hash === PASSWORD_HASH) {
                // Authentification réussie
                document.getElementById("login-section").style.display = "none";
                document.getElementById("setup").style.display = "block";
            } else {
                // Échec
                alert("Mot de passe incorrect !");
                document.getElementById("password").value = "";
            }
        });
    }
});

async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}
