module.exports = (api, router) => {
  const forms = [].slice.call(document.querySelectorAll('.pure-form'));

  forms.forEach(form => {
    form.addEventListener('submit', async function(event) {
      event.preventDefault();
      record = {
        id        : parseInt(form.querySelector('[name="resultId"]').value),
        circuitId : parseInt(form.querySelector('[name="circuitId"]').value)
      };

      const ids = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'best', 'fastest'];

      ids.forEach(id => {
        const dropdown = form.querySelector(`[name="${ id }"]`);
        record[id]     = parseInt(dropdown.options[dropdown.selectedIndex].value);
      });

      console.log(record);

      try {
        await api.set('result', record);
        notificationSuccess.classList.remove('hidden');
        notificationError.classList.add('hidden');
      } catch (error) {
        console.log(error);
        notificationSuccess.classList.add('hidden');
        notificationError.classList.remove('hidden');
      }
    });
  });
}
