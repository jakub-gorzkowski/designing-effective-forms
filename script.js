let clickCount = 0;

const countryInput = document.getElementById('country');
const countryCodeSelect = document.getElementById('countryCode');
const myForm = document.getElementById('form');
const modal = document.getElementById('form-feedback-modal');
const clicksInfo = document.getElementById('click-count');

function handleClick() {
    clickCount++;
    clicksInfo.innerText = clickCount;
}

async function fetchAndFillCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
            throw new Error('Błąd pobierania danych');
        }
        const data = await response.json();
        const countries = data.map(country => country.name.common).sort();
        countryInput.innerHTML = '<option value="">Wybierz kraj</option>' +
            countries.map(country => `<option value="${country}">${country}</option>`).join('');
    } catch (error) {
        console.error('Wystąpił błąd:', error);
    }
}

function getCountryByIP() {
    fetch('https://get.geojs.io/v1/ip/geo.json')
        .then(response => response.json())
        .then(data => {
            const country = data.country;
            const option = [...countryInput.options].find(opt => opt.text.toLowerCase() === country.toLowerCase());
            if (option) {
                countryInput.value = option.value;
                getCountryCode(option.value);
            }
        })
        .catch(error => {
            console.error('Błąd pobierania danych z serwera GeoJS:', error);
        });
}

function getCountryCode(countryName) {
    const apiUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Błąd pobierania danych');
        }
        return response.json();
    })
    .then(data => {
        const countryCode = data[0].idd.root + (data[0].idd.suffixes ? data[0].idd.suffixes[0] : "");
        const codeOption = [...countryCodeSelect.options].find(opt => opt.value === countryCode);
        if (codeOption) {
            countryCodeSelect.value = codeOption.value;
        } else {
            const newOption = document.createElement('option');
            newOption.value = countryCode;
            newOption.text = `${countryCode} (automatycznie)`;
            countryCodeSelect.appendChild(newOption);
            countryCodeSelect.value = countryCode;
        }
    })
    .catch(error => {
        console.error('Wystąpił błąd:', error);
    });
}

(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('DOMContentLoaded', () => {
        fetchAndFillCountries().then(() => {
            getCountryByIP();
        });
    });
})();


document.addEventListener('DOMContentLoaded', () => {
    const invoiceField = document.getElementById('invoiceData');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const street = document.getElementById('street');
    const city = document.getElementById('city');
    const zip = document.getElementById('zipCode');
    const country = document.getElementById('country');

    function fillInvoiceData() {
        invoiceField.value = `${firstName.value} ${lastName.value}\n${street.value}\n${zip.value} ${city.value}\n${country.value}`;
    }

    firstName.addEventListener('blur', fillInvoiceData);
    lastName.addEventListener('blur', fillInvoiceData);
    street.addEventListener('blur', fillInvoiceData);
    city.addEventListener('blur', fillInvoiceData);
    zip.addEventListener('blur', fillInvoiceData);
    country.addEventListener('change', fillInvoiceData);
});
