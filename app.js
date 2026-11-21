const app = document.getElementById('app');
const routes = {
    '/': '/pages/home',
    '/adverts': '/pages/adverts'
};

async function render(){
    const path = window.location.hash.slice(1) || '/';
    const pagePath = routes[path];

    if (!pagePath){
        app.innerHTML = '<h1>404</h1><p>Страница не найдена</p>';
        return;
    }
    try{
        const htmlRes = await fetch(`${pagePath}.html`);
        app.innerHTML = await htmlRes.text();
        const jsModule =  await import(`${pagePath}.js`);
        if (jsModule.init){
            jsModule.init();
        }
    }catch (err){
        console.error('Oshibka', err);
    }
}
window.addEventListener('hashchange', render);
window.addEventListener('load', render);