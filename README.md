# Yu-Gi-Oh! Card Explorer

[//]: # (![Yu-Gi-Oh! Card Explorer Banner]&#40;https://i.imgur.com/WGgKAVY.jpg&#41;)

## 📖 Overview

Yu-Gi-Oh! Card Explorer is a React application that allows users to search, filter, and explore cards from the popular Yu-Gi-Oh! trading card game. The application fetches data from the YGOPRODeck API to provide up-to-date information on thousands of cards in the Yu-Gi-Oh! universe.

🔗 **Live Demo**: [https://jefroy.github.io/COMP-6300-A3](https://jefroy.github.io/COMP-6300-A3)

[//]: # (![Application Screenshot]&#40;https://i.imgur.com/KYz4FEd.jpg&#41;)

## ✨ Features

- **Search Functionality**: Find cards by name with real-time filtering
- **Type Filtering**: Filter cards by their type (Monster, Spell, Trap, etc.)
- **Detailed Card Information**: View comprehensive details for each card
    - Card images
    - Card descriptions
    - Monster stats (ATK, DEF, Level, Attribute)
    - Card type and effects
- **Color-Coded Cards**: Each card type has a distinct color for easy identification
    - Normal Monsters: Yellow border
    - Effect Monsters: Orange border
    - Fusion Monsters: Purple border
    - Spell Cards: Green border
    - Trap Cards: Pink border
    - And more!
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Pagination**: Navigate through large result sets with ease
- **Loading States**: Visual feedback during data fetching operations

## 🚀 Technologies Used

- **React**: Frontend library for building the user interface
- **YGOPRODeck API**: Data source for Yu-Gi-Oh! cards
- **CSS3**: Custom styling with animations and transitions
- **Fetch API**: For making HTTP requests
- **GitHub Pages**: Hosting platform
- **GitHub Actions**: CI/CD for automated deployments
- **Google Fonts**: Cinzel and Raleway for typography

## 🛠️ Installation and Setup

### Prerequisites
- Node.js (v16 or later)
- npm or yarn

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/jefroy/COMP-6300-A3.git
   cd COMP-6300-A3
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Deployment

The application is automatically deployed to GitHub Pages when changes are pushed to the master branch using GitHub Actions.

To manually deploy:

```bash
npm run deploy
# or
yarn deploy
```

## 📱 How to Use

1. **Search for Cards**:
    - Enter a card name in the search box
    - Select a card type from the dropdown (optional)
    - Click "Search" or press Enter

2. **Browse Results**:
    - Scroll through the card list
    - Use pagination controls to navigate between pages

3. **View Card Details**:
    - Each card displays its image, name, type, and description
    - Monster cards show additional stats like ATK, DEF, and Level

![Usage Example](https://i.imgur.com/9GE5Ljw.jpg)

## 🧩 Component Structure

- **App**: Main component that manages state and API calls
- **SearchForm**: Handles user input and search form submission
- **CardList**: Displays the grid of cards and manages loading states
- **CardDisplay**: Renders individual card information
- **Pagination**: Provides navigation through result pages
- **ResultsCount**: Shows the number of cards found matching search criteria

## 🔄 Workflow

1. When the application loads, it fetches random cards to display
2. User can search for specific cards by name or filter by card type
3. Results are fetched from the API and displayed in a grid
4. Large result sets are paginated for better performance
5. Each card is displayed with its relevant information and styled according to its type

## 📝 License

This project was created as an assignment for COMP6300 - Advanced Internet Technologies at the University of the West Indies.

## 🙏 Acknowledgments

- Card data and images provided by [YGOPRODeck API](https://ygoprodeck.com/api-guide/)
- Yu-Gi-Oh! is owned by Konami
- Special thanks to the React community for their excellent documentation and resources