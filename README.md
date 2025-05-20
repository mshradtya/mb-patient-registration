# Patient Registration App — Medblocks Final Task

A frontend-only patient registration application built using React, Vite, Shadcn UI, and PGlite. This project was developed as part of the final task round for the Software Engineer role at Medblocks.

## Features

- Register new patients using a form built with Shadcn UI
- Display all registered patients in a live-updating table
- Execute raw SQL queries through a query panel
- Persist patient data across page refreshes using IndexedDB
- Ensure synchronized usage across multiple browser tabs using a shared PGlite worker
- Implemented using Zod for validation and React Hook Form for form state management
- Clear commit history with each feature documented individually

## Live Demo

[View Deployed App (Vercel)](https://mb-patient-registration.vercel.app/)

## Tech Stack

- React with Vite
- PGlite for client-side SQL database
- @electric-sql/pglite/worker for multi-tab synchronization
- Shadcn UI for interface components
- Zod and react-hook-form for type-safe form handling

## Getting Started

```bash
# Clone the repository
git clone https://github.com/mshradtya/mb-patient-registration.git
cd mb-patient-registration

# Install dependencies
yarn install

# Run the development server
yarn dev
```

The app will be available at `http://localhost:5173`

## Using npm Instead of Yarn

If you prefer using `npm` as your package manager, use the following commands:

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

All scripts are defined in `package.json` and work the same way regardless of package manager.

## Project Structure

```
.
├── components/
│   ├── RegisterPatientForm.tsx
│   ├── PatientTable.tsx
│   └── RawQueryPanel.tsx
├── pglite-worker.js          # Shared worker for multi-tab synchronization
├── main.tsx
└── App.tsx
```

## Challenges Faced

- **Vite build configuration for workers**: Integrating the PGlite worker resulted in build issues due to Node-style imports. This was resolved by using a `.js` module for the worker and setting `type: "module"` in the Vite configuration.

- **TypeScript compatibility with PGliteWorker**: The standard instantiation of PGliteWorker did not expose the `.live` namespace in its type definition. This was addressed by using the `PGliteWorker.create()` static method, which correctly returns a typed instance.

## Build and Deployment

To create a production build:

```bash
yarn build
```

To preview the production build locally:

```bash
yarn preview
```

Deployment is done via Vercel. The application uses the `dist/` directory output from Vite as the deployment target.

## Task Checklist

- [x] Register new patients
- [x] Query records using raw SQL
- [x] Persist patient data across page refreshes
- [x] Support usage across multiple tabs
- [x] Ensure writes and reads are synchronized across tabs
- [x] Document each feature as a separate git commit
- [x] Provide setup and usage instructions
- [x] Deploy to a publicly accessible URL
- [x] Describe challenges faced during development

## Author

Aditya Mishra
[GitHub](https://github.com/mshradtya)
[LinkedIn](https://linkedin.com/in/mshradtya)
