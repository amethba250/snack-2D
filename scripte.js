let panier = [];

// Ajouter au panier
function ajouterAuPanier(btn) {
    let nom = btn.getAttribute("data-nom");
    let prix = parseInt(btn.getAttribute("data-prix"));

    let existant = panier.find(item => item.nom === nom);

    if (existant) {
        existant.quantite += 1;
    } else {
        panier.push({ nom: nom, prix: prix, quantite: 1 });
    }

    afficherPanier();
}

// Afficher panier
function afficherPanier() {
    let liste = document.getElementById("listePanier");
    let total = 0;
    let totalQuantite = 0;

    liste.innerHTML = "";

    panier.forEach(item => {
        let li = document.createElement("li");

        li.innerHTML = `
            ${item.nom} x${item.quantite} - ${item.prix * item.quantite} FCFA
            <button onclick="supprimerDuPanier('${item.nom}')"
                style="margin-left:10px; background:red; color:white; border:none; border-radius:4px;">
                ❌
            </button>
        `;

        liste.appendChild(li);

        total += item.prix * item.quantite;
        totalQuantite += item.quantite;
    });

    document.getElementById("total").textContent = total + " FCFA";

    let badge = document.getElementById("badgePanier");
    badge.textContent = totalQuantite;

    if (totalQuantite === 0) {
        badge.style.display = "none";
    } else {
        badge.style.display = "inline-block";
    }
}

// Supprimer article
function supprimerDuPanier(nom) {
    panier = panier.filter(item => item.nom !== nom);
    afficherPanier();
}

// Commander WhatsApp
function commanderWhatsApp() {
    if (panier.length === 0) {
        alert("Votre panier est vide !");
        return;
    }

    let message = "Bonjour, je souhaite commander :\n";
    let total = 0;

    panier.forEach(item => {
        message += `- ${item.nom} x${item.quantite}\n`;
        total += item.prix * item.quantite;
    });

    message += `Total : ${total} FCFA`;

    let numero = "221773625905";
    let url = "https://wa.me/" + numero + "?text=" + encodeURIComponent(message);

    window.open(url, "_blank");
}

// Toggle panier
function togglePanier() {
    let overlay = document.getElementById("panierOverlay");

    if (overlay.style.display === "none" || overlay.style.display === "") {
        overlay.style.display = "block";
    } else {
        overlay.style.display = "none";
    }
}

// Cacher badge au chargement
window.onload = function () {
    document.getElementById("badgePanier").style.display = "none";
};


document.addEventListener('DOMContentLoaded', () => {
const cards = document.querySelectorAll('.menu-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // stop observer after animation
            }
        });
    }, {
        threshold: 0.2 // déclenche quand 20% de la carte est visible
    });

    cards.forEach(card => observer.observe(card));
});
