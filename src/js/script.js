const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

const nationality = [
    'American',
    'Belarusian',
    'British',
    'Italian',
    'Japanese',
    'Russian',
];

const nationalitySelect = document.querySelector('#nationality');
const dateBirth = document.querySelector('.form-signup__fieldset_dateBirth');
const dateSelect = dateBirth.querySelector('#date');
const monthSelect = dateBirth.querySelector('#month');
const yearSelect = dateBirth.querySelector('#year');
let currentDate = new Date();
let currentYear = currentDate.getFullYear();

// Вывод вариантов национальностей
for (let i = 0; i <= nationality.length; i++) {
    const option = document.createElement('option');
    option.value = nationality[i];
    option.textContent = nationality[i];

    nationalitySelect.append(option);
}

// Вывод вариантов дат
for (let i = 1; i <= 31; i++) {
    const option = document.createElement('option');
    if (i < 10) {
        option.value = `0${i}`;
        option.textContent = `0${i}`;
    } else {
        option.value = i;
        option.textContent = i;
    }

    dateSelect.append(option);
}

// Вывод вариантов месяцев
for (let i = 0; i <= months.length; i++) {
    const option = document.createElement('option');
    option.value = months[i];
    option.textContent = months[i];

    monthSelect.append(option);
}

// Вывод года
for (let i = 0; i < 100; i++) {
    const option = document.createElement('option');
    let year = currentYear - 1;
    option.value = year;
    option.textContent = year;
    currentYear--;

    yearSelect.append(option);
}


// Подсказки при неправильном заполнении поля
// Открытие
function showTooltip(block, text) {
    hideTooltip(block);

    const tooltip = document.createElement('div');
    const tooltipBody = document.createElement('span');
    tooltip.classList = 'tooltip';
    tooltipBody.classList = 'tooltip__body';
    tooltipBody.textContent = text;

    tooltip.append(tooltipBody);

    setTimeout(() => {
        block.append(tooltip);
    }, 200);
}
// Закрытие
function hideTooltip(block) {
    const tooltip = block.querySelector('.tooltip');

    if (tooltip) {
        tooltip.remove();
    }
}

// Всплывающее окно при отправке формы
// Открытие
function showPopup(block, title, text, btnText = 'Close') {
    const popup = document.createElement('div');
    popup.classList = 'popup';

    popup.insertAdjacentHTML('afterbegin', `
    <div class="popup__body">
        <h2 class="popup__title title">${title}</h2>
        <p class="popup__text text">${text}</p>
        <button class="popup__button button">${btnText}</button>
    </div>
    `);

    block.append(popup);
    closePopup();
}
// Закрытие
function closePopup() {
    const popup = document.querySelector('.popup');
    const btn = document.querySelector('.popup__button');

    btn.addEventListener('click', () => {
        if (btn.textContent === 'Close') {
            popup.remove();
            renderSuccessfulPage();
        } else if (btn.textContent === 'Try Again') {
            popup.remove();
        }
    })
}

// Страница успешной регистрации
function renderSuccessfulPage() {
    const content = document.querySelector('.content');
    const icon = content.querySelector('.bg-icon');
    const signup = content.querySelector('.signup');
    const formBtn = content.querySelector('.footer__signup-button');
    icon.remove();
    signup.remove();
    formBtn.remove();

    const result = document.createElement('div');
    result.classList = 'content__result result';
    result.insertAdjacentHTML('afterbegin', `
        <h2 class="result__title title">Thank You!</h2>
        <p class="result__text text">you registered!</p>
    `)

    content.prepend(result);

}

// Функция для сохранения данных пользователя
function saveData(arr, newArr) {
    for (let i = 0; i < arr.length; i++) {
        newArr.push([arr[i].name, arr[i].value])
    }
}

// Работа с формой
const content = document.querySelector('.content');
const formBtn = document.querySelector('.footer__signup-button');
const form = document.querySelector('#form-signup');
const firstName = form.querySelector('[name="firstName"]');
const lastName = form.querySelector('[name="lastName"]');
const email = form.querySelector('.form-signup__item_email');
const emailInput = form.querySelector('[name="email"]');
const gender = form.querySelectorAll('[name="gender"]');
const password = form.querySelector('.form-signup__item_password');
const passwordInput = form.querySelector('[name="password"]');
const confirmPassword = form.querySelector('.form-signup__item_confirmPassword');
const confirmPasswordInput = form.querySelector('[name="confirmPassword"]');

const fields = [
    firstName,
    lastName,
    nationalitySelect,
    emailInput,
    passwordInput
];

const dateBirthFields = [
    dateSelect,
    monthSelect,
    yearSelect,
];


// Плавное появление полей при загрузке страницы
window.addEventListener('load', () => {
    let formItems = form.children;
    let time = 90;
    for (let i = 0; i < formItems.length; i++) {
        time += 490;
        setTimeout(() => {
            formItems[i].classList.add('show');
        }, time);
    }
})

// Валидация формы
// Функции для проверки полей формы
function сheckName(input) {
    if (input.value === '') {
        input.classList.add('error');
        return false
    } else {
        input.classList.remove('error');
        return true
    }
}

