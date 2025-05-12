# Tilvio Tiles Manager

## Overview
Tilvio is a system for managing product orders, pricing, and manufacturer relationships with precision and flexibility. Designed for B2B and retail use cases like tile distribution or construction supply, Tilvio supports dynamic pricing based on manufacturer-defined weight tiers and ensures accurate order totals through centralized logic.

✨ Features
✅ Order Management — Track orders and their associated items with relational integrity.

⚖️ Weight-Based Pricing Tiers — Automatically calculate prices based on product weight ranges.

🔒 Backend-Verified Totals — Ensure pricing consistency and prevent client-side tampering.

🔍 Synonym Support — Normalize search and categorization using mapped synonyms.

Tilvio is designed with extensibility in mind and is well-suited for teams who need a scalable and secure pricing model across multiple suppliers and product variations.

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS 4
- **Authentication**: Clerk
- **Routing**: React Router
- **State Management**: React Context API
- **Backend**: Golang, Chi
- **Database**: Postgres, Gorm

## Prerequisites

Before you begin, ensure you have the following installed:


### Frontend

- Node.js (v22.0.0 or higher, recommended v22.11.0)
- npm (v11.0.0 or higher, recommended v11.2.0) or yarn


### Backend 

- Golang (v1.23.4 or higher)
- Chi (v5.2.1 or higher)
- Postgres (v15.4 or higher)
- Redis (v7.2.0 or higher)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/tilvio.git
   cd tilvio
   ```

2. Install dependencies:

   ```bash
   npm install
   cd frontend && npm install
   # or
   yarn
   ```

3. Configure environment variables:
   ### Frontend
   cd frontend
      Create a `.env` file in the root directory and add the necessary environment variables:

      ```
      VITE_API_URL=your_api_url
      VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
      ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```


## Support and Feedback

For support, feature requests, or feedback, please contact:

- Email: support@tilvio.com
- Phone: +234-8067177670
- Website: https://tilvio.com/support
