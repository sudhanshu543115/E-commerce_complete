const fs = require('fs');
const path = require('path');

// Define the JSON files and their starting ID ranges
const files = [
    
    { path: 'Men/men_jeans.json', startId: 1001 },
    { path: 'Men/men_shirt.json', startId: 2001 },
    { path: 'Women/women_dress.json', startId: 3001 },
    { path: 'Women/women_jeans.json', startId: 4001 },
    { path: 'Women/LenghaCholi.json', startId: 5001 },
    { path: 'Women/women_top.json', startId: 6001 },
    { path: 'Men/men_kurta.js', startId: 7001 },
];

function addIdsToFile(filePath, startId) {
    try {
        console.log(`Processing ${filePath}...`);
        
        // Read the file
        const data = fs.readFileSync(filePath, 'utf8');
        let products;
        let isJsFile = filePath.endsWith('.js');
        
        if (isJsFile) {
            // For JS files, extract the array from the export statement
            const arrayMatch = data.match(/export\s+const\s+\w+\s*=\s*(\[[\s\S]*\]);?/);
            if (!arrayMatch) {
                throw new Error('Could not find exported array in JS file');
            }
            products = JSON.parse(arrayMatch[1]);
        } else {
            // For JSON files
            products = JSON.parse(data);
        }
        
        // Add IDs to each product at the beginning
        products.forEach((product, index) => {
            const newProduct = { id: startId + index, ...product };
            Object.keys(product).forEach(key => delete product[key]);
            Object.assign(product, newProduct);
        });
        
        if (isJsFile) {
            // For JS files, reconstruct the export statement
            const exportName = data.match(/export\s+const\s+(\w+)/)[1];
            const newContent = `export const ${exportName}=${JSON.stringify(products, null, 4)};`;
            fs.writeFileSync(filePath, newContent);
        } else {
            // For JSON files
            fs.writeFileSync(filePath, JSON.stringify(products, null, 4));
        }
        
        console.log(`✓ Added IDs to ${products.length} products in ${filePath} (starting from ${startId})`);
        
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
    }
}

// Process each file
files.forEach(file => {
    addIdsToFile(file.path, file.startId);
});

console.log('\n🎉 All JSON files have been updated with unique IDs!');
