module.exports = (api, router) => {
  const forms = [].slice.call(document.querySelectorAll('.pure-form'));

  forms.forEach(form => {
    let result;
    form.addEventListener('submit', async function(event) {
      event.preventDefault();

      let record = {
        circuitId : parseInt(form.querySelector('[name="circuitId"]').value)
      };

      if (result && result.id) {
        record.id = result.id;
      } else if (form.querySelector('[name="resultId"]')) {
        record.id = parseInt(form.querySelector('[name="resultId"]').value);
      }

      const ids = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'best', 'fastest'];

      ids.forEach(id => {
        const dropdown = form.querySelector(`[name="${ id }"]`);
        record[id]     = parseInt(dropdown.options[dropdown.selectedIndex].value);
      });

      try {
        result = await api.set('result', record);
        if (result && result.error) {
          toggleError(form, result.error);
        } else {
          toggleSuccess(form);
        }
      } catch (error) {
        toggleError(form, 'Fill in all fields');
      }
    });
  });

  function toggleError(form, message) {
    const notificationError   = form.querySelector('.notification-error');
    const notificationSuccess = form.querySelector('.notification-success');
    notificationError.innerHTML = message;
    notificationSuccess.classList.add('hidden');
    notificationError.classList.remove('hidden');
    setTimeout(() => {
      notificationSuccess.classList.add('hidden');
      notificationError.classList.add('hidden');
    }, 3000);
  }

  function toggleSuccess(form) {
    const notificationError   = form.querySelector('.notification-error');
    const notificationSuccess = form.querySelector('.notification-success');

    notificationSuccess.classList.remove('hidden');
    notificationError.classList.add('hidden');
    setTimeout(() => {
      notificationSuccess.classList.add('hidden');
      notificationError.classList.add('hidden');
    }, 3000);
  }
}
