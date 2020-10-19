'use strict';

// Creating the cinstructor
function Image(image){
    this.image_url = image.image_url;
    this.title = image.title;
    this.description = image.description;
    this.keyword = image.keyword;
    this.horns = image.horns;
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
    template.removeClass('photo-template');
}

Image.readJson = () => {
    const ajaxSetting = {
        method: 'get',
        dataType: 'json'
    };

    $.ajax('data/page-1.json' , ajaxSetting).then(data => {
        data.forEach(item => {
            let image = new Image(item);
            image.render();
        });
    });
};



$(() => Image.readJson());
