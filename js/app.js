'use strict';

let objsArr = [];
let keywordsArr = [];

// Creating the constructor
function Image(image){ //image is the JSON object
    this.image_url = image.image_url;
    this.title = image.title;
    this.description = image.description;
    this.keyword = image.keyword;
    this.horns = image.horns;
    objsArr.push(this);
}

// Render the content using clone
Image.prototype.render = function(){
    let template = $('template').html();
    let html = Mustache.render(template,this);
    $('main').append(html);
}

Image.readJson = (filePath) => {
    const ajaxSetting = { //ajaxSetting is object
        method: 'get',
        dataType: 'json'
    };

    $.ajax(filePath , ajaxSetting).then(ourData => { //use the ajax(send ajax request) //data is an argument and we save the data inside it. 
        // $('div').show();
        objsArr = [];
        keywordsArr = [];
        $('select').empty();
        $('select').append('<option value="default">Filter by Keyword</option>');
        $('div').remove();
        ourData.forEach(item => { 
            console.log(ourData);
            //create object
            let image = new Image(item); 
            //add option and prevent dupliacte
            if(! keywordsArr.includes(image.keyword)){
                $('select').append(`<option value="${image.keyword}">${image.keyword}</option>`); 
            keywordsArr.push(image.keyword);
            }
            
            //render images
            image.render();
        });
    });
};


$('select').click(function(){
    
    $('div').hide();
    let selectval= '.' +$('select').val();
    console.log(selectval);
    $(selectval).show();
});

$('button').on('click' , function(){
    if(this.id === 'page1'){
        Image.readJson('../data/page-1.json') ;
    }
    else if(this.id === 'page2'){
        Image.readJson('../data/page-2.json');
    }
    else if(this.id === 'title-sort'){
        sortImages('title-sort');
    } 
    else if(this.id === 'horns-sort'){
        sortImages('horns-sort');
    } 
});

function sortImages(sortingType){
    $('div').remove();
    if(sortingType == 'title-sort'){
        objsArr.sort((a,b) =>{
            if(a.title.toLowerCase() < b.title.toLowerCase()){
                return -1;
            }
            if(a.title.toLowerCase() < b.title.toLowerCase()){
                return 1;
            }
            return 0;
        });     
    } else{
        objsArr.sort((a,b) =>{
            return a.horns - b.horns;
        })
    }
    objsArr.forEach(value =>{
        value.render();
    })
}

//document.ready ---> call the readJson function
$(() => Image.readJson('../data/page-1.json'));
