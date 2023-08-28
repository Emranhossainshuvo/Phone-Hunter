const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    // console.log(data.data);
    displayPhones(data.data, isShowAll)
}

const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    const showAllButoon = document.getElementById('show-all-container');

    if(phones.length > 12 && !isShowAll){
        showAllButoon.classList.remove('hidden')
    }else{
        showAllButoon.classList.add('hidden')
    }
    // console.log(isShowAll)
    if(!isShowAll){
        phones = phones.slice(0,12)
    }

    phones.forEach(phone => {
        // console.log(phone)
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-gray-200 shadow-xl`;
        phoneCard.innerHTML = `
        <figure class="px-1 pt-5">
        <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p></p>
        <div class="card-actions">
        <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary mt-3">Show details</button>
        </div>
        </div>
        `
        phoneContainer.appendChild(phoneCard);
        // if(phoneContainer = )
    });
    // if result couldn's found
    const resultErrorMessage = document.getElementById('result-not-found');
    if(phoneContainer.childNodes.length === 0){
        resultErrorMessage.classList.remove('hidden')
    }else{
        resultErrorMessage.classList.add('hidden')
    }
    toggleLoadingSpinner(false)
}

// show detail modal
const handleShowDetail = async (id) => {
    // console.log('clicked', id)
    // load single data 
   const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
   const data = await res.json();
   const phone = data.data;
   showPhoneDetails(phone)
//    console.log(data.data)
}

// show phone details function

const showPhoneDetails = (phone) => {
    // console.log(phone)
    // show the mordal
    // const phoneName = document.getElementById('show-detail-phone-name');
    // phoneName.innerText = phone.name
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <img src="${phone.image}" alt="" />
    <h3>${phone.name}</h3>
    <h2>Storage: ${phone.mainFeatures.storage}</h2>
    <p>Display size: ${phone.mainFeatures.displaySize}</p>
    <p>Chipset: ${phone.mainFeatures.chipSet}</p>
    <p>Memory: ${phone.mainFeatures.memory}</p>
    <p>Release Date: ${phone.releaseDate}</p>
    <p>Brand: ${phone.brand}</p>
    <p>GPS: ${phone?.others?.GPS || 'No GPS data available'}</p>
    `
    show_details_modal.showModal()

}



// search button handle

const inputField = document.getElementById('input-field');
const handleSearch = (isShowAll) => {
    if(inputField.value == null || inputField.value == ''){
        alert ('Please write something in the field');
        return;
    }
    toggleLoadingSpinner(true);
    const inputText = inputField.value;
    loadPhone(inputText, isShowAll);
    inputField.value = '';
}

const toggleLoadingSpinner = (isloading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    isloading ? loadingSpinner.classList.remove('hidden') : loadingSpinner.classList.add('hidden'); 
}

const handleShowAll = () =>{
    handleSearch(true);
}
// loadPhone();