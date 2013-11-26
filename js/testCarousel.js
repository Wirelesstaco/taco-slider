(function ( $ ) {
	$.fn.tacoSlider = function(){
		var thisSelector = this.selector;
		var transitionSpeed = 500;

		var slideWidth = $(thisSelector +" .slides li:first").width();

		var isAnimating =false;
		var slidePosition = 0;
		var slideCount = $(thisSelector +"  .slides ul li").length;


	//Previous Slide
	
	$( thisSelector +" a.prev" ).click(function(e) {
		e.preventDefault();
		
		moveSlide(-1);
		
	});
	//Next Slide
	$( thisSelector +" a.next" ).click(function(e) {
		e.preventDefault();
		

		moveSlide(1);
		
	});

	//Modulos with negative numbers
	function mod(n, m) {
		return ((m % n) + n) % n;
	}
	//Slide difference is the amount of slides in between the current slide.
	function moveSlide(slideDifference){
		if(!isAnimating){
			isAnimating =true;
		//Update Pagination button
		slidePosition = mod(slideCount,slidePosition + slideDifference);

		updatePagination(slidePosition);
		// Slide Looping 
		if(slideDifference <0){
					//Move last slide to first Div
					console.log(slideDifference);
					for(var i = 0; i < Math.abs(slideDifference);i++){	
						$(thisSelector +" .slides li:last").insertBefore(thisSelector +"  .slides li:first"); // Fix for pagination


					}
					$(thisSelector +" .slides ul").css({
						//Set slide to second Position
						left:-slideWidth * Math.abs(slideDifference)+"px"
					});


				}

				
				$(thisSelector +" .slides ul").animate({

					left:"-=" + slideWidth * slideDifference+ "px"
				},transitionSpeed ,function(e){
				//End Animate
				
				
				// Prep for next animation, add slides in front.
				if(slideDifference > 0){
					for(var i = 0; i < Math.abs(slideDifference);i++){	
							// Move first slide to the last Div
							$(thisSelector +" .slides li:first").insertAfter(thisSelector +" .slides li:last"); //FIx for pagination
						}

						$(thisSelector +" .slides ul").css({
						//Set slide to second Position
						left:0 +"px"
					});
					}

					isAnimating =false;

				});
			}
		}

		function updatePagination(position){

			position ++;
		//Remove all selected Bulletes
		$(thisSelector +" .pagination a").removeClass("selected");

		$( thisSelector +" .pagination a:nth-child("+position+")").addClass("selected");
	}

	//Pagination
	$( thisSelector +" .pagination a" ).click(function(e) {
		e.preventDefault();
		var slideDifference = $(this).index()  - slidePosition;
			//console.log(slideDifference)
			moveSlide(slideDifference);


		});
};


}( jQuery ));

$(document).ready(function(){
	$('.slider1').tacoSlider();
	$('.slider2').tacoSlider();
});

