"use strict;"

module.exports=exports=SmokeParticles;

/**
 * @constructor SmokeParticles
 * Creates a SmokeParticles of the specified size
 * @param {uint} size the maximum number of smokes to exits concurrently
 */
function SmokeParticles(maxSize) {
  this.pool = new Float32Array(3 * maxSize);
  this.start = 0;
  this.end = 0;
  this.wrapped = false;
  this.max = maxSize;
}

/**
 * emit particles at given position
*/
SmokeParticles.prototype.emit = function(position, velocity) {
    if(this.end!=this.max){
		this.pool[3*this.end+0] = position.x;
		this.pool[3*this.end+1] = position.y;
		this.pool[3*this.end+2] = 0.0;
		this.end++;
    }
}

/**
 * 
 */
SmokeParticles.prototype.update = function(elapsedTime, callback) {
	var i;
	if(this.wrapped){
		for(i=0;i<this.end;i++){
			this.pool[3*i+2]+=elapsedTime;
		}
		for(i=this.start;i<this.max;i++){
			this.pool[3*i+2]+=elapsedTime;
		}
	}else{
		for(i=this.start;i<this.max;i++){
			this.pool[3*i+2]+=elapsedTime;
		}
	}
	
	
  //for(var i = 0; i < this.end; i++){
  //  // Move the smoke
  //  this.pool[4*i] += this.pool[4*i+2];
  //  this.pool[4*i+1] += this.pool[4*i+3];
  //  // If a callback was supplied, call it
  //  if(callback && callback({
  //    x: this.pool[4*i],
  //    y: this.pool[4*i+1]
  //  })) {
  //    // Swap the current and last smoke if we
  //    // need to remove the current smoke
  //    this.pool[4*i] = this.pool[4*(this.end-1)];
  //    this.pool[4*i+1] = this.pool[4*(this.end-1)+1];
  //    this.pool[4*i+2] = this.pool[4*(this.end-1)+2];
  //    this.pool[4*i+3] = this.pool[4*(this.end-1)+3];
  //    // Reduce the total number of smokes by 1
  //    this.end--;
  //    // Reduce our iterator by 1 so that we update the
  //    // freshly swapped smoke.
  //    i--;
  //  }
  //}
}

/**
 * 
 */
SmokeParticles.prototype.render = function(elapsedTime, ctx) {
	function renderParticle(i){
		ctx.beginPath();
		ctx.arc(this.pool[3*i+0],this.pool[3*i+1],2*this.pool[3*i+2],0,2*Math.PI);
		ctx.fillStyle='rgba(60,60,60,'+(1/this.pool[3*i+2]+0.01)+')';
		ctx.fill();
	}
	var i;
	if(this.wrapped){
		for(i=0;i<this.end;i++){
			renderParticle.call(this,i);
			this.pool[3*i+2]+=elapsedTime;
		}
		for(i=this.start;i<this.max;i++){
			renderParticle.call(this,i);
			this.pool[3*i+2]+=elapsedTime;
		}
	}else{
		for(i=this.start;i<this.max;i++){
			renderParticle.call(this,i);
			this.pool[3*i+2]+=elapsedTime;
		}
	}
	
  //// Render the smokes as a single path
  //ctx.save();
  //ctx.beginPath();
  //ctx.fillStyle = "black";
  //for(var i = 0; i < this.end; i++) {
  //  ctx.moveTo(this.pool[4*i], this.pool[4*i+1]);
  //  ctx.arc(this.pool[4*i], this.pool[4*i+1], 2, 0, 2*Math.PI);
  //}
  //ctx.fill();
  //ctx.restore();
}
