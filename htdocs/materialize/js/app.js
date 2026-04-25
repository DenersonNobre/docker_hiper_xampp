$(document).ready(function () {
    $('#btn-modal-email').modal();
    $('#btn-dropdown-perfil').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrainWidth: true, // Does not change width of dropdown to that of the activator
        hover: true, // Activate on hover
        gutter: 5, // Spacing from edge
        belowOrigin: true, // Displays dropdown below the button
        alignment: 'left', // Displays dropdown with edge aligned to the left of button
        stopPropagation: false // Stops event propagation
    });
});

function chamarParalax() {
    $('.parallax').parallax();
}

window.load = chamarParalax();