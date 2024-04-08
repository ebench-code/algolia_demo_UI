//require('dotenv').config();
const { algoliasearch, instantsearch } = window;
const algoliaAppId = "66HIZ7AJ8Z";
const algoliaSearchKey = "94c739b07c8eec3f46f470adf1056fb9";
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
      item: (hit, { html, components, sendEvent }) => html`
      <article style="text-align: left;">
      <div class="product-image-wrapper">
        <img src="${hit.image}" alt="${hit.name}" class="product-image" />
      </div>
      
      <div style="margin-top: 10px">
        <div>
          <a href="${hit.url}" target="_blank">${components.Highlight({ hit, attribute: 'name' })}</a>
        </div>
        <div style="margin-top: 5px;">$${hit.price}</div>
        <div style="margin-top: 5px;"><strong>Popularity:</strong> ${hit.popularity}</div>   
        <div style="margin-top: 5px;"><strong>Rating:</strong> ${hit.rating}</div>
        <div style="margin-top: 5px;">
          <button
            onclick="${() => sendEvent('click', hit, 'my-click-event')}"
          >
            Add to Cart
          </button>
        </div>    
      </div>
    </article>
      `,
    },
  }),
    
  instantsearch.widgets.configure({
    hitsPerPage: 9,
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
  instantsearch.widgets.panel({
    templates: { header: () => 'Price' },
  })(instantsearch.widgets.refinementList)({
    container: '#price-list',
    attribute: 'price_range',
    limit: 6,
    showMore: true,
    templates: {
      item: (item, { html }) => html`
        <div class="ais-RefinementList-item">
          <label class="ais-RefinementList-label">
            <input class="ais-RefinementList-checkbox" type="checkbox" value="${item.value}" ${item.isRefined ? 'checked' : ''} />
            <span class="ais-RefinementList-labelText">$${item.label}</span>
            <span class="ais-RefinementList-count">${item.count}</span>
          </label>
        </div>
      `,
    },
  }),
  

instantsearch.widgets.panel({
  templates: { header: () => 'rating' },

})(instantsearch.widgets.refinementList)({
container: '#rating-list',
attribute: 'rating',
limit: 6,
showMore: true,
sortBy: ['rating:asc'], // Sort by rating in ascending order
}),

// a range slider widget 
//(instantsearch.widgets.rangeSlider)({
//  container: '#price-slider',
//  attribute: 'price',
//  pips: false,
//  tooltips: {
//    format(value) {
//      if (value < 3) return 'Low';
//      if (value < 7) return 'Mid';
//      if (value >= 7) return 'High';
//    },
//  },
//}),

  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

// optional to set consumer token
//search.use(instantsearch.middlewares.createInsightsMiddleware({
//  insightsClient: window.aa,
//}))
//window.aa('setUserToken', 'my-user-id');

search.start();
