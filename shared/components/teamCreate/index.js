const loaded  = require('./loaded');
const loading = require('./loading')();
const failed  = require('./failed')();

module.exports = component => {

  let startBudget = 150000000;

  component
    .data('drivers', 'engines', 'chassis')
    .loading(() => component.render(loading))
    .failed(() => component.render(failed))
    .loaded((drivers, engines, chassis, user) => {
      component.render(loaded(drivers, engines, chassis, startBudget));
    })
    .ready(() => {
      console.log('ready');
      const drivers = [].slice.call(document.querySelectorAll('.item-create-driver'));
      const engines = [].slice.call(document.querySelectorAll('.item-create-engine'));
      const chassis = [].slice.call(document.querySelectorAll('.item-create-chassis'));
      const save    = document.querySelector('.button');
      const all     = drivers.concat(engines, chassis);

      let budget;

      // Add button listeners
      save.addEventListener('click', async function(event) {
        event.preventDefault();
          try {
            await component.save('teams', getFormData());
          } catch (error) {
            console.log(error);
          }
        // }
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
    })
}
