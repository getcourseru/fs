export function addPlaceholder() {
    const [nameInput, ] = document.getElementsByName('formParams[full_name]');
    nameInput.placeholder = `Имя`;
    const [emailInput, ] = document.getElementsByName('formParams[email]');
    emailInput.placeholder = `Email`;
    const [phoneInput, ] = document.getElementsByName('formParams[phone]');
    phoneInput.placeholder = `Телефон`;
}