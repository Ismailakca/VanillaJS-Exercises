const container = document.querySelector('.container')
const count = document.querySelector('#count')
const amount = document.getElementById('amount')
const select = document.getElementById('movie')
const seats = document.querySelectorAll('.seat:not(.reserved)')

getFromLocalStorage()
calculateTotal()
container.addEventListener('click',(e)=>{
    if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')){
            e.target.classList.toggle('selected')
        calculateTotal()

    }
})

select.addEventListener('change',(e) => {
    calculateTotal()
})

function calculateTotal(){
    const selectedSeats = container.querySelectorAll('.seat.selected')

    let selectedSeatArr = [];
    let seatsArr = [];

    selectedSeats.forEach((seat)=>{
        selectedSeatArr.push(seat)
    })

    seats.forEach((seat)=> {
        seatsArr.push(seat)
    })

    let selectedSeatIndexs = selectedSeatArr.map((seat)=>{
        return seatsArr.indexOf(seat)
    })

    let selectedSeatCount = selectedSeats.length
    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * select.value;

    saveToLocalStorage(selectedSeatIndexs)
}

function saveToLocalStorage(index){
    localStorage.setItem('selectedSeats',JSON.stringify(index))
    localStorage.setItem('selectedMovieIndex',select.selectedIndex)
}

function getFromLocalStorage(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
    const selectedMoviIndex = localStorage.getItem('selectedMovieIndex')

    if (selectedMoviIndex !== null){
        select.selectedIndex = selectedMoviIndex
    }

    if (selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat,index)=>{
            if (selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected')
            }
        })
    }
}
