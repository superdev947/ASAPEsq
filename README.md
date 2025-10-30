# ASAPEsq

A React Native mobile application connecting clients with attorneys for on-demand legal services. Built with Expo and featuring separate user experiences for clients, attorneys, and guests.

## 📱 Features

### For Clients
- Request attorney services on-demand
- Track request status and progress
- Rate and review completed services
- View receipts and payment history
- Manage profile and preferences
- Secure payment processing

### For Attorneys
- View and accept pending requests
- Manage active service tasks
- Track service history
- Subscription management
- Profile and credentials management
- End task and service completion

### General Features
- User authentication (Login/Signup)
- Password recovery
- Google Sign-In integration
- Real-time messaging system
- Location-based services with Google Maps
- Push notifications
- Credit card payment integration
- Multi-role navigation system

## 🛠️ Tech Stack

- **Framework:** React Native (0.63.4)
- **Development Platform:** Expo (SDK 40)
- **State Management:** Redux + Redux Saga
- **Navigation:** React Navigation v4
- **UI Components:** Native Base
- **Maps:** React Native Maps + Google Places API
- **Forms:** Custom credit card input components
- **Authentication:** Expo Google Sign-In

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v12 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for Mac) or Android Studio (for Android development)
- Git

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/superdev947/ASAPEsq.git
   cd ASAPEsq
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   - Add your Google Maps API key in `app.json`
   - Update `google-services.json` with your Firebase configuration

4. **Start the development server**
   ```bash
   npm start
   ```

## 📱 Running the App

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

### Web
```bash
npm run web
```

## 📂 Project Structure

```
ASAPEsq/
├── src/
│   ├── assets/              # Images, fonts, and static files
│   ├── constants/           # App constants (colors, images, layout)
│   ├── CreditCardInput/     # Custom credit card input components
│   ├── navigation/          # Navigation structure for all user roles
│   │   ├── Attorney.js      # Attorney-specific navigation
│   │   ├── Client.js        # Client-specific navigation
│   │   ├── Guest.js         # Guest/unauthenticated navigation
│   │   └── SideMenu.js      # Drawer menu component
│   ├── redux/               # State management
│   │   ├── Store.js         # Redux store configuration
│   │   ├── actions/         # Action creators
│   │   ├── reducers/        # Reducers and sagas
│   │   └── services/        # API services
│   ├── screens/             # Screen components
│   │   ├── Attorney/        # Attorney-specific screens
│   │   ├── Client/          # Client-specific screens
│   │   ├── Guest/           # Authentication screens
│   │   └── Public/          # Shared screens (messages, support, etc.)
│   └── theme/               # Custom theme and UI components
│       ├── components/      # Themed Native Base components
│       └── variables/       # Theme variables
├── App.js                   # App entry point
├── package.json             # Dependencies and scripts
└── app.json                 # Expo configuration
```

## 🔑 Key Components

### Navigation
- **Role-based routing:** Separate navigation stacks for Attorneys, Clients, and Guests
- **Drawer navigation:** Side menu for easy access to features
- **Stack navigation:** Screen hierarchy management

### State Management
- **Redux:** Centralized state management
- **Redux Saga:** Side effects handling for async operations
- **Actions:** Separate action files for auth and requests

### Screens

#### Guest Screens
- Login
- Sign Up (Client & Attorney)
- Forgot Password

#### Client Screens
- Request Attorney
- Confirm Request
- Request In Progress
- My Requests
- Rating
- Receipt
- Profile Management
- Update Password

#### Attorney Screens
- Pending Requests
- Service In Progress
- My Requests
- End Task
- Subscription
- Profile Management
- Update Password

#### Public Screens
- Messages
- Message Details
- Payment
- About Us
- Support

## 🎨 Theming

The app uses a custom theme built on top of Native Base components. Theme customization can be found in:
- `src/theme/components/` - Component-specific styling
- `src/theme/variables/` - Color schemes and variables

## 🔐 Authentication Flow

1. Users can sign up as either Client or Attorney
2. Email/password authentication with Google Sign-In option
3. JWT-based session management
4. Password recovery via email
5. Role-based access control

## 💳 Payment Integration

- Custom credit card input component
- Card validation and formatting
- Secure payment processing
- Receipt generation and history

## 🗺️ Maps & Location

- Google Maps integration for location selection
- Google Places Autocomplete for address search
- Directions and routing between locations
- Real-time location tracking

## 📱 Platform Support

- ✅ iOS
- ✅ Android
- ✅ Web (via Expo)

## 🧪 Testing

```bash
npm test
```

## 🔧 Configuration

### Google Maps API
Update your Google Maps API key in `app.json`:
```json
"android": {
  "config": {
    "googleMaps": {
      "apiKey": "YOUR_API_KEY_HERE"
    }
  }
}
```

### Firebase
Add your Firebase configuration in `google-services.json` for Android.

## 📝 Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser
- `npm run eject` - Eject from Expo (permanent)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👥 Author

**superdev947**

## 📞 Support

For support and inquiries, please use the in-app support feature or contact through the repository.

## 🔄 Version History

- **1.0.0** - Initial Release
  - Client and Attorney role separation
  - Request management system
  - Payment integration
  - Messaging system
  - Profile management

---

Built with ❤️ using React Native and Expo
