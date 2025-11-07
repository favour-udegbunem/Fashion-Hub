// "use strict";
// import crypto from "crypto";

// export async function up(queryInterface, Sequelize) {
//   // Create Dress Categories
//   const dressCategories = [
//     { id: crypto.randomUUID(), name: "Men", createdAt: new Date(), updatedAt: new Date() },
//     { id: crypto.randomUUID(), name: "Women", createdAt: new Date(), updatedAt: new Date() },
//   ];

//   await queryInterface.bulkInsert("DressCategories", dressCategories);

//   // Fetch inserted categories
//   const [men] = dressCategories.filter((dc) => dc.name === "Men");
//   const [women] = dressCategories.filter((dc) => dc.name === "Women");

//   // Create Categories linked to each DressCategory
//   const categories = [
//     // MEN
//     { id: crypto.randomUUID(), name: "Mens Top", dressCategoryId: men.id },
//     { id: crypto.randomUUID(), name: "Mens Bottom", dressCategoryId: men.id },
//     { id: crypto.randomUUID(), name: "Mens Suite & Formal", dressCategoryId: men.id },
//     { id: crypto.randomUUID(), name: "Mens Traditional Wear", dressCategoryId: men.id },

//     // WOMEN
//     { id: crypto.randomUUID(), name: "Women Dresses", dressCategoryId: women.id },
//     { id: crypto.randomUUID(), name: "Womens Top", dressCategoryId: women.id },
//     { id: crypto.randomUUID(), name: "Womens Bottom", dressCategoryId: women.id },
//     { id: crypto.randomUUID(), name: "Womens Formal & Corporate", dressCategoryId: women.id },
//     { id: crypto.randomUUID(), name: "Womens Traditional Wear", dressCategoryId: women.id },
//     { id: crypto.randomUUID(), name: "Womens Bridal & Occasion", dressCategoryId: women.id },
//   ].map((cat) => ({
//     ...cat,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   }));

//   await queryInterface.bulkInsert("Categories", categories);

//   // Helper to get category ID by name
//   const getCatId = (name) => categories.find((cat) => cat.name === name).id;

//   // Create SubCategories dynamically linked to Category IDs
//   const subCategoriesData = [
//     // MEN’S TOP
//     ["Mens Top", ["T-shirts", "Polo Shirts", "Dress shirt", "Kaftan Tops", "Casual Shirt", "Traditional Tops"]],
//     // MEN’S BOTTOM
//     ["Mens Bottom", ["Trousers", "Jeans", "Chinos", "Short", "Native Trouser", "Sokoto"]],
//     // MEN'S SUTE'S AND FORMAL
//     ["Mens Suite & Formal", ["Business Suites", "Tuxedos", "Agbada", "Senator Wear", "Dashiki Sets"]],
//     // MENS TRADITIONAL WEAR
//     ["Mens Traditional Wear", ["Kaftans", "Buba & Sokoto", "Native Attire", "Aso Ebi(Men)", ]],
//     // WOMEN’S DRESSES
//     ["Women Dresses", ["Evening Gowns", "Ankara Gowns", "Casual Dresses", "Maxi Dresses", "Midi Dresses", "Cocktail Dresses", "Shift Dresses"]],
//     // WOMEN’S TOP
//     ["Womens Top", ["Blouses", "Crop Top", "Peplum Tops", "Off Shoulder Tops", "Camisoles", "Tunic"]],
//     //WOMENS BOTTOM
//     ["Womens Bottom", ["Skirts", "Trousers", "Pallazo Pants", "Pencil Skirts", "Ankara Skirts"]],
//     //WOMENS FORMAL & CORPORATE
//     ["Womens Formal & Corporate", ["Blazers", "Corporate Suits", "Office Wear", "Pencil Dresses",]],
//     // WOMEN’S TRADITIONAL WEAR
//     ["Womens Traditional Wear", ["Iro & Buba", "Kaftans", "Wrapper & Blouse", "Aso Ebi", "Traditional Gowns", "Ankara Styles"]],
//     // WOMENS BRIDAL & OCCASSION
//     ["Womens Bridal & Occassion", ["Wedding Gowns", "Bridesmaid  Dresses", "Prom Dresses", "Party Dresses"]],
//   ];

//   const subCategories = subCategoriesData.flatMap(([categoryName, subNames]) =>
//     subNames.map((name) => ({
//       id: crypto.randomUUID(),
//       name,
//       categoryId: getCatId(categoryName),
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     }))
//   );

//   await queryInterface.bulkInsert("SubCategories", subCategories);
// }

