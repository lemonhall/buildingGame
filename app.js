var lands=[];
var buleMap={};
var money=10000;
var wood=1000;

var v_wood=$("#wood");
    updateWoodView(wood);

function updateWoodView(amount){
    v_wood.html("wood:"+amount);
}

var v_money=$("#money");
    updateMoneyView(money);

function updateMoneyView(amount){
    v_money.html("money:"+amount);
}

function isEmptyObject(obj){
    for(var n in obj){return false} 
    return true; 
} 

var building=function(){
       var level=0;
};

building.prototype.upgrade=function(){
    console.log("check ...upgrade");
    console.log("beforeUpgrad:"+wood);
    console.log("beforeLevel:"+this.level);
     if(this.updateWood[this.level]!=undefined){
             if(wood>this.updateWood[this.level]){
                wood=wood-this.updateWood[this.level];
                updateWoodView(wood);
                this.level=this.level+1;
                  console.log("afterUpgrad:"+wood);
                  console.log("afterLevel:"+this.level);
              }else{
                alert("need more wood");
              }
      }else{

      }
};

building.prototype.getRent=function(){
     if(this.rentMoney[this.level]!=undefined){
                money=money+this.rentMoney[this.level];
                updateMoneyView(money);
      }else{

      }
};

var EnglandBuilding={
    level:0,
    name:"England",
    rentMoney:[100,150,200],
    needWood:300,
    updateWood:[100,200,300]
};
EnglandBuilding.upgrade=building.prototype.upgrade;
EnglandBuilding.getRent=building.prototype.getRent;


var land=function(){
    var building=null;
    var build=function(buildType){
        //if there is no building on this land...
        if(building==null){
              if(wood>buildType.needWood){
                    console.log("yes...>");
                    wood=wood-buildType.needWood;
                    updateWoodView(wood);
                    this.building=buildType;
              }else{

              }
        }//End of building is nulll...
    }
    return {
        building:building,
        build:build
    }
};//End of land......
                    

//===================================================

$(".land").click(function(){
    var that=$(this);
    var data=that.data();
    if(isEmptyObject(data)){
      console.log("Empty Land....");
          var a=new land();
        a.build(EnglandBuilding);
        if(a.building!=null){
          that.html(a.building.name+"--level "+a.building.level);
          that.data(a.building);
        }else{
          alert("need more Matirals");
        }
    }else{
        console.log(data);
        data.upgrade();
        that.html(data.name+"--level "+data.level);
    }
});

$("#buy").click(function(){
      money=money-1000;
      updateMoneyView(money);
      wood=wood+200;
      updateWoodView(wood);
});

var update=setInterval(function(){
        $(".land").each(function(){
                var that=$(this);
                var data=that.data();
                if(isEmptyObject(data)){

                }else{
                    data.getRent();
                }
         });//End of foreach land....
},3000);