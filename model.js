var candidate = [];
candidate[1] = 'Mary Joy Montalban';
candidate[2] = 'Pauline Ann Ballesteros';
candidate[3] = 'Angela Ariado';
candidate[4] = 'Elena Villamin';
candidate[5] = 'Arielle Ramirez';
candidate[6] = 'Lovely Anne Perez';
candidate[7] = 'Danica Vicente';
candidate[8] = 'Ma. Dolores Hernandez';
candidate[9] = 'Aimee Cruz';
candidate[10] = 'Maren Ramiro';
candidate[11] = 'Pamela Pascual';
candidate[12] = 'Kimberly Louise Sabanal';
candidate[13] = 'Erika Franco';
candidate[14] = 'Alyonna Mae Agustin';

var section = [];
section[1] = 'BSCE 3-1';
section[2] = 'BSCE 3-2';
section[3] = 'BSCE 3-3';
section[4] = 'BSCE 4-1';
section[5] = 'BSCE 4-2';
section[6] = 'BSCE 5-2';
section[7] = 'BSEE 5-1';
section[8] = 'BSEE 5-1';
section[9] = 'BSEE 4-1';
section[10] = 'BSEE 3-1';
section[11] = 'BSIT 4-1';
section[12] = 'BSIT 3-1';
section[13] = 'BSIT 3-2';
section[14] = 'BSIT 3-3';

function startModel(modelId, slideshow){
	var anims = [];
	anims['back'] = false;
	anims['portrait'] = false;
	anims['name'] = false;
	
	document.getElementById('nm').innerHTML = candidate[modelId];
	document.getElementById('sc').innerHTML = section[modelId];
	document.getElementById('pt').src = 'model.jpg';
	
	function animateObjs(part, visibility){
		var animin = true;
		var animout = true;
		var Obj = document.getElementById(part);
		if(part == 'portrait'){
			Obj = document.getElementById('pt');
		}
		var cw = Obj.clientWidth;
		if(part == 'name'){
			document.getElementById('namecover').style.height = (document.getElementById('nm').clientHeight*2) + 'px';
			document.getElementById('namecover2').style.height = (document.getElementById('nm').clientHeight*2) + 'px';
		}
		function animate4th(){
			anime({
				targets: '#' + part + 'cover',
				width: {
					value: "-=" + cw,
					duration: 750,
					easing: 'easeOutCubic'
				},
				translateX: {
					value: "+=" + cw,
					duration: 750,
					easing: 'easeOutCubic'
				},
				complete: function(anim){
					anime({targets: '#' + part + 'cover', translateX: { value: '-=' + cw, duration: 0 }});
					anime({targets: '#' + part + 'cover2', translateX: { value: '-=' + cw, duration: 0 }});
					anims[part] = !anims[part];
				}
			});
		}
		function animate3rd(){
			anime({
				targets: '#' + part + 'cover2',
				width: {
					value: "-=" + cw,
					duration: 750,
					easing: 'easeOutCubic'
				},
				translateX: {
					value: "+=" + cw,
					duration: 750,
					easing: 'easeOutCubic'
				},
				update: function(anim){
					if(Math.round(anim.currentTime) >= 375 && animout){
						animate4th();
						animout = false;
					}
				}
				
			});
		}
		function animate2nd(){
			anime({
				targets: '#' + part + 'cover2',
				width: {
					value: "+=" + cw,
					duration: 750,
					easing: 'easeInCubic'
				},
				complete: function(anim){
					Obj.style.visibility = visibility;
					if(part == 'name'){
						document.getElementById('nm').style.visibility = visibility;
						document.getElementById('sc').style.visibility = visibility;
					}
					else if(part == 'portrait'){
						document.getElementById('pt').style.visibility = visibility;
					}
					animate3rd();
				}
			});
		}
		anime({
			targets: '#' + part + 'cover',
			width: {
				value: "+=" + cw,
				duration: 750,
				easing: 'easeInCubic'
			},
			complete: function(anim){
				if(Math.round(anim.currentTime) >= 375 && animin){
					animate2nd();
					animin = false;
				}
			}	
		});
	}
	
	
	document.getElementById('back').style.visibility = 'hidden';
	document.getElementById('pt').style.visibility = 'hidden';
	document.getElementById('nm').style.visibility = 'hidden';
	document.getElementById('sc').style.visibility = 'hidden';
	animateObjs('back', 'visible');
	animateObjs('portrait', 'visible');
	setTimeout(function(){animateObjs('name', 'visible');}, 300);
	if(slideshow){
		var slide = setInterval(function(){
			if(anims['name']){
				setTimeout(function(){
					animateObjs('back', 'hidden');
					animateObjs('portrait', 'hidden');
					animateObjs('name', 'hidden');
					var nextSlide = setInterval(function(){
						if(!anims['name']){
							if(modelId < 14){
								startModel(modelId + 1, true);
								clearInterval(nextSlide);
							}
						}
					}, 30);
				}, 2000);
				clearInterval(slide);
			}
		}, 30);
	}
}

startModel(1, true);