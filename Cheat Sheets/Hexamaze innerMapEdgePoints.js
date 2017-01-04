var innerMapEdgePoints = [
	new Vector2(   0, -498.831),    // 12,  4 == 12 o'clock
	new Vector2(  54, -467.654),    // 13,  4
	new Vector2( 108, -436.477),    // 14,  4
	new Vector2( 162, -405.300),    // 15,  4
	new Vector2( 216, -374.123),    // 16,  4
	new Vector2( 270, -342.946),    // 17,  4
	new Vector2( 324, -311.769),    // 18,  4
	new Vector2( 378, -280.592),    // 19,  4

	new Vector2( 432, -249.415),    // 20,  4 == 2 o'clock
	new Vector2( 432, -187.061),    // 20,  5
	new Vector2( 432, -124.708),    // 20,  6
	new Vector2( 432,  -62.3538),   // 20,  7
	new Vector2( 432,    0.000),    // 20,  8
	new Vector2( 432,   62.3538),   // 20,  9
	new Vector2( 432,  124.708),    // 20, 10
	new Vector2( 432,  187.061),    // 20, 11

	new Vector2( 432,  249.415),    // 20, 12 == 4 o'clock
	new Vector2( 378,  280.592),    // 19, 13
	new Vector2( 324,  311.769),    // 18, 14
	new Vector2( 270,  342.946),    // 17, 15
	new Vector2( 216,  374.123),    // 16, 16
	new Vector2( 162,  405.3),      // 15, 17
	new Vector2( 108,  436.477),    // 14, 18
	new Vector2( 54,   467.654),    // 13, 19

	new Vector2(  0,   498.831),    // 12, 20 == 6 o'clock
	new Vector2( -54,  467.654),    // 11, 19
	new Vector2(-108,  436.477),    // 10, 18
	new Vector2(-162,  405.300),    //  9, 17
	new Vector2(-216,  374.123),    //  8, 16
	new Vector2(-270,  342.946),    //  7, 15
	new Vector2(-324,  311.769),    //  6, 14
	new Vector2(-378,  280.592),    //  5, 13

	new Vector2(-432,  249.415),    //  4, 12 == 8 o'clock
	new Vector2(-432,  187.061),    //  4, 11
	new Vector2(-432,  124.708),    //  4, 10
	new Vector2(-432,   62.3538),   //  4,  9
	new Vector2(-432,    0.000),    //  4,  8
	new Vector2(-432,  -62.3538),   //  4,  7
	new Vector2(-432, -124.708),    //  4,  6
	new Vector2(-432, -187.061),    //  4,  5

	new Vector2(-432, -249.415),    //  4,  4 == 10 o'clock
	new Vector2(-378, -280.592),    //  5,  4
	new Vector2(-324, -311.769),    //  6,  4
	new Vector2(-270, -342.946),    //  7,  4
	new Vector2(-216, -374.123),    //  8,  4
	new Vector2(-162, -405.300),    //  9,  4
	new Vector2(-108, -436.477),    // 10,  4
	new Vector2( -54, -467.654)     // 11,  4
]

function insideInnerMap(v) {
	// Constants:
	var y0 = 561.184    // float
	var x1 = 486        // float
	var y1 = 282.592    // float

	// coordinates:
	//    1, 3 = translate(0px, -561.184px) scale(1.54, 1.54)
	//    1, 4 = transform: translate(0px, -498.831px) scale(1.54, 1.54)
	// based on this, i chose tolerance to be 10
	var tol = 10
 
	// Coordinates of hexagon are:
	//   (  0,  y0) -- 12 o'clock
	//   ( x1,  y1) --  2 o'clock
	//   ( x1, -y1) --  4 o'clock
	//   (  0, -y0) --  6 o'clock
	//   (-x1, -y1) --  8 o'clock
	//   (-x1,  y1) -- 10 o'clock

	// Slope and intercept
	var m = (y1 - y0) / x1
	var b = y0

	if ((v.y < ( m * v.x) + b - tol) &&  // 12 to  2
		(v.x < x1) &&                     //  2 to  4
		(v.y > (-m * v.x) - b + tol) &&   //  4 to  6
		(v.y > ( m * v.x) - b + tol) &&   //  6 to  8
		(v.y < (-m * v.x) + b - tol) &&   // 10 to 12
		(v.x > -x1))                      //  8 to 10
		{
			return true
		} else {
			return false
		}
}

function getSnapToCoordinates(v) {
	var closest = null
	var closestDist
	var p
	var pDist

	if (insideInnerMap(v)) {
		return v
	} else {
		innerMapEdgePoints.forEach(function(p) {
			pDist = v.distance(p)
			if ((closest == null) || (pDist < closestDist)) {
				closest = p
				closestDist = v.distance(p)
			}
		})
		return closest
	}
}
