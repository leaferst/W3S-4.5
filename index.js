const Category = require('./models/categoryModel');
const Item = require('./models/itemModel');
const { sequelize, testConnection } = require('./models/conn');
const { Op } = require('sequelize');

testConnection();

Item.belongsTo(Category, {
    foreignKey: "category_id"
});


const findCategories = async () => {
    const result = await Category.findAll();
    console.log(JSON.stringify(result));
}

findCategories();

const findCategoriesByName = async () => {
    const result = await Category.findAll({where: {name: "fruits"}});
    console.log(JSON.stringify(result));
}

// NOT NECESSARY TO RUN EVERY REFRESH
// findCategoriesByName();

const createNewCategory = async () => {
    await Category.create({
        name: "meat",
    });
    findCategories();
}

// COMMENT THIS OUT TO AVOID DUPLICATES
// createNewCategory();

const updatingCategory = async () => {
    await Category.update({name: "meats"}, {where: {id: 3}});
    findCategories();
}

// NOT NECESSARY TO RUN EVERY REFRESH
// updatingCategory();

const deleteCategory = async () => {
    await Category.destroy({where: {id: 3}});
    findCategories();
}

// NOT NECESSARY TO RUN EVERY REFRESH
// deleteCategory();

const findItems = async () => {
    const results = await Item.findAll({ include: Category });
    console.log(JSON.stringify(results));
}

// NOT NECESSARY TO RUN EVERY REFRESH
findItems();

// ------------- ASSIGNMENT STARTS HERE -----------------------

const createMeatsCategory = async () => {
    await Category.create({
        name: "meats"
    });
    findCategories();
}

//  Ran once and commented out
// createMeatsCategory();

const createPorkAndChicken = async () => {
    await Item.create(
        {
            name: 'pork',
            price: 12.97,
            description: 'piggy piggy',
            category_id: 5,
        }
    )
    await Item.create(
        {
            name: 'chicken',
            price: 8.88,
            description: 'eat it with rice for gainz',
            category_id: 5,
        },
    )
    findItems();
}

// createPorkAndChicken();

// I used this function to fix my mistakes when making the last function.
const deletePorkAndChicken = async () => {
    await Item.destroy({where: {name: 'chicken', name: 'pork'}});
    findItems();
}

// deletePorkAndChicken();

const findAllFruits = async () => {
    results = await Item.findAll({where: {category_id: 1}});

    results.forEach(fruit => {
        console.log('All Fruits: ', JSON.stringify(fruit.name + ' - description: ' + fruit.description))
    })
}

findAllFruits();

const inflateMeatPrices = async () => {
    await Item.update({price: 120.99}, {where: {category_id: 5}});
    findItems();
}

// inflateMeatPrices();

const findItemsOver20 = async () => {
    const results = await Item.findAll({where: {price : {[Op.gt]: 20}}})
    console.log('All items more expensive than $20: ' + JSON.stringify(results));
}

findItemsOver20();