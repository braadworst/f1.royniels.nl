module.exports = (api, router) => {
  const forms = [].slice.call(document.querySelectorAll('.pure-form'));

  forms.forEach(form => {
    let result;
    form.addEventListener('submit', async function(event) {
      event.preventDefault();

      const best                = form.querySelector('[name="best"]');
      const fastest             = form.querySelector('[name="fastest"]');
      const notificationError   = form.querySelector('.notification-error');
      const notificationSuccess = form.querySelector('.notification-success');

      let record = {
        userId          : parseInt(form.querySelector('[name="userId"]').value),
        circuitId       : parseInt(form.querySelector('[name="circuitId"]').value),
        bestDriverId    : parseInt(best.options[best.selectedIndex].value),
        fastestDriverId : parseInt(fastest.options[fastest.selectedIndex].value)
      };

      if (result && result.id) {
        record.id = result.id;
      } else if (form.querySelector('[name="predictionId"]')) {
        record.id = parseInt(form.querySelector('[name="predictionId"]').value);
      }

      try {
        result = await api.set('prediction', record);
        if (result && result.error) {
          toggleError(form, result.error);
        } else {
          toggleSuccess(form);
        }
      } catch (error) {
        toggleError(form, 'Fill in both, best AND fastest driver');
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
