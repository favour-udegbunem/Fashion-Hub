// "use strict";

// export async function up(queryInterface, Sequelize) {
//   // Dress Categories (Men, Women)
//   const dressCategories = [
//     { name: "Men", createdAt: new Date(), updatedAt: new Date() },
//     { name: "Women", createdAt: new Date(), updatedAt: new Date() },
//   ];

//   await queryInterface.bulkInsert("DressCategories", dressCategories);

//   // Categories and SubCategories
//   const categories = [
//     // ===== MEN =====
//     { id: "101", name: "Mens Top", dressCategoryId: "1", createdAt: new Date(), updatedAt: new Date() },
//     { id: "102", name: "Mens Bottom", dressCategoryId: "1", createdAt: new Date(), updatedAt: new Date() },
//     { id: "103", name: "Mens Suite & Formal", dressCategoryId: "1", createdAt: new Date(), updatedAt: new Date() },
//     { id: "104", name: "Mens Traditional Wear", dressCategoryId: "1", createdAt: new Date(), updatedAt: new Date() },

//     // ===== WOMEN =====
//     { id: "201", name: "Women Dresses", dressCategoryId: "2", createdAt: new Date(), updatedAt: new Date() },
//     { id: "202", name: "Womens Top", dressCategoryId: "2", createdAt: new Date(), updatedAt: new Date() },
//     { id: "203", name: "Womens Bottom", dressCategoryId: "2", createdAt: new Date(), updatedAt: new Date() },
//     { id: "204", name: "Womens Formal & Corporate", dressCategoryId: "2", createdAt: new Date(), updatedAt: new Date() },
//     { id: "205", name: "Womens Traditional Wear", dressCategoryId: "2", createdAt: new Date(), updatedAt: new Date() },
//     { id: "206", name: "Womens Bridal & Occasion", dressCategoryId: "2", createdAt: new Date(), updatedAt: new Date() },
//   ];

//   await queryInterface.bulkInsert("Categories", categories);

//   const subCategories = [
//     // MEN’S TOP
//     { name: "T-shirts", categoryId: "101" },
//     { name: "Polo Shirts", categoryId: "101" },
//     { name: "Dress shirt", categoryId: "101" },
//     { name: "Kaftan Tops", categoryId: "101" },
//     { name: "Casual Shirt", categoryId: "101" },
//     { name: "Traditional Tops", categoryId: "101" },

//     // MEN’S BOTTOM
//     { name: "Trousers", categoryId: "102" },
//     { name: "Jeans", categoryId: "102" },
//     { name: "Chinos", categoryId: "102" },
//     { name: "Short", categoryId: "102" },
//     { name: "Native Trouser", categoryId: "102" },
//     { name: "Sokoto", categoryId: "102" },

//     // WOMEN’S DRESSES
//     { name: "Evening Gowns", categoryId: "201" },
//     { name: "Ankara Gowns", categoryId: "201" },
//     { name: "Casual Dresses", categoryId: "201" },
//     { name: "Maxi Dresses", categoryId: "201" },
//     { name: "Midi Dresses", categoryId: "201" },
//     { name: "Cocktail Dresses", categoryId: "201" },
//     { name: "Shift Dresses", categoryId: "201" },

//     // WOMEN’S TOP
//     { name: "Blouses", categoryId: "202" },
//     { name: "Crop Top", categoryId: "202" },
//     { name: "Peplum Tops", categoryId: "202" },
//     { name: "Off Shoulder Tops", categoryId: "202" },
//     { name: "Camisoles", categoryId: "202" },
//     { name: "Tunic", categoryId: "202" },

//     // WOMEN’S TRADITIONAL WEAR
//     { name: "Iro & Buba", categoryId: "205" },
//     { name: "Kaftans", categoryId: "205" },
//     { name: "Wrapper & Blouse", categoryId: "205" },
//     { name: "Aso Ebi", categoryId: "205" },
//     { name: "Traditional Gowns", categoryId: "205" },
//     { name: "Ankara Styles", categoryId: "205" },
//   ].map((item) => ({
//     id: crypto.randomUUID(),
//     name: item.name,
//     categoryId: item.categoryId,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   }));

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
  // Create Dress Categories
  const dressCategories = [
    { id: crypto.randomUUID(), name: "Men", createdAt: new Date(), updatedAt: new Date() },
    { id: crypto.randomUUID(), name: "Women", createdAt: new Date(), updatedAt: new Date() },
  ];

  await queryInterface.bulkInsert("DressCategories", dressCategories);

  // Fetch inserted categories
  const [men] = dressCategories.filter((dc) => dc.name === "Men");
  const [women] = dressCategories.filter((dc) => dc.name === "Women");

  // Create Categories linked to each DressCategory
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
    { id: crypto.randomUUID(), name: "Womens Bridal & Occasion", dressCategoryId: women.id },
  ].map((cat) => ({
    ...cat,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  await queryInterface.bulkInsert("Categories", categories);

  // Helper to get category ID by name
  const getCatId = (name) => categories.find((cat) => cat.name === name).id;

  // Create SubCategories dynamically linked to Category IDs
  const subCategoriesData = [
    // MEN’S TOP
    ["Mens Top", ["T-shirts", "Polo Shirts", "Dress shirt", "Kaftan Tops", "Casual Shirt", "Traditional Tops"]],
    // MEN’S BOTTOM
    ["Mens Bottom", ["Trousers", "Jeans", "Chinos", "Short", "Native Trouser", "Sokoto"]],
    // WOMEN’S DRESSES
    ["Women Dresses", ["Evening Gowns", "Ankara Gowns", "Casual Dresses", "Maxi Dresses", "Midi Dresses", "Cocktail Dresses", "Shift Dresses"]],
    // WOMEN’S TOP
    ["Womens Top", ["Blouses", "Crop Top", "Peplum Tops", "Off Shoulder Tops", "Camisoles", "Tunic"]],
    // WOMEN’S TRADITIONAL WEAR
    ["Womens Traditional Wear", ["Iro & Buba", "Kaftans", "Wrapper & Blouse", "Aso Ebi", "Traditional Gowns", "Ankara Styles"]],
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