function сheckEmail(input) {
    const validEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    const errorText = 'Enter the correct email address!';

    if (input.value === '') {
        input.classList.remove('checked');
        input.classList.add('error');
        input.style.color = 'inherit';
        hideTooltip(email);
        return false
    } else if (!validEmail.test(input.value)) {
        input.classList.remove('checked');
        input.classList.add('error');
        input.style.color = '#FF2828';
        showTooltip(email, errorText);
        return false
    } else {
        input.classList.remove('error');
        input.style.color = 'inherit';
        input.classList.add('checked');
        hideTooltip(email);
        return true
    }
}

function сheckSelect(select) {
    if (select.value === 'none') {
        select.classList.add('error');
        return false
    } else {
        select.classList.remove('error');
        return true
    }
}

function сheckPassword(input) {
    const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,100}$/;
    const errorText = 'Write at least 8 symbols with numbers, upper and lower case letters';

    if (input.value === '') {
        input.classList.remove('checked');
        input.classList.add('error');
        hideTooltip(password);
        return false
    } else if (!input.value.match(validPassword)) {
        input.classList.remove('checked');
        input.classList.add('error');
        showTooltip(password, errorText);
        return false
    } else {
        input.classList.remove('error');
        input.classList.add('checked');
        hideTooltip(password);
        return true
    }
}

function сheckConfirmPassword(input) {
    const errorText = 'The passwords does not match!';

    if (input.value === '') {
        input.classList.remove('checked');
        input.classList.add('error');
        hideTooltip(confirmPassword);
        return false
    } else if (passwordInput.classList.contains('checked') && input.value !== passwordInput.value) {
        input.classList.remove('checked');
        input.classList.add('error');
        showTooltip(confirmPassword, errorText);
        return false
    } else if (passwordInput.classList.contains('checked') && input.value === passwordInput.value) {
        input.classList.remove('error');
        input.classList.add('checked');
        hideTooltip(confirmPassword);
        return true
    }
}

// Проверка формы при взаимодействии с полями
firstName.addEventListener('input', () => {
    сheckName(firstName);
});

lastName.addEventListener('input', () => {
    сheckName(lastName);
});

nationalitySelect.addEventListener('change', () => {
    сheckSelect(nationalitySelect)
});

emailInput.addEventListener('change', () => {
    сheckEmail(emailInput);
});

dateSelect.addEventListener('change', () => {
    сheckSelect(dateSelect);
});

monthSelect.addEventListener('change', () => {
    сheckSelect(monthSelect);
});

yearSelect.addEventListener('change', () => {
    сheckSelect(yearSelect);
});

passwordInput.addEventListener('change', () => {
    сheckPassword(passwordInput);
});

confirmPasswordInput.addEventListener('change', () => {
    сheckConfirmPassword(confirmPasswordInput);
});


// Проверка формы при нажатии на кнопку 'Complete Signup'
formBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Убираем все стили для полей
    if (formBtn.classList.contains('error')) {
        formBtn.classList.remove('error');
    }

    // Если нет ошибок в форме
    if (сheckName(firstName) === true &&
        сheckName(lastName) === true &&
        сheckSelect(nationalitySelect) === true &&
        сheckEmail(emailInput) === true &&
        сheckSelect(dateSelect) === true &&
        сheckSelect(monthSelect) === true &&
        сheckSelect(yearSelect) === true &&
        сheckPassword(passwordInput) === true &&
        сheckConfirmPassword(confirmPasswordInput) === true) {

        // Создаем массивы для полей формы
        // для всех полей кроме dateSelect, monthSelect, yearSelect
        const userInfo = [];
        // для полей dateSelect, monthSelect, yearSelect
        const userDateBirth = [];

        // добавляем ключ и значение из поля 'Пол' в userInfo
        gender.forEach((item) => {
            if (item.checked) {
                userInfo.push([item.name, item.value]);
            }
        })

        // добавляем ключ и значение из полей: dateSelect, monthSelect, yearSelect в userDateBirth
        saveData(dateBirthFields, userDateBirth);
        // добавляем ключ и значение из всех остальных полей в userInfo
        saveData(fields, userInfo);

        // массивы userInfo и userDateBirth делаем объектами
        const objectDateBirth = Object.fromEntries(userDateBirth);
        const userData = Object.fromEntries(userInfo);

        // добавляем дату рождения в основной объект userData
        userData.dateBirth = objectDateBirth;

        // Отправляем данные на сервер
        sendData(userData);

    } else {
        // Запускаем проверку всех полей
        сheckName(firstName);
        сheckName(lastName);
        сheckSelect(nationalitySelect);
        сheckEmail(emailInput);
        сheckSelect(dateSelect);
        сheckSelect(monthSelect);
        сheckSelect(yearSelect);
        сheckPassword(passwordInput);
        сheckConfirmPassword(confirmPasswordInput);

        // Добавляем для кнопки 'Complete Signup' класс .error и кнопка потрясется из стороны в сторону
        setTimeout(() => {
            formBtn.classList.add('error');
        }, 100);
    }
})

// Очищаем форму от данных
function resetForm() {
    emailInput.classList.remove('checked');
    passwordInput.classList.remove('checked');
    confirmPasswordInput.classList.remove('checked');
    form.reset();
}

// Отправка данных на сервер
function sendData(data) {
    fetch('https://reqres.in/api/users', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then((response) => {
        if (!response.ok) {
            showPopup(content, 'Oh No!', 'Something went wrong. Try again later.', 'Try Again');
        } else {
            resetForm();
            console.log(data);
            showPopup(content, 'Success!', 'Registration was successful.');
            return response.json();
        }
    })
}





