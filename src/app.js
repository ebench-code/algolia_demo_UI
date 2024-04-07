require('dotenv').config();
const { algoliasearch, instantsearch } = window;
const algoliaAppId = process.env.Productos_App_Id;
const algoliaSearchKey = process.env.Productos_Search_Key;
const searchClient = algoliasearch(
  algoliaAppId,
  algoliaSearchKey
);

const search = instantsearch({
  indexName: 'products-import',
  searchClient,
  future: { preserveSharedStateOnUnmount: true },
  insights: true,
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: (hit, { html, components }) => html`
      <article style="text-align: left;">
      <div class="product-image-wrapper">
      <img src="${hit.image}" alt="${hit.name}" class="product-image" />
    </div>
    
      <div style="margin-top: 10px;">
        <h1>${components.Highlight({ hit, attribute: 'name' })}</h1>
        <div style="margin-top: 5px;">$${hit.price}</div>
        <div style="margin-top: 5px;"><strong>Popularity:</strong> ${hit.popularity}</div>   
        <div style="margin-top: 5px;"><strong>Rating:</strong> ${hit.rating}</div>      
      </div>
    </article>
      `,
    },
  }),
  instantsearch.widgets.configure({
    hitsPerPage: 8,
  }),

  instantsearch.widgets.configure({
    hitsPerPage: 8,
  }),

  instantsearch.widgets.currentRefinements({
    container: '#current-refinements',
  }),

  instantsearch.widgets.clearRefinements({
    container: '#clear-refinements',
  }),
  
  instantsearch.widgets.panel({
    templates: { header: () => 'brand' },
  })(instantsearch.widgets.refinementList)({
    container: '#brand-list',
    attribute: 'brand',
    limit: 5,
    showMore: true,
  }),
  instantsearch.widgets.panel({
    templates: { header: () => 'categories' },
  
  })(instantsearch.widgets.refinementList)({
    container: '#categories-list',
    attribute: 'categories',
    limit: 5,
    showMore: true,
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

search.start();
