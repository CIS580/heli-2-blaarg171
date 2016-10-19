"use strict;"

module.exports=exports=BulletPool;

function BulletPool(size){
	this.pool = new Float32Array(4*size);
	this.end = 0;
	this.max = size;
}

BulletPool.prototype.add=function(position, velocity){
	if(this.end<this.max){
		this.pool[4*this.end+0]=position.x;
		this.pool[4*this.end+1]=position.y;
		this.pool[4*this.end+2]=velocity.x;
		this.pool[4*this.end+3]=velocity.y;
		this.end++;
	}
}

BulletPool.prototype.update=function(time, cb){
	for(var i=0;i<this.end;i++){
		this.pool[4*i+0]+=this.pool[4*i+2];
		this.pool[4*i+1]+=this.pool[4*i+3];
		if(cb({x:this.pool[4*i+0],y:this.pool[4*i+1]})){
			this.pool[4*i+0]=this.pool[4*(this.end-1)+0];
			this.pool[4*i+1]=this.pool[4*(this.end-1)+1];
			this.pool[4*i+2]=this.pool[4*(this.end-1)+2];
			this.pool[4*i+3]=this.pool[4*(this.end-1)+3];
			this.end--;
			i--;
		}
	}
}

BulletPool.prototype.render(time,ctx){
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle="black";
	for(var i=0;i<this.end;i++){
		ctx.moveTo(this.pool[4*i+0],this.pool[4*i+1]);
		ctx.arc(this.pool[4*i+0],this.pool[4*i+1],2,0,2*Math.PI);
	}
	ctx.fill();
	ctx.restore();
}