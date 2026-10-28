const menuImages = import.meta.glob("../../images/*", {
  eager: true,
  import: "default",
  query: "?url",
});

export function getMenuImage(filename) {
  return menuImages[`../../images/${filename}`] ?? "";
}

export const menuSections = [
  {
    title: "Appetizers",
    note: "These dishes are great for sharing",
    items: [
      { name: "Bread & dips", description: "Sourdough bread accompanied by hummus, beetroot & whipped feta dips", price: "45.00", image: "breaddips.png", tag: "Vegetarian" },
      { name: "Garden salad", description: "A garden-fresh salad with seasonal greens and roasted cashews", price: "35.00", image: "gardensalad.png", tag: "Vegan" },
      { name: "Tuna sashimi", description: "Seared fresh tuna, fresh herbs, and a touch of chilli", price: "74.50", image: "tunasashimi.png" },
    ],
  },
  {
    title: "Mains",
    note: "A diverse range of flavourful dishes which are all sourced daily and locally",
    items: [
      { name: "Hand-made ravioli", description: "Artisanal hand-made ravioli, filled with a blend of cheeses in a basil pesto sauce", price: "98.50", image: "handmaderavioli.png", tag: "Vegetarian" },
      { name: "Tofu skewers", description: "Grilled tofu skewers, marinated in a blend of soy and sesame with seasonal roast vegetables", price: "75.00", image: "tofuskewers.png", tag: "Vegan" },
      { name: "Line fish of the day", description: "Fresh catch of the day, paired with asparagus, creamed leek and seasonal vegetables", price: "95.00", image: "linefishoftheday.png", tag: "Chef's pick" },
      { name: "Peanut crusted steak", description: "Juicy, tender steak cooked to your liking, served with seasonal vegetables", price: "88.00", image: "peanutcrustedsteak.png" },
      { name: "Grilled baby chicken", description: "Beautifully cooked half baby chicken served with an option of baby potatoes and vegetables", price: "89.50", image: "griledbabychicken.png", tag: "Featured" },
      { name: "Braised beef & marry me mash", description: "Slow-braised beef and silky mash, served with seasonal greens and rich pan sauce", price: "96.00", image: "braisedbeefmarrymemash.png", tag: "Featured" },
    ],
  },
  {
    title: "Desserts",
    note: "Our desserts are made in house by our pastry chef",
    items: [
      { name: "Sticky date & ice cream", description: "Served with vanilla ice cream, toffee sauce and pecan crumble", price: "70.00", image: "stickydateicecream.png" },
      { name: "Chocolate mousse", description: "Decadent, silky rich chocolate mousse decorated with pistachio and berries", price: "64.00", image: "chocolatemouse.png" },
      { name: "Carrot cake", description: "Lightly spiced carrot cake layered with cream cheese frosting", price: "68.50", image: "carrotcake.png" },
      { name: "Brownie", description: "Warm chocolate brownie with a soft centre", price: "62.00", image: "brownie.png" },
    ],
  },
];

export const zar = (amount) => `R ${amount}`;
