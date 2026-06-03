// Internationalization — auto-detects device language, but can be overridden from settings.
const _detectedLang = (navigator.language || navigator.languages?.[0] || 'en').toLowerCase();
const _defaultLanguage = _detectedLang.startsWith('fr') ? 'fr' : 'en';

window.getCurrentLanguage = function getCurrentLanguage() {
    if (typeof window.App !== 'undefined' && window.App?.settings?.language) {
        return window.App.settings.language;
    }
    return _defaultLanguage;
};

window._isFrench = function _isFrench() {
    return window.getCurrentLanguage() === 'fr';
};

const FR = {
    // ── Boutons génériques ──────────────────────────────────────
    'OK': 'OK',
    'YES': 'Oui',
    'NO': 'Non',
    'CANCEL': 'Annuler',
    'ACCEPT': 'Accepter',
    'BACK': 'Retour',
    'CONTINUE': 'Continuer',
    'CONTINUE (UNSAFE)': 'Continuer (risqué)',
    'CLOSE': 'Fermer',
    'NEXT': 'Suivant',
    'APPLY': 'Appliquer',
    'ENTER': 'Entrer',
    'RELOAD': 'Recharger',
    'REMOVE': 'Supprimer',
    'RESET': 'Réinit.',
    'SEND': 'Envoyer',
    'INVITE': 'Inviter',
    'INSTALL': 'Installer',
    'EXPORT': 'Exporter',
    'COPY': 'Copier',
    'UNINSTALL': 'Désinstaller',
    'TRACK': 'Suivre',
    'START': 'Commencer',
    'SET': 'Valider',
    'RATE!': 'Évaluer !',
    'YES ($100)': 'Oui (100$)',
    'YES (DELETE)': 'Oui (supprimer)',
    'YES, MOVE OUT': 'Oui, déménager',
    'OK, I COPIED': 'OK, copié',

    // ── Menu principal ──────────────────────────────────────────
    'STATS': 'Stats',
    'FEEDING': 'Nourrir',
    'BATH': 'Bain',
    'CARE': 'Soin',
    'ACTIVITY': 'Activités',
    'STUFF': 'Objets',
    'PHONE': 'Téléphone',
    'SETTINGS': 'Réglages',

    // ── Soins ──────────────────────────────────────────────────
    'FOOD': 'Nourriture',
    'SNACKS': 'Snacks',
    'BATHE': 'Baigner',
    'BRUSH TEETH': 'Brosser les dents',
    'CLEAN ROOM': 'Nettoyer la chambre',
    'USE TOILET': 'Toilettes',
    'MEDS': 'Médicaments',
    'DOCTOR VISIT': 'Médecin',
    'PET GROOMING': 'Toilettage',
    'PAT! PAT! PAT!': 'Câlin !',

    // ── Activités extérieures ──────────────────────────────────
    'HOME': 'Maison',
    'MALL': 'Centre commercial',
    'MARKET': 'Marché',
    'GAME CENTER': 'Salle d\'arcade',
    'HOMEWORLD GETAWAYS': 'Voyages Homeworld',
    'FORTUNE TELLER': 'Voyante',
    'PARK': 'Parc',
    'POST OFFICE': 'Poste',
    'RESTAURANT': 'Restaurant',
    'SCHOOL': 'École',
    'BACKYARD': 'Jardin',
    'GARDEN': 'Jardin',
    'YOUR HOME': 'Ta maison',
    'WITH A FRIEND': 'Avec un ami',
    'HANG OUT': "Sortir",
    'WHERE TO HANG OUT?': 'Où sortir ?',
    'GO ON DATE': 'Rendez-vous amoureux',
    'GO ON VACATION': 'Partir en vacances',
    'THE BEACH': 'La plage',
    'THE MALL': 'Le centre commercial',
    'FRIEND\'S HOME': "Chez un ami",
    'EXPLORE ALIEN FOREST': 'Forêt alien',
    'RELAX IN NEBULA SPA': 'Spa nébula',
    'ATTEND CONCERT': 'Concert',
    'GO TO COFFEE SHOP': 'Café',
    'GO TO MOVIES': 'Cinéma',
    'GO TO RESTAURANT': 'Restaurant',
    'GO TO STARLIGHT DISCO': 'Disco Starlight',
    'VISIT FOOD FESTIVAL': 'Festival gastronomique',
    'VISIT LIBRARY': 'Bibliothèque',
    'VISIT MUSEUM': 'Musée',
    'VISIT THEME PARK': 'Parc d\'attractions',
    'HAVE SLEEPOVER': 'Soirée pyjama',
    'STAY WITH PARENTS': 'Rester chez les parents',
    'ENTER UNDERWORLD': 'Les enfers',
    'UNDERWORLD ENTRANCE': 'Entrée des enfers',
    'WORK': 'Travailler',
    'OFFICE WORK': 'Bureau',
    'STAND WORK': 'Travailler au stand',
    'COOK': 'Cuisiner',
    'CRAFT': 'Fabriquer',
    'PLAY BURNOUT': 'Jouer au burnout',

    // ── Mini-jeux ──────────────────────────────────────────────
    'FLIP CARDS': 'Retourner les cartes',
    'CROP MATCH': 'Correspond. cultures',
    'GUESS GAME (WIP)': 'Jeu de devinettes',
    'ROD RUSH': 'Course de cannes',
    'TUNE PRACTICE': 'Pratique musicale',
    'MIMIC': 'Imiter',
    'CATCH': 'Attraper',
    'SKIPPING ROPE': 'Corde à sauter',

    // ── Social ──────────────────────────────────────────────────
    'SOCIAL MEDIA': 'Réseaux sociaux',
    'FRIENDS': 'Amis',
    'FIND FRIENDS': 'Trouver des amis',
    'ADD FRIEND': 'Ajouter un ami',
    'UNFRIEND': 'Retirer un ami',
    'FRIEND CODES': 'Codes amis',
    'MAKE POST': 'Publier',
    'EXPLORE POSTS': 'Voir publications',
    'SEND MESSAGE': 'Envoyer un message',
    'PROFILE': 'Profil',
    'INVITE': 'Inviter',
    'JOIN (+$200)': 'Rejoindre (+200$)',
    'SEND FEEDBACK': 'Donner un avis',

    // ── Objets / Boutique ──────────────────────────────────────
    'ITEMS': 'Objets',
    'SHOP': 'Boutique',
    'OPEN SHOP': 'Ouvrir la boutique',
    'SELL': 'Vendre',
    'GIFT': 'Cadeau',
    'FURNITURE': 'Meubles',
    'ACCESSORIES': 'Accessoires',
    'LEAVES': 'Feuilles',
    'SHELLS': 'Coquillages',
    'PURCHASE SEEDS': 'Acheter des graines',
    'COLLECTION': 'Collection',
    'HARVESTS': 'Récoltes',
    'CAMERA': 'Appareil photo',
    'MODS': 'Mods',

    // ── Paramètres ─────────────────────────────────────────────
    'SYSTEM SETTINGS': 'Paramètres système',
    'GAMEPLAY SETTINGS': 'Paramètres de jeu',
    'SHELL SETTINGS': 'Régl. coque',
    'SAVE MANAGEMENT': 'Sauvegarde',
    'CHANGE THEME': 'Changer le thème',
    'CUSTOM SHELL': 'Coque personnalisée',
    'BACK COLOR': 'Couleur du fond',
    'SLEEPING HOURS': 'Heures de sommeil',
    'NOTIFICATIONS': 'Notifications',
    'LANGUAGE': 'Langue',
    'ENGLISH': 'Anglais',
    'FRENCH': 'Français',
    'APPEARANCE': 'Apparence',
    'NOTIFICATIONS IPHONE': 'Notifications iPhone',
    'SYSTEME': 'Système',
    'ALERTES PLANTES': 'Alertes plantes',
    'ACTIVE': 'Actif',
    'INACTIVE': 'Inactif',
    'ON': 'Activé',
    'OFF': 'Désactivé',
    'INSTALL APP': 'Installer l\'app',
    'CREDITS': 'Crédits',
    'RATE!': 'Évaluer !',
    '+ VIEW SIZE': '+ Taille',
    '- VIEW SIZE': '- Taille',
    'RESET VIEW SIZE': 'Réinit. taille',
    '+ SHELL SIZE': '+ Taille coque',
    '- SHELL SIZE': '- Taille coque',
    'RESET SHELL SIZE': 'Réinit. coque',
    'VIEW ERROR': 'Voir l\'erreur',
    'INPUT CODE': 'Saisir un code',
    'GET CODE': 'Obtenir le code',
    'FROM CLIPBOARD': 'Presse-papiers',
    'EVENTSHISTORY': 'Historique',
    'FACTORY RESET': 'Reset total',
    'RESET PET DATA': 'Reset données',
    'USER': 'Utilisateur',
    'INFO': 'Info',
    'ENTER URL': 'Saisir une URL',

    // ── Arbre généalogique / famille ───────────────────────────
    'FAMILY TREE': 'Arbre généalogique',
    'PAST GENERATIONS': 'Gén. passées',
    'SELECT THE GENERATION': 'Choisir génération',
    'NEXT EVOLUTION': 'Prochaine évolution',
    'OFFSPRING WITH ...': 'Descendants avec...',
    'AS ACTIVE PET': 'Comme animal actif',
    'HAVE BIRTHDAY': 'Fêter l\'anniversaire',
    'HAPPY BIRTHDAY!': 'Joyeux anniversaire !',

    // ── Caractéristiques / traits ──────────────────────────────
    'ALONE': 'Solitaire',
    'ARTISTIC': 'Artistique',
    'ATHLETIC': 'Athlétique',
    'BOTANIST': 'Botaniste',
    'CHARISMATIC': 'Charismatique',
    'CHILL': 'Détendu',
    'COMPUTER WHIZ': 'As de l\'informatique',
    'DEEP SLEEPER': 'Gros dormeur',
    'DUST MAGNET': 'Aimant à poussière',
    'EXPRESSIVE': 'Expressif',
    'FARM-TO-TABLE CHEF': 'Chef circuit court',
    'FLAGBEARER': 'Porte-drapeau',
    'GERM GUARDIAN': 'Anti-germes',
    'GIFTSPREADER': 'Généreux',
    'GRUMPY': 'Grincheux',
    'HARD WORKER': 'Bourreau de travail',
    'HEARTBREAKER': 'Séducteur',
    'INTERIOR DESIGNER': 'Décorateur d\'intérieur',
    'INTROVERT': 'Introverti',
    'IRON BLADDER': 'Vessie de fer',
    'LIGHT EATER': 'Petit appétit',
    'LOGICAL': 'Logique',
    'LUCKY': 'Chanceux',
    'MASTER OF THE FLUFF': 'Maître du câlin',
    'MEMORY MAESTRO': 'As de la mémoire',
    'MONEY CATCHER': 'Attrape-argent',
    'MONEY SAVER': 'Économe',
    'NATURAL CHEF': 'Cuisinier naturel',
    'PERFECT IMITATOR': 'Imitateur parfait',
    'PLENTY HARVEST': 'Grande récolte',
    'PROPER': 'Distingué',
    'RESILIENT': 'Résilient',
    'RESTLESS': 'Agité',
    'ROMANTIC': 'Romantique',
    'SEAFLOOR SOFA': 'Canapé fond marin',
    'SELF-CLEANING': 'Autonettoyant',
    'SERIAL MARRIER': 'Marié(e) en série',
    'SHOPAHOLIC': 'Accro du shopping',
    'SIGHTSEE-ER': 'Touriste',
    'SLOW LEARNER': 'Apprentissage lent',
    'STARRY': 'Étoilé',
    'THINKER': 'Penseur',
    'TOILET MASTER': 'Maître des toilettes',
    'TREASURER': 'Trésorier',
    'VORACIOUS HUNGER': 'Faim vorace',
    'WORKAHOLIC': 'Accro au travail',

    // ── Messages ───────────────────────────────────────────────
    'PET': 'Animal',
    'CURRENT WANT': 'Désir actuel',
    'LOADING...': 'Chargement...',
    'NEW UPDATE IS AVAILABLE!': 'Une nouvelle mise à jour est disponible !',
    'CHECK OUT THE NEW': 'Découvre le nouveau',
    'POST OFFICE LOCATION': 'lieu Poste',
    'FUNCTIONAL BUTTONS': 'boutons fonctionnels',
    'GUESS THE NUMBER MINI-GAME': 'mini-jeu Devine le nombre',
    'TOOTHACHES': 'maux de dents',
    'AND A LOT MORE!': 'et bien plus encore !',
    'SEE WHATS NEW': 'voir les nouveautés',
    'HERE YOU\'LL BE ABLE TO COPY YOUR UNIQUE SAVE CODE AND CONTINUE YOUR PLAYTHROUGH ON ANOTHER DEVICE': 'Ici, tu pourras copier ton code de sauvegarde unique et continuer ta partie sur un autre appareil.',
    'AFTER COPYING THE CODE, OPEN TAMAWEB ON ANOTHER DEVICE AND PASTE THE CODE IN SETTINGS > INPUT CODE': 'Après avoir copié le code, ouvre Tamaweb sur un autre appareil et colle-le dans Réglages > Saisir un code.',
    'SAVE CODE COPIED!': 'Code de sauvegarde copié !',
    'COPY YOUR SAVE CODE FROM THE BOX BELOW:': 'Copie ton code de sauvegarde depuis le champ ci-dessous :',
    'STARTS WITH': 'commence par',
    'AND ENDS WITH': 'et se termine par',
    'DO YOU WANT TO INSTALL TAMAWEB AS AN APP?': 'Veux-tu installer <b>Tamaweb</b> comme application ?',
    'YOU CAN INSTALL THE GAME AS AN APP ANYTIME FROM THE SETTINGS': 'Tu peux installer le jeu comme application à tout moment depuis les <b>réglages</b>.',
    'ANYONE WANNA TALK? #BORED': 'Quelqu’un veut discuter ? #ennui',
    'NOT FEELING TOO GOOD... #TUMMYACHE': 'Je ne me sens pas très bien... #maldeventre',
    'ATE WAY TOO MUCH SNACKS... #TOOTHACHE': 'J’ai mangé beaucoup trop de snacks... #maldedents',
    'FLAGS': 'Drapeaux',
    'EDIT POSITION': 'Modifier la position',
    'EDIT': 'Modifier',
    'PLACE UP TO 5 FURNITURE ITEMS OF YOUR CHOOSING IN CUSTOMIZABLE ROOMS.': 'Place jusqu\'à 5 meubles dans les pièces personnalisables.',
    'SHOP STOCK CHANGES DAILY, SO CHECK BACK OFTEN FOR NEW OFFERS!': 'Le stock change chaque jour, reviens souvent !',
    '★ SYMBOL INDICATES THE ITEM IS ONLY OBTAINABLE FROM COOKING AND HAS SPECIAL EFFECT(S)': '★ Obtenu uniquement par la cuisine, effets spéciaux.',
    'YOU CAN GET BUFFS BY ADOPTING ANIMALS IN THE BACKYARD!': 'Adopte des animaux dans le jardin pour obtenir des bonus !',
    'YOU CAN SELL SPECIAL ITEMS (★) FOR MORE THAN THE MARKET PRICE': 'Vends les objets spéciaux (★) au-dessus du prix du marché.',
    'INSTALLING / UNINSTALLING MODS WILL REFRESH THE GAME.': 'Installer/désinstaller des mods relancera le jeu.',
    'UNDERWORLD TICKETS': 'Tickets des enfers',

    // ── Divin / sorts ──────────────────────────────────────────
    'BLESS': 'Bénir',
    'SCARE': 'Effrayer',
    'GRANT WISH': 'Exaucer un vœu',
    'GIFT DIVINITY': 'Don divin',
    'PLACE CURSE': 'Malédiction',
    'WHISPER': 'Chuchoter',
};

/**
 * Translate a string (or HTML string) to the device language.
 * Translates only the plain-text segments — leaves HTML tags intact.
 */
window.t = function t(str) {
    if (!window._isFrench() || typeof str !== 'string' || !str) return str;

    // Fast path: full match (common for plain-text names)
    const upper = str.trim().toUpperCase();
    if (FR[upper]) return FR[upper];

    // Slow path: replace text nodes inside HTML strings
    // Matches text between > and < (or start/end of string)
    return str.replace(/(^|>)([^<]+)(<|$)/g, (_, before, text, after) => {
        const key = text.trim().toUpperCase();
        const translated = FR[key];
        if (translated) {
            return before + text.replace(text.trim(), translated) + after;
        }
        return _;
    });
};
