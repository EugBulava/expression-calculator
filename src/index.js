function eval() {
    // Do not use eval!!!
    return;
}

function check(str, bracketsConfig) {
    var result = true;
    if(str.length%2 == 1){
      return false;
    } else {
      for(var i = 0; i<=str.length-1; i++){
        //console.log(str); 
        for(var j = 0; j<= bracketsConfig.length-1;j++){
          if(str[i] == bracketsConfig[j][0] && str[i+1] == bracketsConfig[j][1]){
            str = str.slice(0,i) + str.slice(i+2, str.length);
            i -= 2;
          }
        }
      }
      if(str.length == 0){
        return true;
      }else {
        return false;
      }
    }
  }

function expressionCalculator(expr) {
    
    var operand = '';
    var start_massive = [];
    var end_massive = [];
    var stack_operations = [];
    var stack_values = [];
    var middle_result;
    var str ='';

    expr = expr.replace(/\s+/g, '') + '/';
    //console.log(expr);

    for(var i = 0; i<=expr.length-1; i++){
        if(expr[i] == '/' && expr[i+1] == '0'){
            throw("TypeError: Division by zero.");
        }
    }

    for(var i = 0; i<=expr.length-1; i++){
        if(expr[i] == '(' || expr[i] == ')'){
            str += expr[i]; 
        }
    }

    if(!check(str,[['(', ')']])){
        throw("ExpressionError: Brackets must be paired");
    }

    for(var i = 0; i<= expr.length-1; i++){
        if(expr[i] !== '(' && expr[i] !== ')' && expr[i] !== '*' && expr[i] !== '/' && expr[i] !== '+' && expr[i] !== '-'){
            operand += expr[i]; 
        } else if(expr[i] == '(' || expr[i] == ')' || expr[i] == '*' || expr[i] == '/' || expr[i] == '+' || expr[i] == '-'){
            if(operand !== ''){
                start_massive.push(operand);
                operand = '';
            }
            start_massive.push(expr[i]);
        }
    }
    start_massive.pop();

    //console.log(start_massive);

    for(var i = 0; i<= start_massive.length-1; i++){
        if(start_massive[i] == '('){
            stack_operations.push(start_massive[i]);
            //console.log('конечная строка: ' + end_massive + ' стэк: ' + stack_operations);
        }else if(start_massive[i] !== '(' && start_massive[i] !== ')' && start_massive[i] !== '*' && start_massive[i] !== '/' && start_massive[i] !== '+' && start_massive[i] !== '-'){
            end_massive.push(start_massive[i]);
            //console.log('конечная строка: ' + end_massive + ' стэк: ' + stack_operations);
        }else if(start_massive[i] == ')'){
            for(var k = 0; k = stack_operations.length-1; k++){
                if(stack_operations[stack_operations.length-1] !== '('){
                    end_massive.push(stack_operations[stack_operations.length-1]);
                    stack_operations.pop();
                } 
                if(stack_operations[stack_operations.length-1] == '('){
                    stack_operations.pop();
                    //console.log('конечная строка: ' + end_massive + ' стэк: ' + stack_operations);
                    break;
                }
            }
        }else if(start_massive[i] == '+' && (stack_operations[stack_operations.length-1] == '*' || stack_operations[stack_operations.length-1] == '/' || stack_operations[stack_operations.length-1] == '+' || stack_operations[stack_operations.length-1] == '-')){
            for(var k = 0; k<=stack_operations.length+1;k++){
                if(stack_operations[stack_operations.length-1] == '*' || stack_operations[stack_operations.length-1] == '/' || stack_operations[stack_operations.length-1] == '+' || stack_operations[stack_operations.length-1] == '-'){
                    end_massive.push(stack_operations[stack_operations.length-1]);
                    stack_operations.pop();
                    k = 0;
                }else{
                    stack_operations.push(start_massive[i]);
                    break;
                }
            }
            //console.log('конечная строка: ' + end_massive + ' стэк: ' + stack_operations);
        }else if(start_massive[i] == '-' && (stack_operations[stack_operations.length-1] == '*' || stack_operations[stack_operations.length-1] == '/' || stack_operations[stack_operations.length-1] == '+' || stack_operations[stack_operations.length-1] == '-')){
            for(var k = 0; k<=stack_operations.length+1;k++){
                if(stack_operations[stack_operations.length-1] == '*' || stack_operations[stack_operations.length-1] == '/' || stack_operations[stack_operations.length-1] == '+' || stack_operations[stack_operations.length-1] == '-'){
                    end_massive.push(stack_operations[stack_operations.length-1]);
                    stack_operations.pop();
                    k = 0;
                }else{
                    stack_operations.push(start_massive[i]);
                    break;
                }
            }
           //console.log('конечная строка: ' + end_massive + ' стэк: ' + stack_operations);
        }else if(start_massive[i] == '+' && (stack_operations[stack_operations.length-1] !== '*' && stack_operations[stack_operations.length-1] !== '/' && stack_operations[stack_operations.length-1] !== '+' && stack_operations[stack_operations.length-1] !== '-')){
            stack_operations.push(start_massive[i]);
            //console.log('конечная строка: ' + end_massive + ' стэк: ' + stack_operations);
        }else if(start_massive[i] == '-' && (stack_operations[stack_operations.length-1] !== '*' && stack_operations[stack_operations.length-1] !== '/' && stack_operations[stack_operations.length-1] !== '+' && stack_operations[stack_operations.length-1] !== '-')){
            stack_operations.push(start_massive[i]);
            //console.log('конечная строка: ' + end_massive + ' стэк: ' + stack_operations);
        }else if(start_massive[i] == '*' &&  (stack_operations[stack_operations.length-1] == '+' || stack_operations[stack_operations.length-1] == '-')){
            stack_operations.push(start_massive[i]);
            //console.log('конечная строка: ' + end_massive + ' стэк: ' + stack_operations);
        }else if(start_massive[i] == '*' &&  (stack_operations[stack_operations.length-1] == '*' || stack_operations[stack_operations.length-1] == '/')){
            for(var k = 0; k<=stack_operations.length+1;k++){
                if(stack_operations[stack_operations.length-1] == '*' || stack_operations[stack_operations.length-1] == '/'){
                    end_massive.push(stack_operations[stack_operations.length-1]);
                    stack_operations.pop();
                    k = 0;
                }else{
                    stack_operations.push(start_massive[i]);
                    break;
                }
            }
            //console.log('конечная строка: ' + end_massive + ' стэк: ' + stack_operations);
        }else if(start_massive[i] == '*' &&  (stack_operations[stack_operations.length-1] !== '*' && stack_operations[stack_operations.length-1] !== '/' && stack_operations[stack_operations.length-1] !== '-' && stack_operations[stack_operations.length-1] !== '+')){
            stack_operations.push(start_massive[i]);
            //console.log('конечная строка: ' + end_massive + ' стэк: ' + stack_operations);
        }else if(start_massive[i] == '/' &&  (stack_operations[stack_operations.length-1] == '+' || stack_operations[stack_operations.length-1] == '-')){
            stack_operations.push(start_massive[i]);
            //console.log('конечная строка: ' + end_massive + ' стэк: ' + stack_operations);
        }else if(start_massive[i] == '/' &&  (stack_operations[stack_operations.length-1] == '*' || stack_operations[stack_operations.length-1] == '/')){
            for(var k = 0; k<=stack_operations.length+1;k++){
                if(stack_operations[stack_operations.length-1] == '*' || stack_operations[stack_operations.length-1] == '/'){
                    end_massive.push(stack_operations[stack_operations.length-1]);
                    stack_operations.pop();
                    k = 0;
                }else{
                    stack_operations.push(start_massive[i]);
                    break;
                }
            }
            //console.log('конечная строка: ' + end_massive + ' стэк: ' + stack_operations);
        }else if(start_massive[i] == '/' &&  (stack_operations[stack_operations.length-1] !== '*' && stack_operations[stack_operations.length-1] !== '/' && stack_operations[stack_operations.length-1] !== '-' && stack_operations[stack_operations.length-1] !== '+')){
            stack_operations.push(start_massive[i]);
            //console.log('конечная строка: ' + end_massive + ' стэк: ' + stack_operations);
        }
    }

    for(var k = 0; k<= stack_operations.length-1; k++){
        end_massive.push(stack_operations[stack_operations.length-1]);
        stack_operations.pop();
        k--;
    }

    //console.log(end_massive);
    //console.log(stack_operations);

    for(var i = 0; i<= end_massive.length-1;i++){
        if(end_massive[i] !== '*' && end_massive[i] !== '/' && end_massive[i] !== '+' && end_massive[i] !== '-'){
            stack_values.push(end_massive[i]);
        }else if(end_massive[i] == '*'){
            middle_result = Number(stack_values[stack_values.length-2])*Number(stack_values[stack_values.length-1]);
            stack_values.pop();
            stack_values.pop();
            stack_values.push(middle_result);
        }else if(end_massive[i] == '/'){
            middle_result = Number(stack_values[stack_values.length-2])/Number(stack_values[stack_values.length-1]);
            stack_values.pop();
            stack_values.pop();
            stack_values.push(middle_result);
        }else if(end_massive[i] == '+'){
            middle_result = Number(stack_values[stack_values.length-2])+Number(stack_values[stack_values.length-1]);
            stack_values.pop();
            stack_values.pop();
            stack_values.push(middle_result);
        }else if(end_massive[i] == '-'){
            middle_result = Number(stack_values[stack_values.length-2])-Number(stack_values[stack_values.length-1]);
            stack_values.pop();
            stack_values.pop();
            stack_values.push(middle_result);
        }
    }
    result = stack_values[0];
    if(Number.isInteger(result)){
        return result;
    }else{
        return Number(result.toFixed(4));
    }
}

//console.log(expressionCalculator('84 + 62 / 33 * 10 + 15'));
module.exports = {
   expressionCalculator
}