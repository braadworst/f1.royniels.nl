module.exports = (api, router) => {
  const forms = [].slice.call(document.querySelectorAll('.pure-form'));

  forms.forEach(form => {
    form.addEventListener('submit', async function(event) {
      event.preventDefault();

      const notificationError   = form.querySelector('.notification-error');
      const notificationSuccess = form.querySelector('.notification-success');

      let record = {
        circuitId : parseInt(form.querySelector('[name="circuitId"]').value)
      };

      if (form.result) {
        console.log(form);
        record.id = form.result.id;
      } else if (form.querySelector('[name="resultId"]')) {
        console.log('element: ', form.querySelector('[name="resultId"]').value);
        record.id = parseInt(form.querySelector('[name="resultId"]').value);
      }

      console.log(record.id);

      const ids = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'best', 'fastest'];

      ids.forEach(id => {
        const dropdown = form.querySelector(`[name="${ id }"]`);
        record[id]     = parseInt(dropdown.options[dropdown.selectedIndex].value);
      });

      try {
        form.result = await api.set('result', record);
        notificationSuccess.classList.remove('hidden');
        notificationError.classList.add('hidden');
      } catch (error) {
        notificationSuccess.classList.add('hidden');
        notificationError.classList.remove('hidden');
      }
    });
  });
}
