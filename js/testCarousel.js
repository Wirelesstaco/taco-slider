$(function() {
	var transitionSpeed = 500;
	var slideWidth = $('.testCarousel .slides li:first').width();

	var isAnimating =false;
	var slidePosition = 0;
	var slideCount = $(".testCarousel .slides ul li").length;


	//Previous Slide
	
	$( ".testCarousel a.prev" ).click(function(e) {
		e.preventDefault();
		
			moveSlide(-1);
		
	});
	//Next Slide
	$( ".testCarousel a.next" ).click(function(e) {
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
						$('.testCarousel .slides li:last').insertBefore('.testCarousel .slides li:first'); // Fix for pagination


					}
					$(".testCarousel .slides ul").css({
						//Set slide to second Position
						left:-slideWidth * Math.abs(slideDifference)+"px"
					});


				}


				
				$(".testCarousel .slides ul").animate({

					left:"-=" + slideWidth * slideDifference+ "px"
				},transitionSpeed ,function(e){
				//End Animate
				
				
				// Prep for next animation, add slides in front.
				if(slideDifference > 0){
					for(var i = 0; i < Math.abs(slideDifference);i++){	
							// Move first slide to the last Div
							$('.testCarousel .slides li:first').insertAfter('.testCarousel .slides li:last'); //FIx for pagination
						}

						$(".testCarousel .slides ul").css({
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
		$(".pagination a").removeClass("selected");

		$( ".testCarousel .pagination a:nth-child("+position+")").addClass("selected");
	}

	//Pagination
	$( ".testCarousel .pagination a" ).click(function(e) {
		e.preventDefault();
		var slideDifference = $(this).index()  - slidePosition;
			//console.log(slideDifference)
			moveSlide(slideDifference);


		});

});