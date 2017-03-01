const Ajv       = require('ajv');
const ajv       = new Ajv();
const loaded    = require('./html/loaded');
const loading   = require('./html/loading');
const failed    = require('./html/failed');
const loader    = require('../../data/loader');
const schema    = require('../../schemas/teams');
const request   = require('../../data/request');

// TEMP
const usedId = 1;

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
        console.log(errors);
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
    save.addEventListener('click', async function(event) {
      event.preventDefault();
      let data = getFormData();

      // Validate input
      if (!ajv.validate(JSON.parse(schema), data)) {
        console.log(ajv.errors);
        console.log(data);
      } else {
        try {
          await request.createTeam(data);
        } catch (error) {
          console.log(error);
        }
      }
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

  function getFormData() {
    let firstDriver  = document.querySelectorAll('.item-create-driver.item-create-selected')[0];
    let secondDriver = document.querySelectorAll('.item-create-driver.item-create-selected')[1];
    let engine       = document.querySelector('.item-create-engine.item-create-selected');
    let chassis      = document.querySelector('.item-create-chassis.item-create-selected');
    let name         = document.querySelector('[name="name"]').value;
    let output       = { userId };

    if (name) {
      output.name = name;
    }

    if (engine) {
      output.engineId = engine.getAttribute('data-id');
    }

    if (chassis) {
      output.chassisId = chassis.getAttribute('data-id');
    }

    if (firstDriver) {
      output.firstDriverId = firstDriver.getAttribute('data-id');
    }

    if (secondDriver) {
      output.secondDriverId = secondDriver.getAttribute('data-id');
    }

    return output;
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
