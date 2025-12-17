# Back-office Admin - Detailing Auto

Ce module fournit une interface d'administration complète pour gérer votre activité de detailing automobile.

## Structure

```
admin/
├── components/          # Composants réutilisables de l'admin
│   ├── AdminLayout.tsx  # Layout principal avec header et navbar
│   ├── AdminHeader.tsx  # En-tête avec logout
│   └── AdminNavbar.tsx  # Navigation bottom bar
├── hooks/               # Hooks personnalisés
│   ├── useAdminGuard.ts # Protection des routes admin
│   ├── useAdminStats.ts # Statistiques du dashboard
│   ├── useServices.ts   # CRUD des prestations
│   ├── useBookings.ts   # Gestion des réservations
│   ├── useClients.ts    # Liste des clients
│   └── useInvoices.ts   # Gestion de la facturation
├── models/              # Types et schemas
│   ├── types.ts         # Interfaces TypeScript
│   └── schemas.ts       # Schemas de validation Zod
├── pages/               # Pages de l'application
│   ├── LoginAdminPage.tsx          # Connexion admin
│   ├── DashboardPage.tsx           # Tableau de bord avec KPIs
│   ├── PrestationsListPage.tsx    # Liste des prestations
│   ├── PrestationFormPage.tsx     # Création/édition prestation
│   ├── ClientsPage.tsx             # Liste des clients
│   ├── PlanningPage.tsx            # Planning des réservations
│   └── FacturationPage.tsx         # Gestion des factures
└── services/            # Services et logique métier
    ├── auth.ts          # Authentification admin (Zustand)
    ├── stats.ts         # Calcul des statistiques
    ├── prestations.ts   # CRUD des services
    ├── bookings.ts      # Gestion des réservations
    ├── clients.ts       # Récupération des clients
    └── invoices.ts      # Gestion des factures
```

## Routes

- `/login-admin` - Page de connexion
- `/admin` - Dashboard avec KPIs et graphique
- `/admin/prestations` - Liste des prestations
- `/admin/prestations/new` - Nouvelle prestation
- `/admin/prestations/:id` - Édition d'une prestation
- `/admin/clients` - Liste des clients
- `/admin/planning` - Planning des réservations
- `/admin/facturation` - Gestion des factures

## Fonctionnalités

### Dashboard
- Affichage des KPIs (demandes, réservations, CA, prestations du jour)
- Graphique du chiffre d'affaires mensuel (Recharts)

### Prestations
- Liste de toutes les prestations
- Création de nouvelles prestations avec validation
- Édition des prestations existantes
- Suppression des prestations
- Catégories : Intérieur, Extérieur, Complet, Polissage

### Clients
- Liste de tous les clients
- Affichage de l'email, téléphone (si disponible)
- Nombre de réservations par client

### Planning
- Vue des réservations à venir et terminées
- Gestion des statuts (En attente, Confirmé, En cours, Terminé, Annulé)
- Actions rapides pour changer le statut

### Facturation
- Liste des factures avec filtres (mois/année)
- Affichage du statut (Payé / En attente)
- Génération de PDF
- Envoi de rappels de paiement
- Export groupé des factures

## Authentification

L'accès à l'admin nécessite:
- Un utilisateur avec `app_metadata.role = 'admin'`
- Un `app_metadata.org_id` valide

La protection est assurée par le hook `useAdminGuard` qui vérifie ces conditions.

## Sécurité (RLS)

Les politiques de sécurité Supabase garantissent:
- Isolation multi-tenant via `org_id`
- Seuls les admins peuvent créer/modifier/supprimer les données
- Les clients ne voient que leurs propres réservations et factures

## Technologies

- React + TypeScript
- React Router pour la navigation
- TanStack Query pour le state management serveur
- Zustand pour l'état d'authentification
- Zod pour la validation des formulaires
- Recharts pour les graphiques
- Supabase pour la base de données
- Tailwind CSS pour le styling

## Configuration initiale

Pour tester l'admin, vous devez:
1. Créer une organisation dans Supabase
2. Créer un utilisateur admin avec les metadata appropriées
3. Vous connecter via `/login-admin`

## Notes

- Le code client existant n'a pas été modifié
- Tous les nouveaux fichiers sont dans `features/admin/`
- Design mobile-first avec thème sombre et accent rouge
- Gestion complète des états: loading, error, empty