// export async function down(queryInterface, Sequelize) {
//   await queryInterface.bulkDelete("SubCategories", null, {});
//   await queryInterface.bulkDelete("Categories", null, {});
//   await queryInterface.bulkDelete("DressCategories", null, {});
// }


"use strict";
import crypto from "crypto";

export async function up(queryInterface, Sequelize) {
  // 1️⃣ Dress Categories
  const dressCategories = [
    { id: crypto.randomUUID(), name: "Men", createdAt: new Date(), updatedAt: new Date() },
    { id: crypto.randomUUID(), name: "Women", createdAt: new Date(), updatedAt: new Date() },
  ];

  await queryInterface.bulkInsert("DressCategories", dressCategories);

  // Extract inserted references
  const men = dressCategories.find((dc) => dc.name === "Men");
  const women = dressCategories.find((dc) => dc.name === "Women");

  // 2️⃣ Categories linked to each DressCategory
  const categories = [
    // MEN
    { id: crypto.randomUUID(), name: "Mens Top", dressCategoryId: men.id },
    { id: crypto.randomUUID(), name: "Mens Bottom", dressCategoryId: men.id },
    { id: crypto.randomUUID(), name: "Mens Suite & Formal", dressCategoryId: men.id },
    { id: crypto.randomUUID(), name: "Mens Traditional Wear", dressCategoryId: men.id },

    // WOMEN
    { id: crypto.randomUUID(), name: "Women Dresses", dressCategoryId: women.id },
    { id: crypto.randomUUID(), name: "Womens Top", dressCategoryId: women.id },
    { id: crypto.randomUUID(), name: "Womens Bottom", dressCategoryId: women.id },
    { id: crypto.randomUUID(), name: "Womens Formal & Corporate", dressCategoryId: women.id },
    { id: crypto.randomUUID(), name: "Womens Traditional Wear", dressCategoryId: women.id },
    { id: crypto.randomUUID(), name: "Womens Bridal & Occasion", dressCategoryId: women.id }, // ✅ corrected spelling
  ].map((cat) => ({
    ...cat,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  await queryInterface.bulkInsert("Categories", categories);

  // Helper to find category ID by name
  const getCatId = (name) => {
    const cat = categories.find((c) => c.name === name);
    if (!cat) throw new Error(`❌ Category not found: ${name}`);
    return cat.id;
  };

  // 3️⃣ SubCategories dynamically linked to Category IDs
  const subCategoriesData = [
    ["Mens Top", ["T-shirts", "Polo Shirts", "Dress shirt", "Kaftan Tops", "Casual Shirt", "Traditional Tops"]],
    ["Mens Bottom", ["Trousers", "Jeans", "Chinos", "Short", "Native Trouser", "Sokoto"]],
    ["Mens Suite & Formal", ["Business Suites", "Tuxedos", "Agbada", "Senator Wear", "Dashiki Sets"]],
    ["Mens Traditional Wear", ["Kaftans", "Buba & Sokoto", "Native Attire", "Aso Ebi (Men)"]],

    ["Women Dresses", ["Evening Gowns", "Ankara Gowns", "Casual Dresses", "Maxi Dresses", "Midi Dresses", "Cocktail Dresses", "Shift Dresses"]],
    ["Womens Top", ["Blouses", "Crop Top", "Peplum Tops", "Off Shoulder Tops", "Camisoles", "Tunic"]],
    ["Womens Bottom", ["Skirts", "Trousers", "Pallazo Pants", "Pencil Skirts", "Ankara Skirts"]],
    ["Womens Formal & Corporate", ["Blazers", "Corporate Suits", "Office Wear", "Pencil Dresses"]],
    ["Womens Traditional Wear", ["Iro & Buba", "Kaftans", "Wrapper & Blouse", "Aso Ebi", "Traditional Gowns", "Ankara Styles"]],
    ["Womens Bridal & Occasion", ["Wedding Gowns", "Bridesmaid Dresses", "Prom Dresses", "Party Dresses"]], // ✅ corrected spelling
  ];

  const subCategories = subCategoriesData.flatMap(([categoryName, subNames]) =>
    subNames.map((name) => ({
      id: crypto.randomUUID(),
      name,
      categoryId: getCatId(categoryName),
      createdAt: new Date(),
      updatedAt: new Date(),
    }))
  );

  await queryInterface.bulkInsert("SubCategories", subCategories);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("SubCategories", null, {});
  await queryInterface.bulkDelete("Categories", null, {});
  await queryInterface.bulkDelete("DressCategories", null, {});
}