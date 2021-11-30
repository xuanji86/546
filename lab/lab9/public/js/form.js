(function() {

    function fibonacci_calc(input){
        if(typeof(input) !== 'number') throw 'Must provide a number';
        if(isNaN(input)) throw 'Must provide a number';

        if (input <= 0) return 0;
        if (input <= 2) return 1;
        else return fibonacci_calc(input - 1) + fibonacci_calc(input - 2);
    }

    function isPrime(num) {
        for(var i = 2; i < num; i++)
          if(num % i === 0) return false;
        return num > 1;
      }

    const get_form = document.getElementById('form_id');

    if (get_form){
        
        const index_element = document.getElementById('index');

        const list_results_element = document.getElementById('results');

        const errorContainer = document.getElementById('error_holder');
        const errorTextElement = errorContainer.getElementsByClassName(
          'text-goes-here'
        )[0];
    



        get_form.addEventListener('submit', (event) => {
            event.preventDefault();

            try{
                const index_value = index_element.value;

                const parsed_index_value = parseInt(index_value);

                const result = fibonacci_calc(parsed_index_value);
                
                const result_text = "The Fibonacci of " + parsed_index_value + " is " + result + ".";

                const li = document.createElement("li");
                li.append(result_text);
                list_results_element.append(li);
                if(isPrime(result)) li.classList.add("prime")//li.style.color = '#00E676'
                else  li.classList.add("not_prime")// = '#FF3D00';
                errorTextElement.textContent = "";
            } catch (e){
                const message = typeof e === 'string' ? e : e.message;
                errorTextElement.textContent = e;
            }
        })
    }
})();