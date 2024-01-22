$(document).ready(function(){
    /*  Get all athletes on the first load of the page.
    */
    $.post('/search', function(data) {
        $('main').html(data);
    });

    /*  Get athletes that match the parameters selected in the form.
    */
    $(document).on('change keyup submit', 'form, input', function(e) {
        e.preventDefault();
        $.post($('form').attr('action'), $('form').serialize(), function(data) {
            $('main').html(data);
        });
        return false;
    });
});