var extrapolate = function() {
    this.evidence = {};

    this.given = function(sample, value) {
	  //TODO: check for duplicate samples
      this.evidence[sample] = value;
    };
  
    this.getLinear = function(sample) {
      if (this.evidence[sample]!==undefined) {
        return this.evidence[sample];
      }
      var closeMin = -Infinity,
          closeMax = Infinity,
          max = -Infinity,
          preMax = -Infinity,
          min = Infinity,
          preMin = Infinity,
          key;
      // find min and max
      for (key in this.evidence) { 
        if (key<sample && key>closeMin) {
          closeMin = key;
        }
        if (key>sample && key<closeMax) {
          closeMax = key;
        }
        if (key>max) { preMax= max; max = key; }
        if (key<min) { preMin = min; min = key; }
        if (key<preMin && key>min) { preMin = key; }
      }

      //this is redefined if we want to extrapolate near the ends of the evidence set
      var baseValueIndex = closeMin; 

      if (closeMax===Infinity) { 
        closeMax = max; 
        closeMin = preMax;
        baseValueIndex = max;
      }
      if (closeMin===-Infinity) { 
        closeMax = preMin; 
        closeMin = min;
        baseValueIndex = min;
      }

      var delta = closeMax - closeMin;
      var valDelta = this.evidence[closeMax] - this.evidence[closeMin];

      var deltaLength = (sample-baseValueIndex);
      return this.evidence[baseValueIndex] + (deltaLength*(valDelta / delta));
    };

  
    this.getPoly = function(sample) {
		var keys = Object.keys(this.evidence);
		
		if(keys.length < 2)
			throw 'At least two samples are required';

      	if (this.evidence[sample]!==undefined)
        	return this.evidence[sample];
		
		var output = 0;
		for(var i = 0; i < keys.length; ++i)
		{
			var xi = keys[i];
			var yi = this.evidence[xi];
			var innerproduct = 1;

			for(var j = 0; j < keys.length; ++j)
			{
				if(i == j)
					continue;
				var xj = keys[j];
				innerproduct *= (sample - xj) / (xi - xj);
			}
			output += innerproduct * yi;
		}

		return output;	
	};

};

module.exports = extrapolate;
