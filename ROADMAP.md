# Roadmap — Futures évolutions

## Notifications locales (pas de serveur requis)

Au moment de fermer l'app, planifier des notifications iOS natives basées sur le taux de déplétion actuel des stats :

- Faim critique (`current_hunger <= 20`)
- Tamagotchi malade
- Réveil (heure de fin de sommeil configurée)
- Œuf sur le point d'éclore

**Stack :** Capacitor plugin `@capacitor/local-notifications` — pas de backend nécessaire.

---

## Notifications push (avec backend)

Pour des événements déclenchés en temps réel quand l'app est fermée :

- Mort imminente
- Évolution disponible
- Événement saisonnier

**Stack :** serveur Node + APNs (Apple Push Notification service) + enregistrement du device token au lancement.

---

## Widget iOS

Afficher l'état du tamagotchi (faim, santé, humeur) sur l'écran d'accueil sans ouvrir l'app.

**Stack :** Swift WidgetKit + partage de données via App Group (UserDefaults partagé entre l'app Capacitor et l'extension Widget).

---

## Live Activity (Dynamic Island / écran verrouillé)

Afficher une animation du tamagotchi en Direct Island quand une stat est critique.

**Stack :** Swift ActivityKit.

---

## Résolution native retina complète

Actuellement le canvas interne est 4× (384×384 sur iPhone 14). Pour aller jusqu'au rendu retina complet (3× DPR = 1152×1152 physiques) il faudrait :

1. Multiplier par `window.devicePixelRatio` en plus du scale actuel
2. Upscaler les spritesheets sources (actuellement 24×24px) en 2× ou 4×

Gain visuel : texte et sprites ultra-nets sur tous les écrans retina.

---

## Ratio portrait non-carré

Le canvas est actuellement 96×96 (carré). Adapter le moteur de scène pour un ratio 9:16 ou 3:4 remplirait mieux l'écran iPhone en portrait.

Implique de repositionner tous les éléments de scène et de revoir les backgrounds.

---

## Android

Le projet Capacitor supporte Android nativement (`npx cap add android`). Les sons M4A sont déjà compatibles. Principale adaptation : bouton retour Android.

---

## ⚠️ À vérifier — Fonctionnalités en ligne (Hubchi)

Toute la partie sociale passe par un **Google Apps Script** (`script.google.com`). Ce backend gère :

- Upload du tamagotchi sur Hubchi
- Exploration des tamagotchis d'autres joueurs
- Interactions entre joueurs

**Risque iOS :** Google Apps Script redirige vers `script.googleusercontent.com`. Les requêtes `fetch()` depuis un contexte `capacitor://localhost` peuvent échouer à cause des restrictions CORS sur les redirections cross-origin.

**Test à faire :** ouvrir Hubchi dans l'app et vérifier que la liste de tamagotchis se charge.

**Fix si ça ne marche pas :** ajouter dans `capacitor.config.json` :
```json
"server": {
  "allowNavigation": ["*.google.com", "*.googleusercontent.com"]
}
```
