# Lokum Meet Frontend

A modern event management platform built with Next.js, React, and TypeScript.

## Features

- 🔐 **Authentication** - Secure JWT-based authentication
- 📅 **Event Management** - Create, browse, and join events
- 🏢 **Institution Support** - Connect events with verified institutions
- 👥 **User Profiles** - Manage your profile and preferences
- 🎯 **Category Filtering** - Filter events by category
- 📱 **Responsive Design** - Works on all devices

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI**: React 19, Tailwind CSS
- **Components**: shadcn/ui
- **Authentication**: JWT tokens with HTTP-only cookies
- **API Client**: Custom fetch wrapper with error handling

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Backend API running on port 8080

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

The app will be available at `http://localhost:3000`.

## Project Structure

```
frontend/
├── app/                          # Next.js app directory
│   ├── login/                    # Login page
│   ├── register/                 # Registration page
│   ├── dashboard/                # Main dashboard
│   ├── profile/                  # User profile
│   ├── create-event/             # Create event page
│   ├── event/[id]/               # Event details page
│   ├── create-institution/       # Create institution page
│   └── actions/                  # Server actions
├── components/                   # React components
│   └── ui/                       # shadcn/ui components
├── lib/                          # Utility libraries
│   ├── api/                      # API client modules
│   │   ├── auth.ts              # Authentication API
│   │   ├── events.ts            # Events API
│   │   ├── event-attendees.ts   # Event attendees API
│   │   └── institutions.ts      # Institutions API
│   ├── fetch.ts                 # HTTP client
│   └── utils.ts                 # Utility functions
└── types/                        # TypeScript type definitions
    └── api.ts                    # API types
```

## API Integration

The frontend integrates with the Lokum Meet backend API. See [API_INTEGRATION.md](./API_INTEGRATION.md) for detailed documentation.

### Quick Example

```typescript
import { eventsApiClient } from '@/lib/api';

// Get all upcoming events
const events = await eventsApiClient.getUpcoming();

// Join an event
await eventAttendeesApiClient.join(eventId);

// Create an event
await eventsApiClient.create({
    title: "My Event",
    description: "Event description",
    location: "Park",
    dateEvent: "2024-12-01",
    startTime: "2024-12-01T10:00:00",
    endTime: "2024-12-01T12:00:00",
    maxCapacity: 50,
    category: "SPORTS",
    minAge: 13,
    maxAge: 150
});
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Environment Variables

Create a `.env.local` file:

```env
# Backend API URL (optional, defaults to localhost:8080)
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Pages

### Public Pages

- `/` - Landing page
- `/login` - User login
- `/register` - User registration

### Protected Pages

- `/dashboard` - Browse and filter events
- `/profile` - User profile management
- `/create-event` - Create new event
- `/event/[id]` - Event details and attendees
- `/create-institution` - Add new institution (requires permission)

## Features in Detail

### Authentication

- JWT-based authentication
- HTTP-only cookies for security
- Automatic token refresh
- Protected routes with middleware

### Event Management

- Create events with rich details
- Filter by category
- Join/leave events
- View attendee lists
- Capacity management
- Age restrictions

### User Profile

- Update username and bio
- Avatar support
- View account details
- Quick access to features

### Institution Support

- Create and manage institutions
- Verification workflow
- Link events to institutions
- Institution categories

## Security

- Input sanitization on all forms
- XSS protection
- CSRF protection via HTTP-only cookies
- Client and server-side validation
- Secure password requirements

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is part of the Lokum Meet platform.

## Support

For issues and questions, please create an issue in the repository.

