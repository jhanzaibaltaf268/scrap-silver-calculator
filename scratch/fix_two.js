const fs = require('fs');

let c1 = fs.readFileSync('contact.html', 'utf8');
c1 = c1.replace(/<meta name="description" content="[^"]*"/i, '<meta name="description" content="Get in touch with the team at Scrap Silver Calculator. We are here to help answer your questions about calculations."');
fs.writeFileSync('contact.html', c1);

let c2 = fs.readFileSync('how-to-use-silver-calculators.html', 'utf8');
c2 = c2.replace(/<meta name="description" content="[^"]*"/i, '<meta name="description" content="Step-by-step beginner\'s guide on how to use our scrap silver calculators accurately to determine the true melt value of your silver items."');
fs.writeFileSync('how-to-use-silver-calculators.html', c2);

console.log('Fixed two files');
