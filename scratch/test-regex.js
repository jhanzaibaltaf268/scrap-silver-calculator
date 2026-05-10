const regex = /\/(ar|de|es|fr|hi|it|pt|ru|tr|ur|zh)([/?#]|$)/;
const paths = ['/es/', '/es', '/es/index.html', '/fr/test', '/', '/gold-and-silver-calculator'];

paths.forEach(p => {
    const match = p.match(regex);
    console.log(`Path: ${p} | Match: ${match ? match[1] : 'en'}`);
});
