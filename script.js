const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('Movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');

getFromLocalStorage();
calculatePrice();

container.addEventListener('click', function(e){
    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')){
        e.target.classList.toggle('selected');
        calculatePrice();
    }
});

select.addEventListener('change',function(e){
    calculatePrice();
});

function calculatePrice(){
    const selectedSeats = container.querySelectorAll('.seat.selected');
    
    const selectedSeatsArr=[];
    const seatsArr= [];

    selectedSeats.forEach(function(seat){
        selectedSeatsArr.push(seat);
    }); //alternative is spread method

    seats.forEach(function(seat){
        seatsArr.push(seat);
    });

    let selectedSeatIndexs = selectedSeatsArr.map(function(seat){
        return seatsArr.indexOf(seat);
    });

    let selectedCount = selectedSeats.length;
    count.innerText= selectedCount;
    amount.innerText = select.value * selectedCount;

    slocalStorage(selectedSeatIndexs);
}

function slocalStorage(indexs){
    localStorage.setItem('selectedSeats',JSON.stringify(indexs));
    localStorage.setItem('selectedMovieIndex',select.selectedIndex);
}

function getFromLocalStorage(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats != null && selectedSeats.length>0){
        seats.forEach(function(seat,index){
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex != null){
        select.selectedIndex = selectedMovieIndex;
    }

}