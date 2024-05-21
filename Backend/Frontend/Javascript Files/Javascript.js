document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('form');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert("Hi, Thank you for signing up!");
        this.reset();
    });
});
