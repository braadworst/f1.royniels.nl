const settings = require('../../settings');

module.exports = (api) => {

  let startBudget = 150000000, budget;

  const drivers = [].slice.call(document.querySelectorAll('.item-create-driver'));
  const engines = [].slice.call(document.querySelectorAll('.item-create-engine'));
  const chassis = [].slice.call(document.querySelectorAll('.item-create-chassis'));
  const save    = document.querySelector('.button');
  const all     = [...drivers, ...engines, ...chassis];

  // Add button listeners
  if (save) {
    save.addEventListener('click', async function(event) {
      event.preventDefault();
      try {
        const result = await api.set('team', getFormData());
        if (result.error) {
          const notification = document.querySelector('#team .notification');
          notification.innerHTML = result.error;
          notification.classList.remove('hidden');
        } else {
          window.location.href = '/teams';
        }
      } catch (errors) {
        const notification = document.querySelector('#team .notification');
        notification.innerHTML = 'Please select two drivers, an engine, a chassis and give your team a name';
        notification.classList.remove('hidden');
      }
    });

    // Add event listeners
    all.forEach(item => {
      item.addEventListener('click', event => {
        event.preventDefault();
        update(item, drivers, settings.driversLimit, 'item-create-driver', all);
        update(item, engines, settings.enginesLimit, 'item-create-engine', all);
        update(item, chassis, settings.chassisLimit, 'item-create-chassis', all);
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
    } else if (current.classList.contains(className) && selected.length < limit && !current.classList.contains('item-create-inactive')) {
      current.classList.add('item-create-selected');
    }
    toggleInactive(items, limit);
  }

  function toggleInactive(items, limit) {
    const selected   = items.filter(item => item.classList.contains('item-create-selected'));
    const unselected = items.filter(item => !item.classList.contains('item-create-selected'));

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
    if (document.querySelector('.budget')) {
      document.querySelector('.budget').innerHTML = budget.toLocaleString();
    }
  }

  function getFormData() {
    let firstDriver  = document.querySelectorAll('.item-create-driver.item-create-selected')[0];
    let secondDriver = document.querySelectorAll('.item-create-driver.item-create-selected')[1];
    let engine       = document.querySelector('.item-create-engine.item-create-selected');
    let chassis      = document.querySelector('.item-create-chassis.item-create-selected');
    let name         = document.querySelector('[name="name"]').value;
    let userId       = parseInt(document.querySelector('[data-user-id]').getAttribute('data-user-id'));
    let teamId       = parseInt(document.querySelector('[data-team-id]').getAttribute('data-team-id'))
    let editDate     = document.querySelector('[data-edit-date]').getAttribute('data-edit-date')
    let output       = { userId };

    if (editDate) {
      output.editDate = editDate;
    }

    if (teamId) {
      output.id = teamId;
    }

    if (name) {
      output.name = name;
    }

    if (engine) {
      output.engineId = parseInt(engine.getAttribute('data-id'));
    }

    if (chassis) {
      output.chassisId = parseInt(chassis.getAttribute('data-id'));
    }

    if (firstDriver) {
      output.firstDriverId = parseInt(firstDriver.getAttribute('data-id'));
    }

    if (secondDriver) {
      output.secondDriverId = parseInt(secondDriver.getAttribute('data-id'));
    }
    console.log(output);
    return output;
  }

  toggleInactive(drivers, settings.driversLimit);
  toggleInactive(chassis, settings.chassisLimit);
  toggleInactive(engines, settings.enginesLimit);
  calculateBudget();
}
