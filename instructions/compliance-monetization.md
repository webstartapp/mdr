# Compliance and Monetization: GP Webpay Integration

This document outlines the monetization strategy and technical implementation for the MDR Regulation Adviser using GP Webpay.

## 1. Monetization Model: "Pro" Features
The application uses a **one-time payment** model to unlock "Pro" features.
- **Public**: Basic MDR information and landing pages.
- **User**: Registered users get access to basic gap analysis and saving progress.
- **Pro**: Paid users get advanced QMS templates, AI-powered classification deep dives, and technical file generation.

## 2. GP Webpay Integration
All payments are processed via **GP Webpay**.

### Payment Flow
1. **Initiation**: User clicks "Upgrade to Pro" in the `(user)` dashboard.
2. **Request**: The backend creates a payment request via GP Webpay API, generating a unique `ORDER_NUMBER`.
3. **Redirect**: User is redirected to the GP Webpay secure payment gateway.
4. **Callback**: GP Webpay sends an asynchronous HTTP POST notification to our backend (`/api/payments/callback`).
5. **Success Page**: User is redirected back to the `(pro)` confirmation page.

### Security
- **Merchant ID**: Must be stored in `GP_WEB_PAY_MERCHANT_ID` environment variable.
- **Private Key**: Use the `.pem` file provided by GP Webpay.
- **Digital Signature**: Every request and response must be signed/verified using the merchant's private key and GP Webpay's public key.

## 3. User State Update
- Upon successful payment verification, the user's `isPro` flag in the database must be set to `true`.
- The frontend should immediately reflect this change via a global state update or page refresh for the `(pro)` route group access.

## 4. Refund Policy
- Manual refund processing via the GP Webpay Merchant Portal.
- Status updates must be synced to the database if a refund is issued.
