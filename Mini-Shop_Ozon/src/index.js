
    import getData from './modules/getData';
    import renderCards from './modules/renderCards';
    import renderCatalog from './modules/renderCatalog';
    import workWithBasket from './modules/workWithBasket';
    import searchOnPage from './modules/searchOnPage';
    import checkboxHotSale from './modules/checkboxHotSale';

    getData().then((data) => { // стек вызовов:
        renderCards(data);
        renderCatalog();
        workWithBasket();
        searchOnPage();
        checkboxHotSale();
    });