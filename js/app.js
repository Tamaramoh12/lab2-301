'use strict';

let objsArr = [];
let keywordsArr = [];
// let uniqeKeyWords = [];

// Creating the cinstructor
function Image(image){ //image is the JSON object
    this.image_url = image.image_url;
    this.title = image.title;
    this.description = image.description;
    this.keyword = image.keyword;
    this.horns = image.horns;
    objsArr.push(this);
    // keywordsArr.push(this.keyword);
}

// Render the content using clone
Image.prototype.render = function(){
    //targeting the template and clone it
    let template = $('.photo-template').clone();
    //append the template to the parent main
    $('main').append(template);
    //use the DOM to create content
    template.find('h2').text(this.title); 
    template.find('img').attr('src',this.image_url); 
    template.find('p').text(this.description); 
    template.attr('class',this.keyword);
    template.removeClass('photo-template');
}

Image.readJson = () => {
    const ajaxSetting = { //ajaxSetting is object
        method: 'get',
        dataType: 'json'
    };

    $.ajax('data/page-1.json' , ajaxSetting).then(ourData => { //use the ajax(send ajax request) //data is an argument and we save the data inside it. 
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
        // fillTheSelect();
    });
};

// function fillTheSelect(){
//     keywordsArr.forEach(function(value,index){
//         if(uniqeKeyWords.indexOf(value) === -1 ){
//             uniqeKeyWords.push(value);
//             $('select').append(`<option value="${value}">${value}</option>`);
//         } 
//     });
// }

$('select').click(function(){
    
    $('div').hide();
    let selectval= '.' +$('select').val();
    console.log(selectval);
    $(selectval).show();
});


//document.ready ---> call the readJson function
$(() => Image.readJson());
