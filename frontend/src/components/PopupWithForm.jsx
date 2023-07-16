import React, { useRef } from 'react';

function PopupWithForm({
  children,
  setErrors,
  name,
  title,
  onSubmit,
  isOpen,
  onClose,
}) {
  const formRef = useRef(null);

  const handleInput = (event) => {
    const input = event.target;
    const errors = { ...setErrors };

    if (!input.form) {
      return;
    }
    if (!input.validity.valid) {
      errors[input.name] = input.validationMessage;
    } else {
      errors[input.name] = '';
    }
    setErrors(errors);
  };

  const isInvalid = () => {
    if (!formRef.current) return false;
    const formInputs = formRef.current.elements;
    return Array.from(formInputs).some((input) => input.validity.valid === false);
  };

  return (
    <section
      className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}
    >
      <div className="popup__container">
        <button
          aria-label="close-popup"
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
        <h3 className="popup__title">{title}</h3>
        <form
          className={`popup_form popupform_type${name}`}
          name={name}
          onSubmit={onSubmit}
          onInput={handleInput}
          ref={formRef}
          noValidate
        >
          {children}
          <button
            type="submit"
            className={`popup__button popup__button_type_${name} 
            ${isInvalid() ? 'popup__button_disabled' : ''}`}
            disabled={isInvalid()}
          >
            {name === 'delete_card' ? 'Si' : 'Guardar'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
