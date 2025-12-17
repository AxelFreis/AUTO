# Configuration du Back-Office Admin

## Création de l'organisation et de l'utilisateur admin

### 1. Créer une organisation

Exécutez cette requête SQL dans Supabase SQL Editor:

```sql
INSERT INTO organizations (name)
VALUES ('Mon Entreprise Detailing')
RETURNING id;
```

Notez l'ID retourné (ex: `550e8400-e29b-41d4-a716-446655440000`).

### 2. Créer un utilisateur admin

Dans l'interface Supabase Authentication, créez un nouvel utilisateur avec:
- Email: `admin@example.com`
- Password: `admin123`

### 3. Ajouter les métadonnées admin

Une fois l'utilisateur créé, exécutez cette requête (remplacez `USER_ID` et `ORG_ID`):

```sql
UPDATE auth.users
SET
  raw_app_metadata = jsonb_set(
    jsonb_set(
      COALESCE(raw_app_metadata, '{}'::jsonb),
      '{role}',
      '"admin"'
    ),
    '{org_id}',
    '"550e8400-e29b-41d4-a716-446655440000"'
  )
WHERE id = 'USER_ID_HERE';
```

### 4. Données de test (optionnel)

#### Créer quelques prestations

```sql
INSERT INTO services (org_id, name, type, duration, base_price, description)
VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'Nettoyage Intérieur Complet', 'interior', 90, 65.00, 'Nettoyage approfondi de l''habitacle'),
  ('550e8400-e29b-41d4-a716-446655440000', 'Lavage Extérieur Premium', 'exterior', 60, 45.00, 'Lavage extérieur avec cire de protection'),
  ('550e8400-e29b-41d4-a716-446655440000', 'Detailing Complet', 'complete', 180, 150.00, 'Prestation intérieure et extérieure complète'),
  ('550e8400-e29b-41d4-a716-446655440000', 'Polissage et Correction', 'polishing', 240, 250.00, 'Correction des défauts de peinture et polissage');
```

#### Créer un client et une réservation

Créez d'abord un utilisateur client dans Supabase Authentication:
- Email: `client@example.com`
- Password: `client123`

Puis créez une réservation (remplacez `USER_ID`, `ORG_ID`, et `SERVICE_ID`):

```sql
-- Exemple de réservation
INSERT INTO bookings (
  org_id,
  user_id,
  service_id,
  date,
  time,
  location_type,
  address,
  status,
  estimated_price
)
VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  'CLIENT_USER_ID',
  'SERVICE_ID',
  CURRENT_DATE + INTERVAL '3 days',
  '14:00',
  'home',
  '123 Rue de la Paix, 75001 Paris',
  'pending',
  65.00
);
```

#### Créer une facture

```sql
-- Exemple de facture (remplacez BOOKING_ID, USER_ID, ORG_ID)
INSERT INTO invoices (
  org_id,
  booking_id,
  user_id,
  invoice_number,
  amount,
  status,
  issued_at
)
VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  'BOOKING_ID',
  'CLIENT_USER_ID',
  'INV-2024-001',
  65.00,
  'pending',
  NOW()
);
```

## Connexion

1. Accédez à `/login-admin`
2. Connectez-vous avec:
   - Email: `admin@example.com`
   - Password: `admin123`
3. Vous serez redirigé vers le dashboard admin

## Fonctionnalités testables

### Dashboard
- Visualisez les KPIs: nombre de demandes, réservations, CA, prestations du jour
- Consultez le graphique du CA mensuel

### Prestations
- Créez une nouvelle prestation via le bouton "Ajouter une prestation"
- Modifiez une prestation existante
- Supprimez une prestation

### Clients
- Consultez la liste des clients
- Voyez le nombre de réservations par client

### Planning
- Consultez les réservations à venir et terminées
- Changez le statut d'une réservation (Confirmer, En cours, Terminé, Annulé)

### Facturation
- Filtrez les factures par mois/année
- Générez un PDF pour une facture
- Marquez une facture comme payée
- Envoyez un rappel de paiement

## Dépannage

### Impossible de se connecter
- Vérifiez que l'utilisateur a bien `app_metadata.role = 'admin'`
- Vérifiez que `app_metadata.org_id` est défini

### Aucune donnée affichée
- Vérifiez que les RLS policies sont bien appliquées
- Vérifiez que `org_id` correspond dans toutes les tables
- Consultez les logs Supabase pour les erreurs

### Erreurs de build
- Exécutez `npm install` pour installer toutes les dépendances
- Vérifiez que recharts est bien installé
- Exécutez `npm run build` pour vérifier la compilation

## Support

Pour toute question ou problème, consultez:
- Le README dans `src/features/admin/README.md`
- La documentation Supabase
- Les logs de la console navigateur
