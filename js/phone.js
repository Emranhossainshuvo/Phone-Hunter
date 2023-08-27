const loadPhone = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
    const data = await res.json();
    // console.log(data.data);
    displayPhones(data.data)
}

const displayPhones = phones => {
    const phoneContainer = document.getElementById('phone-container');
    phones.forEach(phone => {
        console.log(phone)
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-gray-200 shadow-xl`;
        phoneCard.innerHTML = `
                    <figure class="px-1 pt-5">
                        <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">${phone.phone_name}</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions">
                            <button class="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
        `
        phoneContainer.appendChild(phoneCard);
    });
}

// search button handle

const handleSearch = () => {
    console.log('hi')
}


loadPhone();