// ===== PRODUITS =====
const produits = [
    { id: 1, nom: "Cahier A5", prix: 12.50, disponible: true, image: "https://placehold.co/300x200/3B82F6/FFFFFF?text=Cahier" },
    { id: 2, nom: "Stylo plume", prix: 8.90, disponible: true, image: "https://placehold.co/300x200/22C55E/FFFFFF?text=Stylo" },
    { id: 3, nom: "Sac à dos", prix: 45.00, disponible: true, image: "https://placehold.co/300x200/F59E0B/FFFFFF?text=Sac" },
    { id: 4, nom: "Lampe LED", prix: 22.00, disponible: false, image: "https://placehold.co/300x200/EF4444/FFFFFF?text=Lampe" },
    { id: 5, nom: "Tasse personnalisée", prix: 15.50, disponible: true, image: "https://placehold.co/300x200/8B5CF6/FFFFFF?text=Tasse" }
];

// ===== PANIER =====
let panier = [];
let compteur = 0;

// ===== AFFICHAGE PRODUITS =====
const grille = document.getElementById('grille-produits');

function afficherProduits() {
    grille.innerHTML = '';
    produits.forEach(p => {
        const carte = document.createElement('div');
        carte.className = 'carte-produit';
        carte.innerHTML = `
            <img src="${p.image}" alt="${p.nom}" />
            <div class="infos">
                <h3>${p.nom}</h3>
                <div class="prix">${p.prix.toFixed(2)} TND</div>
                <span class="statut ${p.disponible ? 'disponible' : 'indisponible'}">
                    ${p.disponible ? '✅ Disponible' : '❌ Rupture'}
                </span>
                <button class="btn-ajouter" onclick="ajouterPanier(${p.id})" ${!p.disponible ? 'disabled' : ''}>
                    ${p.disponible ? '🛒 Ajouter' : '⛔ Non dispo'}
                </button>
            </div>
        `;
        grille.appendChild(carte);
    });
}

// ===== AJOUTER AU PANIER =====
function ajouterPanier(id) {
    const produit = produits.find(p => p.id === id);
    if (!produit || !produit.disponible) return;

    const existant = panier.find(p => p.id === id);
    if (existant) {
        existant.quantite++;
    } else {
        panier.push({ ...produit, quantite: 1 });
    }

    compteur = panier.reduce((sum, p) => sum + p.quantite, 0);
    document.getElementById('compteur-panier').textContent = compteur;
}

// ===== OUVRIRE / FERMER PANIER =====
function ouvrirPanier() {
    document.getElementById('modal-panier').classList.add('ouvert');
    afficherPanier();
}

function fermerPanier() {
    document.getElementById('modal-panier').classList.remove('ouvert');
}

// ===== AFFICHER PANIER =====
function afficherPanier() {
    const liste = document.getElementById('liste-panier');
    const totalEl = document.getElementById('total-panier');

    if (panier.length === 0) {
        liste.innerHTML = '<p>Votre panier est vide.</p>';
        totalEl.textContent = 'Total : 0.00 TND';
        return;
    }

    let total = 0;
    liste.innerHTML = '';
    panier.forEach(p => {
        total += p.prix * p.quantite;
        const div = document.createElement('div');
        div.className = 'item-panier';
        div.innerHTML = `
            <span>${p.nom} x${p.quantite}</span>
            <span>${(p.prix * p.quantite).toFixed(2)} TND</span>
        `;
        liste.appendChild(div);
    });

    totalEl.textContent = `Total : ${total.toFixed(2)} TND`;
}

// ===== VALIDER COMMANDE =====
function validerPanier() {
    if (panier.length === 0) {
        alert('Votre panier est vide !');
        return;
    }
    alert('✅ Commande validée ! Merci pour votre achat.');
    panier = [];
    compteur = 0;
    document.getElementById('compteur-panier').textContent = '0';
    fermerPanier();
    afficherPanier();
}

// ===== FERMER LA MODALE EN CLIQUANT À CÔTÉ =====
document.getElementById('modal-panier').addEventListener('click', function(e) {
    if (e.target === this) fermerPanier();
});

// ===== LANCEMENT =====
afficherProduits();