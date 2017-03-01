const loaded  = require('./html/loaded');
const loading = require('./html/loading');
const failed  = require('./html/failed');
const loader  = require('../../data/loader');
const schema  = require('../../schemas/team');

module.exports = function() {

  // Total budget
  const startBudget = 150000000;
  let budget        = startBudget;

  return {
    async create(renderer, store) {
      try {
        renderer.render(loading());
        const data = Object.assign(
          {},
          await loader('drivers', 'engines', 'chassis', store),
          { startBudget }
        );
        renderer.render(loaded(data), true);
      } catch(errors) {
        renderer.render(failed());
      }
    },
    init(renderer, store) {
      addHandlers(store);
    },
    added(renderer, store) {
      addHandlers(store);
    }
  }

  function addHandlers(store) {
    const drivers = [].slice.call(document.querySelectorAll('.item-create-driver'));
    const engines = [].slice.call(document.querySelectorAll('.item-create-engine'));
    const chassis = [].slice.call(document.querySelectorAll('.item-create-chassis'));
    const save    = document.querySelector('.button');
    const all     = drivers.concat(engines, chassis);

    // Add button listeners
    save.addEventListener('click', event => {
      event.preventDefault();
      console.log(schema);
    });

    // Add event listeners
    all.forEach(item => {
      item.addEventListener('click', event => {
        event.preventDefault();
        update(item, drivers, 2, 'item-create-driver', all);
        update(item, engines, 1, 'item-create-engine', all);
        update(item, chassis, 1, 'item-create-chassis', all);
        calculateBudget();
        disableOverBudget(all);
      });
    });
  }

  function update(current, items, limit, className, all) {
    let selected, unselected

    selected = items.filter(item => item.classList.contains('item-create-selected'));

    if (current.classList.contains('item-create-selected') && current.classList.contains(className)) {
      current.classList.remove('item-create-selected');
    } else if (current.classList.contains(className) && selected.length < limit) {
      current.classList.add('item-create-selected');
    }

    selected   = items.filter(item => item.classList.contains('item-create-selected'));
    unselected = items.filter(item => !item.classList.contains('item-create-selected'));

    // Inactive if limit is reached for section
    if (selected.length === limit) {
      unselected.forEach(item => item.classList.add('item-create-inactive'));
    } else {
      unselected.forEach(item => item.classList.remove('item-create-inactive'));
    }
  }

  function disableOverBudget(items) {
    items.forEach(item => {
      if (
        !item.classList.contains('item-create-inactive') &&
        parseInt(item.getAttribute('data-price')) > budget &&
        !item.classList.contains('item-create-selected')
      ) {
        item.classList.add('item-create-inactive');
      }
    });
  }

  function calculateBudget() {
    let items = [].slice.call(document.querySelectorAll('.item-create-selected'));

    budget = startBudget;
    items.forEach(item => {
      budget = budget - parseInt(item.getAttribute('data-price'));
    });
    document.querySelector('.budget').innerHTML = budget.toLocaleString();
  }
}
