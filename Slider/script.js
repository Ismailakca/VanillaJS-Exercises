const models = [
    {
        name:'Bmw 418d',
        image: './img/bmw.jpg'
    },
    {
        name:'Mazda ',
        image: './img/mazda.jpg'
    },
    {
        name:'honda',
        image: './img/honda.jpg'
    },
    {
        name:'Volvo',
        image: './img/volvo.jpg'
    },
    {
        name:'Skoda ',
        image: './img/skoda.jpg'
    }

]
var settings = {
    duration: '2000',
    random:false,
}
var interval ;

let index = 0;
let slaytCount = models.length;


init(settings)
function showSlide(i){

    index = i;
    if(i < 0){
        index= slaytCount - 1;
    }
    if (i >= slaytCount ){
        index = 0
    }
    document.querySelector('.card-title').textContent = models[index].name;
    document.querySelector('.card-img-top').setAttribute('src',models[index].image)

}
function init(settings){
    let prev;
    interval = setInterval(()=>{
        if (settings.random){
            do {
                index = Math.floor(Math.random() * slaytCount)
            }while (index === prev)
                prev = index;

        }else{
            if (slaytCount === index + 1 ){
                index = -1;
            }
            showSlide(index)
            index++;
        }
        showSlide(index)
    },settings.duration)
}
document.querySelectorAll('.arrow').forEach(function (item){
    item.addEventListener('mouseenter',function (){
        clearInterval(interval)
    })
})
document.querySelectorAll('.arrow').forEach(function (item){
    item.addEventListener('mouseleave',function (){
        init(settings)
    })
})

document.querySelector('.fa-arrow-circle-left').addEventListener('click', () => {
    index--;
    showSlide(index)
})
document.querySelector('.fa-arrow-circle-right').addEventListener('click', () => {
    index++;
    showSlide(index)
    console.log(index)
})