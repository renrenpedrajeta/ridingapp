# Riding App - Test Credentials

This file contains all the static test credentials for the application. No database is required.

## User Login

Regular users/customers:

| Email              | Password   |
|--------------------|-----------|
| user@example.com   | User@123  |
| jane@example.com   | User@123  |
| mike@example.com   | User@123  |

**Quick Copy:**
```
Email: user@example.com
Password: User@123
```

---

## Rider Login

Delivery riders:

| Email              | Password    | Status    |
|--------------------|-------------|-----------|
| rider@example.com  | Rider@123  | Approved  |
| rider2@example.com | Rider@123  | Approved  |
| rider3@example.com | Rider@123  | Pending   |

**Quick Copy (Approved Rider):**
```
Email: rider@example.com
Password: Rider@123
```

**Quick Copy (Pending Rider - for testing approval flow):**
```
Email: rider3@example.com
Password: Rider@123
```

---

## Admin Login

Platform administrators:

| Email                  | Password    |
|------------------------|-------------|
| admin@example.com      | Admin@123  |
| superadmin@example.com | Admin@123  |

**Quick Copy:**
```
Email: admin@example.com
Password: Admin@123
```

---

## Vendor Login

Restaurant/store vendors:

| Email             | Password    | Business Name |
|-------------------|-------------|----------------|
| vendor@pizza.com  | Vendor@123 | Pizza Palace   |
| vendor@burger.com | Vendor@123 | Burger Station |

**Quick Copy:**
```
Email: vendor@pizza.com
Password: Vendor@123
```

---

## Additional Rider Details (for testing)

### Approved Rider #1 (rider@example.com)
- Name: Alex Chen
- Phone: +1111111111
- Vehicle: Honda CB150
- License Plate: ABC-1234
- License Number: DL-2024-001
- Bank: National Bank
- Account: 1234567890

### Approved Rider #2 (rider2@example.com)
- Name: Sarah Brown
- Phone: +2222222222
- Vehicle: Yamaha YZF
- License Plate: XYZ-5678
- License Number: DL-2024-002
- Bank: State Bank
- Account: 0987654321

### Pending Rider (rider3@example.com)
- Name: Tom Wilson
- Phone: +3333333333
- Vehicle: Kawasaki Ninja
- License Plate: DEF-9999
- License Number: DL-2024-003
- Bank: Private Bank
- Account: 1111222233334444

---

## How to Use

1. Navigate to the desired login page:
   - User Login: `/login`
   - Rider Login: `/rider/login`
   - Admin Login: `/admin/login`
   - Vendor Login: `/vendor/login`

2. Enter any of the credentials from the tables above

3. The app will authenticate using the static mock data from `src/data/mockData.ts`

---

## File Locations

- **Mock Data Definition:** `src/data/mockData.ts`
- **Auth Context:** `src/context/AuthContext.tsx`
- **Vendor Auth Context:** `src/context/VendorAuthContext.tsx`

## Notes

- No database connection is required for testing
- All credentials are hardcoded for development/testing purposes
- Passwords are included in the test data for obvious security reasons (dev only)
- User data persists in localStorage during the session
- The `rider3@example.com` user has `pending` verification status for testing the approval workflow
