// Static menu for The Link, transcribed from the venue QR menu PDF.
// Prices are in USD. Obvious spelling slips in the source were lightly cleaned up.

export type MenuItem = {
  name: string;
  /** Primary price in USD. Omit for items priced only via a second column. */
  price?: number;
  /** Secondary price column (e.g. the "Double" burger size). */
  price2?: number;
  /** Optional one-line note shown under the item (ingredients, portion, etc.). */
  description?: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  /** Small note shown under the category title (add-ons, portions, etc.). */
  note?: string;
  /** Labels when a category has two price columns, e.g. ['Regular', 'Double']. */
  priceColumns?: [string, string];
  items: MenuItem[];
};

export type MenuSection = {
  id: string;
  name: string;
  /** Short tagline shown beside the section title. */
  tagline?: string;
  categories: MenuCategory[];
};

export const MENU_SECTIONS: MenuSection[] = [
  {
    id: 'food',
    name: 'Food',
    tagline: 'Bold plates & comfort favorites',
    categories: [
      {
        id: 'starters',
        name: 'Starters',
        items: [
          { name: 'Calamari Rings', price: 6.0 },
          { name: 'Cheese Garlic Bread (4 pcs)', price: 3.5 },
          { name: 'Chicken Nuggets (6 pcs)', price: 5.5 },
          { name: 'Crispy Chicken Wings (8 pcs)', price: 6.0 },
          { name: 'Mixed Appetizers Plate', price: 17.0 },
          { name: 'Nachos & Cheese', price: 8.0 },
          { name: 'Edamame (100 g)', price: 4.0 },
          { name: 'Spring Rolls (4 pcs)', price: 5.0 },
          { name: 'Mozzarella Sticks', price: 5.5 },
          { name: 'Chicken Strips (4 pcs)', price: 6.5 },
          { name: 'Quesadillas Chicken', price: 10.5 },
        ],
      },
      {
        id: 'fries',
        name: 'Fries & Potato',
        items: [
          { name: 'Truffle Mushroom Baked Potato', price: 10.0 },
          { name: 'French Fries', price: 5.0 },
          { name: 'Cheese Baked Potato', price: 5.5 },
          { name: 'Cheese & Fries', price: 6.5 },
          { name: 'Truffle Fries', price: 7.0 },
          { name: 'Potato Wedges', price: 5.0 },
          { name: 'Fries and Chicken Volcano', price: 10.0 },
        ],
      },
      {
        id: 'salads',
        name: 'Salads',
        note: 'Add toppings — Cheese $2.50 · Chicken $4.00 · Tuna $4.00 · Shrimps $5.00',
        items: [
          { name: 'Chef Salad', price: 12.5 },
          { name: 'Crab Salad', price: 12.5 },
          { name: 'Caesar Salad', price: 8.5 },
          { name: 'Rocca Salad', price: 12.5 },
          { name: 'Pasta Salad', price: 8.5 },
          { name: 'Greek Salad', price: 8.5 },
          { name: 'Kale Quinoa Salad', price: 9.5 },
          { name: 'Thai Glass Noodles Salad', price: 12.5 },
          { name: 'Exotic Salmon Salad', price: 15.0 },
          { name: 'Burrata Salad', price: 12.5 },
        ],
      },
      {
        id: 'burgers',
        name: 'Burgers',
        note: 'Add special — potato wedges & fries, cheddar on top $3.50',
        priceColumns: ['Regular', 'Double'],
        items: [
          { name: 'Hamburger', price: 11.0, price2: 16.0 },
          { name: 'Cheese Burger', price: 13.5, price2: 17.5 },
          { name: 'BBQ Crispy Chicken', price: 13.5, price2: 18.0 },
          { name: 'Chicken Burger', price: 11.0, price2: 16.0 },
          { name: 'Mushroom Burger', price: 14.0, price2: 17.5 },
          { name: 'Mozzarella Beef', price: 13.5, price2: 19.0 },
          { name: 'Mozzarella Chicken', price: 13.5, price2: 19.0 },
          { name: 'Mozzarella Burger', price: 11.0, price2: 16.0 },
          { name: 'Pepperoni Pizza Burger', price: 15.5 },
          { name: 'Truffle Burger', price: 14.0 },
          { name: 'Buffalo Garlic Chicken', price: 15.5 },
          { name: 'Fish Burger (Fresh Lekkos)', price: 12.0 },
          { name: 'Smashed Burger', price: 15.5 },
        ],
      },
      {
        id: 'sandwiches',
        name: 'Sandwiches',
        note: 'Add special — potato wedges & fries, cheddar on top $3.50',
        items: [
          { name: 'Submarine', price: 11.5 },
          { name: 'Tuna Sandwich', price: 11.5 },
          { name: 'Chicken Sub', price: 12.5 },
          { name: 'Club Sandwich', price: 13.5 },
          { name: 'Crab Sandwich', price: 10.5 },
          { name: 'Fajita Chicken', price: 12.5 },
          { name: 'Crispy Chicken Sandwich', price: 12.5 },
          { name: 'Steak Sandwich', price: 16.0 },
          { name: 'Crispy Buffalo', price: 13.5 },
          { name: 'Chicken Curry Sandwich', price: 13.5 },
        ],
      },
      {
        id: 'platters',
        name: 'Platters',
        items: [
          { name: 'Fresh Grilled Fish Filet', price: 23.0 },
          { name: 'Fresh Fish & Chips', price: 18.0 },
          { name: 'Salmon Teriyaki', price: 23.0 },
          { name: 'Moule Et Frite', price: 23.0 },
          { name: 'Seafood Boil', price: 45.0, description: '2–3 persons' },
          { name: 'Seafood Boil', price: 80.0, description: '4–5 persons' },
          { name: 'Cordon Bleu Chicken', price: 16.0 },
          { name: 'Chicken Escalope Four Cheese', price: 16.0 },
          { name: 'Piccata Chicken', price: 17.0 },
          { name: 'Pasta Piccata Chicken', price: 21.0 },
          { name: 'Viennoise Chicken', price: 13.0 },
          { name: 'Fajita Chicken', price: 22.0 },
          { name: 'Chicken Teriyaki', price: 17.0 },
          { name: 'Chicken Truffle', price: 21.0 },
          { name: 'T-Bone Steak', price: 36.0 },
          { name: 'Black Angus Steak', price: 37.0 },
          { name: 'Beef Steak', price: 22.0 },
        ],
      },
      {
        id: 'pasta',
        name: 'Pasta',
        note: 'Add white rice plate $5.00 · Toppings — Cheese $2.50 · Chicken $4.00 · Tuna $4.00 · Shrimps $5.00',
        items: [
          { name: 'Penne Arrabiata', price: 9.5 },
          { name: 'Penne Quattro Formaggi', price: 12.5 },
          { name: 'Tagliatelle Al Pesto', price: 11.5 },
          { name: 'Tagliatelle Al Pollo', price: 13.5 },
          { name: 'Tagliatelle Alfredo', price: 11.5 },
          { name: 'Truffle Alfredo', price: 13.5 },
          { name: 'Veggie Noodles', price: 9.5 },
          { name: 'Spinach Shrimps', price: 16.5 },
        ],
      },
      {
        id: 'pizza',
        name: 'Pizza',
        items: [
          { name: 'Truffle Pizza', price: 14.0, description: 'Add burrata +$4' },
          { name: 'Greek Pizza', price: 14.0 },
          { name: 'Chicken Pizza', price: 12.5 },
          { name: 'Margherita Pizza', price: 10.5 },
          { name: 'Pepperoni Pizza', price: 13.5 },
          { name: 'Four Cheese Pizza', price: 12.5 },
          { name: 'Regina Pizza', price: 12.5 },
          { name: 'Vegetarian Pizza', price: 12.0 },
          { name: 'Bacon Pizza', price: 13.5 },
          { name: 'Burrata Pizza', price: 17.5 },
          { name: 'Salmon Pizza', price: 17.0 },
        ],
      },
      {
        id: 'kids-meal',
        name: 'Kids Meal',
        note: 'Free playground with every kids meal',
        items: [
          { name: 'Hamburger', price: 7.5 },
          { name: 'Chicken Burger', price: 7.5 },
          { name: 'Pizza', price: 7.5 },
          { name: 'Chicken Nuggets', price: 7.5 },
          { name: 'Penne (Red or White Sauce)', price: 7.5 },
          { name: 'Junior Pepperoni', price: 8.5 },
        ],
      },
    ],
  },
  {
    id: 'sushi',
    name: 'Sushi',
    tagline: 'Rolls, wraps & sashimi',
    categories: [
      {
        id: 'sushi-nigiri',
        name: 'Sushi',
        note: '2 pcs',
        items: [
          { name: 'Salmon Sushi', price: 5.5 },
          { name: 'Crab Sushi', price: 3.5 },
          { name: 'Shrimp Sushi', price: 4.0 },
          { name: 'Tuna Sushi', price: 5.5 },
        ],
      },
      {
        id: 'hosomaki',
        name: 'Hosomaki',
        note: '5 pcs',
        items: [
          { name: 'Salmon', price: 3.75 },
          { name: 'Tuna', price: 3.75 },
          { name: 'Shrimps', price: 3.5 },
          { name: 'Crab', price: 3.5 },
          { name: 'Spicy Salmon', price: 4.25 },
          { name: 'Spicy Shrimps', price: 3.75 },
          { name: 'Spicy Tuna', price: 4.25 },
        ],
      },
      {
        id: 'uramaki',
        name: 'Uramaki',
        items: [
          { name: 'Crispy Crazy', price: 4.5 },
          { name: 'Crispy Salmon', price: 4.5 },
          { name: 'Crispy Tuna', price: 4.5 },
          { name: 'Crispy Shrimps', price: 4.5 },
          { name: 'Crispy California', price: 4.5 },
          { name: 'Sesame California', price: 5.0 },
          { name: 'Sesame Spicy Tuna', price: 5.0 },
          { name: 'Sesame Spicy Salmon', price: 5.0 },
        ],
      },
      {
        id: 'sashimi',
        name: 'Sashimi',
        items: [
          { name: 'Salmon Sashimi', price: 7.0 },
          { name: 'Tuna Sashimi', price: 7.0 },
          { name: 'Crab Sashimi', price: 4.0 },
          { name: 'Shrimp Sashimi', price: 5.0 },
        ],
      },
      {
        id: 'tobiko-wrap',
        name: 'Tobiko Wrap',
        items: [
          { name: 'Crazy Tobiko', price: 5.5 },
          { name: 'California Tobiko', price: 5.5 },
          { name: 'Philadelphia Tobiko', price: 6.0 },
          { name: 'Naked Tobiko', price: 6.0 },
        ],
      },
      {
        id: 'special-makis',
        name: 'Special Makis',
        note: '4 pcs',
        items: [
          { name: 'Mango Wrap', price: 6.0, description: 'Salmon · Avocado' },
          { name: 'Avocado Wrap', price: 6.0, description: 'Mango · Crab · Shrimps' },
          { name: 'Salmon Wrap', price: 6.75, description: 'Crazy · Salmon' },
          { name: 'Tuna Mango Wrap', price: 6.75, description: 'Shrimps · Tuna · Mango' },
          { name: 'Crab Wrap', price: 6.0, description: 'Crab · Avocado · Mango · Cucumber' },
          { name: 'Black Sesame', price: 6.75, description: 'Spicy Salmon · Tuna' },
          { name: 'Tuna Salmon Wrap', price: 7.0, description: 'Spicy Tuna · Salmon · Avocado' },
          { name: 'Philly Wrap', price: 6.0, description: 'Salmon · Avocado' },
          { name: 'Crispy Mango Salmon', price: 7.0, description: 'Crazy inside' },
          { name: 'Mango Avocado', price: 6.0, description: 'Crazy inside' },
          { name: 'Mango Crazy', price: 6.75, description: 'Crazy · Salmon' },
          { name: 'Spicy Salmon Wrap', price: 6.75, description: 'Philly · Crab · Mango' },
          { name: 'Mango Salmon Wrap', price: 6.75, description: 'Crab · Shrimp · Mango' },
          { name: 'Spicy Shrimp Tobiko', price: 6.5, description: 'Crab · Shrimp · Mango' },
          { name: 'Spicy Shrimp Wrap', price: 7.0, description: 'Salmon · Avocado' },
        ],
      },
      {
        id: 'sushi-salads',
        name: 'Sushi Salads',
        items: [
          { name: 'Noodles Shrimp Salad', price: 8.0 },
          { name: 'Crazy Crab Salad', price: 7.5 },
          { name: 'Salmon Noodles Salad', price: 8.5 },
          { name: 'Crispy Salmon Salad', price: 14.5 },
        ],
      },
      {
        id: 'sushi-sets',
        name: 'Sets & Combos',
        items: [
          {
            name: 'Boston',
            price: 27.0,
            description: '16 pcs — 3 Tobiko Philadelphia · 3 Crispy Crazy · 4 Shredded Salmon · 2 Crab Sushi · 4 Avocado Wrap',
          },
          {
            name: 'Salmon Selection',
            price: 28.0,
            description: '14 pcs — 3 Salmon Sushi · 4 Salmon Wrap · 3 Salmon Hoso · 4 Crispy Salmon',
          },
          {
            name: 'Salmon Lovers',
            price: 34.0,
            description: '16 pcs — 4 Salmon Belt · 4 Mango Wrap · 4 Shredded Salmon · 4 Salmon Wrap',
          },
          { name: 'Club Maki', price: 17.0 },
          {
            name: 'Crab Lovers',
            price: 20.0,
            description: '16 pcs — 4 California Tobiko · 4 Crispy Crazy · 4 Sesame California · 4 Crab Wrap',
          },
          {
            name: 'Special Wrap Mix',
            price: 56.0,
            description:
              '32 pcs — 4 each: Tuna Salmon · Philly · Mango Avocado · Mango Crazy · Spicy Salmon · Mango Salmon · Spicy Shrimp Tobiko · Crazy Mango Salmon',
          },
          {
            name: 'Veggie Set',
            price: 12.0,
            description: '15 pcs — 3 each: Hoso Avocado · Mango · Cucumber · Carrots · Rocca',
          },
          { name: 'Combo 1', price: 21.0, description: '15 pcs + crazy crab salad' },
          { name: 'Combo 2', price: 21.0, description: '17 pcs + crazy crab salad' },
          { name: 'Combo 3', price: 38.0, description: '27 pcs + crazy crab salad' },
          { name: 'Combo 4', price: 19.0, description: '15 pcs + crazy crab salad' },
        ],
      },
    ],
  },
  {
    id: 'lebanese',
    name: 'Lebanese',
    tagline: 'Mezze & charcoal grill',
    categories: [
      {
        id: 'lebanese-appetizers',
        name: 'Appetizers',
        items: [
          { name: 'Tabbouleh', price: 7.5 },
          { name: 'Fattouch', price: 7.5 },
          { name: 'Hommos', price: 5.5 },
          { name: 'Hommos Soujouk', price: 6.5 },
          { name: 'Moutabbal', price: 5.5 },
          { name: 'Chanklich', price: 5.5 },
          { name: 'Sahen Khodra', price: 4.5 },
          { name: 'Grilled Halloum', price: 7.0 },
          { name: 'Labneh', price: 5.0 },
          { name: 'Foul Moudammas', price: 5.5 },
          { name: 'Balila', price: 5.5 },
          { name: 'Kebbeh (4 pcs)', price: 7.5 },
          { name: 'Mouajjanet Mchakkal (6 pcs)', price: 7.5 },
        ],
      },
      {
        id: 'bel-fekhara',
        name: 'Bel Fekhara',
        items: [
          { name: 'Makanek', price: 8.0 },
          { name: 'Soujouk', price: 8.0 },
          { name: 'Sawda Djej', price: 7.0 },
          { name: 'Calamar Provincial', price: 11.5 },
          { name: 'Crevette Provincial', price: 11.5 },
        ],
      },
      {
        id: 'machaweh',
        name: 'Machaweh',
        items: [
          { name: 'Kabab', price: 15.0, description: '3 skewers + ½ hommos' },
          { name: 'Taouk', price: 14.0, description: '2 skewers' },
          { name: 'Lahmeh', price: 19.0, description: '2 skewers + ½ hommos' },
          { name: 'Mix Grill', price: 21.0, description: '+ ½ hommos' },
          { name: 'Mix Grill Extra', price: 47.0 },
          { name: 'Shawarma Djej', price: 14.0, description: 'with tabbouleh' },
          { name: 'Djej Msahab', price: 17.0, description: 'with rocca salad' },
        ],
      },
    ],
  },
  {
    id: 'sweets',
    name: 'Sweets & Shakes',
    tagline: 'Crepes, cakes & shakes',
    categories: [
      {
        id: 'crepe',
        name: 'Crepe',
        note: 'Add strawberry $0.50 · Add banana $0.50',
        items: [
          { name: 'Nutella Crepe', price: 5.0 },
          { name: 'Fettucini Crepe', price: 7.0 },
        ],
      },
      {
        id: 'desserts',
        name: 'Desserts',
        items: [
          { name: 'Lazy Cake', price: 5.5 },
          { name: 'Cheese Cake', price: 6.0, description: 'Blueberry or strawberry' },
          { name: 'Oreo Cheese Cake', price: 6.0 },
          { name: 'Fondant Au Chocolat', price: 12.0 },
          { name: 'Chocolat Brownies', price: 9.0 },
          { name: 'Pain Perdu', price: 10.0 },
        ],
      },
      {
        id: 'ice-cream',
        name: 'Ice Cream',
        items: [
          { name: 'Ice Cream 3 Scoops', price: 6.0 },
          { name: 'Chocolat Mou', price: 7.0 },
          { name: 'Banana Split', price: 7.5 },
          { name: 'Browny Crown', price: 6.0 },
        ],
      },
      {
        id: 'milk-shakes',
        name: 'Milk Shakes',
        items: [
          { name: 'Oreo Shake', price: 8.0 },
          { name: 'Strawberry Shake', price: 7.0 },
          { name: 'Strawberry Banana Shake', price: 7.0 },
          { name: 'Watermelon Shake', price: 7.0 },
          { name: 'Mango Shake', price: 7.0 },
          { name: 'Melon Shake', price: 7.0 },
          { name: 'Chocolate Shake', price: 7.0 },
          { name: 'Vanilla Shake', price: 7.0 },
        ],
      },
      {
        id: 'crazy-shakes',
        name: 'Crazy Shakes',
        items: [
          { name: 'Dubai Chocolate Strawberries', price: 10.0 },
          { name: 'Crazy Chocolate Shake', price: 9.0 },
          { name: 'Bubblegum Shake', price: 8.0 },
          { name: 'Vanilla Banana Shake', price: 8.0 },
          { name: 'Lotus Milk Shake', price: 8.0 },
        ],
      },
    ],
  },
  {
    id: 'drinks',
    name: 'Drinks',
    tagline: 'Juices, coffee & soft drinks',
    categories: [
      {
        id: 'water',
        name: 'Water',
        items: [
          { name: 'Perrier', price: 4.5 },
          { name: 'Sparkling Water (Rim)', price: 1.75 },
          { name: 'Water Tannourine 0.5 L', price: 1.25 },
          { name: 'Water Tannourine 1.5 L', price: 2.5 },
          { name: 'Water Via 1 L', price: 4.0 },
        ],
      },
      {
        id: 'soft-drinks',
        name: 'Soft Drinks',
        items: [
          { name: 'Soft Drinks', price: 3.0 },
          { name: 'Iced Tea', price: 3.0 },
          { name: 'Energy Drink', price: 3.5 },
          { name: 'Red Bull', price: 4.5 },
        ],
      },
      {
        id: 'hot-drinks',
        name: 'Hot Drinks',
        items: [
          { name: 'Turkish Coffee', price: 2.5 },
          { name: 'Espresso', price: 2.5 },
          { name: 'Cappuccino', price: 3.5 },
          { name: 'Tea Flavored', price: 2.25 },
          { name: 'Nescafe Red', price: 3.5 },
          { name: 'Nescafe Gold', price: 4.5 },
          { name: 'Hot Chocolate', price: 5.0 },
          { name: 'Giant Cinnamon Tea', price: 3.25 },
          { name: 'Nescafe With Milk', price: 4.0 },
        ],
      },
      {
        id: 'flavored-coffee',
        name: 'Flavored Coffee',
        items: [
          { name: 'Café Latte', price: 4.0 },
          { name: 'Hazelnut Café Latte', price: 4.5 },
          { name: 'Caramel Café Latte', price: 4.5 },
          { name: 'Vanilla Café Latte', price: 4.5 },
          { name: 'Frappuccino', price: 5.5 },
          { name: 'Hazelnut Frappuccino', price: 6.0 },
          { name: 'Caramel Frappuccino', price: 6.0 },
          { name: 'Vanilla Frappuccino', price: 6.0 },
          { name: 'Choco Frappuccino', price: 6.0 },
        ],
      },
      {
        id: 'fresh-juice',
        name: 'Fresh Juice',
        items: [
          { name: 'Lemonade', price: 4.0 },
          { name: 'Fresh Orange', price: 4.0 },
          { name: 'Apple', price: 3.5 },
          { name: 'Carrot', price: 3.5 },
          { name: 'Apple / Carrot', price: 3.5 },
          { name: 'Exo Fruit Strawberry M', price: 10.0 },
          { name: 'Exo Fruit Avocado M', price: 9.0 },
          { name: 'Avocado Juice', price: 9.0 },
        ],
      },
      {
        id: 'mocktails',
        name: 'Mocktails',
        items: [
          { name: 'Jamaica', price: 4.0 },
          { name: 'Colada', price: 4.0 },
          { name: 'Red Light', price: 4.0 },
          { name: 'Cranberry Powder Fizz', price: 4.0 },
        ],
      },
    ],
  },
  {
    id: 'bar',
    name: 'Bar',
    tagline: 'Wine, spirits, cocktails & shisha',
    categories: [
      {
        id: 'wine',
        name: 'Wine',
        items: [
          { name: 'Ksara Réserve du Couvent 1/1', price: 26.0, description: 'Red' },
          { name: 'Ksara Réserve du Couvent 1/2', price: 14.0, description: 'Red' },
          { name: 'Kefraya Les Bretèches 1/1', price: 26.0, description: 'Red' },
          { name: 'Kefraya Les Bretèches 1/2', price: 14.0, description: 'Red' },
          { name: 'Ksara Blanc de Blancs 1/1', price: 26.0, description: 'White' },
          { name: 'Ksara Blanc de Blancs 1/2', price: 14.0, description: 'White' },
          { name: 'Kefraya Blanc de Blancs 1/1', price: 26.0, description: 'White' },
          { name: 'Kefraya Blanc de Blancs 1/2', price: 14.0, description: 'White' },
          { name: 'Ksara Sunset 1/1', price: 24.0, description: 'Rosé' },
          { name: 'Ksara Sunset 1/2', price: 14.0, description: 'Rosé' },
          { name: 'Al Dayaa 1/1', price: 16.0, description: 'Red' },
          { name: 'Al Dayaa 1/1', price: 16.0, description: 'White' },
          { name: 'Al Dayaa 1/1', price: 16.0, description: 'Rosé' },
          { name: 'Al Dayaa Glass', price: 5.0 },
        ],
      },
      {
        id: 'whisky',
        name: 'Whisky',
        items: [
          { name: 'J&B 1/2', price: 24.0 },
          { name: 'J&B 1/1', price: 46.0 },
          { name: 'Black Label 1/2', price: 50.0 },
          { name: 'Black Label 1/1', price: 90.0 },
          { name: 'Red Label 1/2', price: 30.0 },
          { name: 'Red Label 1/1', price: 50.0 },
          { name: "Dewar's White Label 1/1", price: 50.0 },
          { name: "Dewar's White Label Glass", price: 25.0 },
          { name: 'J&B Glass', price: 7.0 },
          { name: 'Black Label Glass', price: 10.0 },
          { name: 'Red Label Glass', price: 7.0 },
          { name: 'Glenbey Whisky', price: 7.0 },
          { name: 'Glenbey Bottle 1/1', price: 45.0 },
        ],
      },
      {
        id: 'beer',
        name: 'Beer',
        items: [
          { name: 'Almaza', price: 5.5 },
          { name: 'Almaza Light', price: 5.75 },
          { name: 'Almaza Mexican', price: 6.0 },
          { name: 'Almaza Light Mexican', price: 6.25 },
        ],
      },
      {
        id: 'arak',
        name: 'Arak',
        items: [
          { name: 'Kefraya 1/1', price: 22.0 },
          { name: 'Kefraya 1/2', price: 15.0 },
          { name: 'Kefraya 1/4', price: 9.0 },
          { name: 'Fakra 1/1', price: 22.0 },
          { name: 'Fakra 1/2', price: 15.0 },
          { name: 'Fakra 1/4', price: 9.0 },
          { name: 'Fakra / Kefraya Arak Glass', price: 4.0 },
        ],
      },
      {
        id: 'vodka',
        name: 'Vodka',
        items: [
          { name: 'Vodka Glass', price: 5.5 },
          { name: 'Absolut 1/1', price: 70.0 },
          { name: 'Stolichnaya 1/1', price: 70.0 },
        ],
      },
      {
        id: 'shots',
        name: 'Shots',
        items: [
          { name: 'Sambuca', price: 3.5 },
          { name: 'Tequila Shot', price: 3.5 },
          { name: 'Brain Damage', price: 3.5 },
          { name: 'B52', price: 3.5 },
          { name: 'Drink And Die', price: 3.5 },
          { name: 'Flaming Hell', price: 4.0 },
          { name: 'Liquid Gold', price: 4.0 },
          { name: 'Baileys', price: 4.0 },
          { name: 'Jägermeister', price: 4.0 },
          { name: 'Gin', price: 3.5 },
          { name: 'Absinthe', price: 4.0 },
        ],
      },
      {
        id: 'cocktails',
        name: 'Cocktails',
        note: 'All cocktails $8.00',
        items: [
          { name: 'Blue Mood', price: 8.0 },
          { name: 'Chocolate Bomb', price: 8.0 },
          { name: 'Marguerita', price: 8.0 },
          { name: 'Jamaica', price: 8.0 },
          { name: 'S.O.B', price: 8.0 },
          { name: 'Mojito', price: 8.0 },
          { name: 'Long Island', price: 8.0, description: 'Pepsi / iced tea' },
          { name: 'Black Russian', price: 8.0 },
          { name: 'White Russian', price: 8.0 },
          { name: 'Blue Kamikaze', price: 8.0 },
          { name: 'Bullfrog', price: 8.0 },
          { name: 'Pina Colada', price: 8.0 },
          { name: 'Pussy Cat', price: 8.0 },
          { name: 'Cosmopolitan', price: 8.0 },
          { name: 'Amaretto Sour', price: 8.0 },
          { name: 'Whisky Sour', price: 8.0 },
          { name: 'Take Me Home', price: 8.0 },
          { name: 'Midori Sour', price: 8.0 },
        ],
      },
      {
        id: 'shisha',
        name: 'Shisha',
        items: [
          { name: 'Shisha Mouassal', price: 10.0 },
          { name: 'Shisha Special', price: 14.0 },
          { name: 'Service Mouassal', price: 6.0 },
          { name: 'Service Ajami', price: 8.0 },
          { name: 'Teghyir Rass', price: 6.5 },
          { name: 'Teghyir Rass Special', price: 8.0 },
          { name: 'Shisha Ajami', price: 12.0 },
          { name: 'Plastic Shisha Hose', price: 0.5 },
        ],
      },
    ],
  },
];

export function formatMenuPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}
