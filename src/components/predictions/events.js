module.exports = (api, router) => {
  const forms = [].slice.call(document.querySelectorAll('.pure-form'));

  forms.forEach(form => {
    form.addEventListener('submit', async function(event) {
      event.preventDefault();
      const userId              = parseInt(form.querySelector('[name="userId"]').value);
      const circuitId           = parseInt(form.querySelector('[name="circuitId"]').value);
      const best                = form.querySelector('[name="best"]');
      const bestDriverId        = parseInt(best.options[best.selectedIndex].value);
      const fastest             = form.querySelector('[name="fastest"]');
      const fastestDriverId     = parseInt(fastest.options[fastest.selectedIndex].value);
      const notificationError   = form.querySelector('.notification-error')
      const notificationSuccess = form.querySelector('.notification-success')

      try {
        await api.set('prediction', { userId, circuitId, bestDriverId, fastestDriverId });
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
