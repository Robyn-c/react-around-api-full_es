import React from "react";
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, handleExternalClick}) => {
    
    const imageRef = React.useRef();
    const [errors, setErrors] = React.useState({}); 

    const handleSubmit = (e) => {
      e.preventDefault();
      onUpdateAvatar(imageRef.current.value,);
      e.target.reset();
      onClose();
    }

    return (
      <PopupWithForm
        name="image_profile"
        title="Cambiar foto de Perfil"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        errors={errors}
        setErrors={setErrors}
        handleExternalClick={handleExternalClick}>
        <>
          <label className="popup__field" htmlFor="popup-input-image">
            <input
              type="url"
              name="image-link"
              placeholder="Imagen URL"
              id="popup-input-image"
              className="popup__input"
              ref={imageRef}
              required
            />
            <span className="popup__error popup__error_visible">
              {errors['image-link']}
            </span>
          </label>
        </>
      </PopupWithForm>
    );
}

export default EditAvatarPopup;