#npm-extrapolate

Extrapolate values from a set of evidence. Synthesize values that are not defined.

Based on AlexanderBrevig/Extrapolate.js code

#Installation

    npm install extrapolate

#Usage

    var extrap = require('extrapolate');
    
    //create an object for training
    var extrapolate = new extrap();
    // for this example, ket's keep it simple
    // f(x) = 2x
    extrapolate.given(0,0);
    extrapolate.given(1,2);
    extrapolate.given(2,4);
    extrapolate.given(4,8);
    extrapolate.given(5,10);

    console.log(extrapolate.getLinear(-1)); // -2
    console.log(extrapolate.getLinear(0));  // 0
    console.log(extrapolate.getLinear(1));  // 2
    console.log(extrapolate.getLinear(6));  // 12


    //create an object for training
    var extrapolatepoly = new extrap();
    // f(x) = x^3 + 2x^2 + 5x - 4
    extrapolatepoly.given(0,-4);
    extrapolatepoly.given(1,0);
    extrapolatepoly.given(2,12);
    extrapolatepoly.given(-1,-6);

    console.log(extrapolatepoly.getPoly(0.5)); // -2.625
    console.log(extrapolatepoly.getPoly(3)); // 38

